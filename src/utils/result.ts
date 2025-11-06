export type Result<T> = Ok<T> | Err<T>;

export class Ok<T> {
    readonly value: T;
    readonly isOk = true;
    readonly isErr = false;

    constructor(value: T) {
        this.value = value;
    }

    static of<T>(value: T): Result<T> {
        return new Ok(value);
    }

    toString() {
        return `Ok(${this.value})`;
    }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Err<T> {
    readonly error: Error;
    readonly isOk = false;
    readonly isErr = true;

    constructor(error: Error) {
        this.error = error;
    }

    static of<T>(error: Error): Result<T> {
        return new Err(error);
    }

    toString() {
        return `Err(${this.error.message})`;
    }
}
