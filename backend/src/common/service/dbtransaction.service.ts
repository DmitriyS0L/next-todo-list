import { Injectable } from '@nestjs/common';
import { catchError, concatMap, defer, finalize, from, map, Observable, throwError } from 'rxjs';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class DbTransactionService {
  constructor(private readonly dataSource: DataSource) {}

  exec$<T>(handler$: (runner: QueryRunner) => Observable<T>): Observable<T> {
    const queryRunner = this.dataSource.createQueryRunner();

    return defer(() => queryRunner.startTransaction()).pipe(
      concatMap(() => handler$(queryRunner)),
      concatMap((result) => from(queryRunner.commitTransaction()).pipe(map(() => result))),
      catchError((err) =>
        from(queryRunner.rollbackTransaction()).pipe(concatMap(() => throwError(() => err)))
      ),
      finalize(() => queryRunner.release())
    );
  }
}
