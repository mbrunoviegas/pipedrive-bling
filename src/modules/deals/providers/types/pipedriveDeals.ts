export type ErrorResponse = {
  success: boolean;
  error: string;
  errorCode: number;
  error_info: string;
};

export type PipedriveListPayloadResponse = {
  data: ListData[];
} & ErrorResponse;

type ListData = {
  id: number;
  title: string;
  status: string;
  value: number;
  currency: string;
};
