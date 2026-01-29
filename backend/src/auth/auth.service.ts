import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { catchError, concatMap, from, map, Observable, of, tap, throwError } from 'rxjs';
import { filterWithException } from '../common/operators/filter-with-exception.operator';
import { DbTransactionService } from '../common/service/dbtransaction.service';
import { comparePassword, hashPassword } from '../common/utils/bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly dbService: DbTransactionService
  ) {}

  signIn$(email: string, pass: string): Observable<{ access_token: string }> {
    return of(null).pipe(
      tap(() => this.logger.log(`Signing in user`)),
      concatMap(() => this.userService.findByEmail$(email)),
      filterWithException((user) => comparePassword(pass, user.password), 'Incorrect password'),
      concatMap((user) =>
        from(
          this.jwtService.signAsync({
            name: user.name,
            email: user.email,
            id: user.id,
          })
        )
      ),
      map((token) => ({ access_token: token })),
      catchError((err) => {
        this.logger.error(`Error signing in user: ${err.message}`);
        return throwError(() => new BadRequestException(err.message));
      })
    );
  }

  signUp$(name: string, email: string, password: string): Observable<{ access_token: string }> {
    return of(this.logger.log(`Registering user`)).pipe(
      concatMap(() => hashPassword(password)),
      concatMap((hashPassword) => {
        console.log(hashPassword);
        return this.dbService.exec$((qr) =>
          this.userService
            .create$({ name, email, password: hashPassword }, qr)
            .pipe(concatMap(() => this.userService.findByEmail$(email, qr)))
        );
      }),
      concatMap((user) =>
        from(
          this.jwtService.signAsync({
            name: user.name,
            email: user.email,
            id: user.id,
          })
        )
      ),
      map((token) => ({ access_token: token })),
      catchError((err) => {
        this.logger.error(`Error creating user: ${err}`);

        return throwError(() => new BadRequestException(err));
      })
    );
  }
}
