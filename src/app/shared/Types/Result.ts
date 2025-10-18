/**
 * Result Pattern para manejo funcional de errores
 * Evita try-catch excesivos y hace explícito el manejo de errores
 */
export class Result<T, E = Error> {
  private constructor(
    public readonly isSuccess: boolean,
    private readonly _value?: T,
    private readonly _error?: E,
  ) {}

  /**
   * Crea un Result exitoso
   */
  static ok<T>(value: T): Result<T> {
    return new Result<T>(true, value, undefined);
  }

  /**
   * Crea un Result fallido
   */
  static fail<E>(error: E): Result<never, E> {
    return new Result<never, E>(false, undefined, error);
  }

  /**
   * Obtiene el valor si es exitoso, lanza error si no
   */
  getValue(): T {
    if (!this.isSuccess || this._value === undefined) {
      throw new Error('Cannot get value from failed result');
    }
    return this._value;
  }

  /**
   * Obtiene el error si falló, lanza error si no
   */
  getError(): E {
    if (this.isSuccess || this._error === undefined) {
      throw new Error('Cannot get error from successful result');
    }
    return this._error;
  }

  /**
   * Verifica si el resultado es un fallo
   */
  get isFailure(): boolean {
    return !this.isSuccess;
  }

  /**
   * Map funcional sobre el valor
   */
  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.isSuccess && this._value !== undefined) {
      return Result.ok(fn(this._value)) as Result<U, E>;
    }
    return Result.fail(this._error as E);
  }

  /**
   * FlatMap para encadenar operaciones que devuelven Result
   */
  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this.isSuccess && this._value !== undefined) {
      return fn(this._value);
    }
    return Result.fail(this._error as E);
  }

  /**
   * Ejecuta una función si el resultado es exitoso
   */
  onSuccess(fn: (value: T) => void): Result<T, E> {
    if (this.isSuccess && this._value !== undefined) {
      fn(this._value);
    }
    return this;
  }

  /**
   * Ejecuta una función si el resultado es fallido
   */
  onFailure(fn: (error: E) => void): Result<T, E> {
    if (!this.isSuccess && this._error !== undefined) {
      fn(this._error);
    }
    return this;
  }
}
