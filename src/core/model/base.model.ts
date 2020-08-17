export default interface BaseResponse<T> {
  data: T;
  info: string;
  status: number;
}
