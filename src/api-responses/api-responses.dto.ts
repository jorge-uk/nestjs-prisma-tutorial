export class DataResponseDto<T> {
  data: T[];
  _count: number;
  _self: string;
}

export class DatumResponseDto<T> {
  datum: T;
  _self: string;
}
