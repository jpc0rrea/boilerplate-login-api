/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      permissionLevel: number;
    };
  }
}

declare namespace jest {
  interface Matchers<R> {
    toContainObject(a: Record<string, unknown>): R;
  }
}
