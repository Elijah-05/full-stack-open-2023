export const assertNever = (value: never): never => {
  throw new Error(
    `Undefined discriminated union member: ${JSON.stringify(value)}`
  );
};
