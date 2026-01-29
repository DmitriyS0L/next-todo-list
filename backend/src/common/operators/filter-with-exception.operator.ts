import { concatMap, from, MonoTypeOperatorFunction, of, throwError } from 'rxjs';

export const filterWithException =
  <T>(
    passingCondition: (data: T) => boolean | Promise<boolean>,
    errorMessage: string | ((data: T) => string)
  ): MonoTypeOperatorFunction<T> =>
  (source$) =>
    source$.pipe(
      concatMap((data) =>
        from(Promise.resolve(passingCondition(data))).pipe(
          concatMap((result) =>
            result
              ? of(data)
              : throwError(
                  () =>
                    new Error(typeof errorMessage === 'string' ? errorMessage : errorMessage(data))
                )
          )
        )
      )
    );
