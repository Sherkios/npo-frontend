export default function (value: any): value is Error {
  return value instanceof Error;
}
