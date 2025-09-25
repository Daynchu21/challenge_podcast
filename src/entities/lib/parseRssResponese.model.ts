export type AllOriginsResponse = {
  contents: string;
  status?: {
    url: string;
    content_type: string;
    http_code: number;
  };
};
