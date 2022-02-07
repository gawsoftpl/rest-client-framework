export type SaveUrlDto = {
  urls: Array<string>;
  command: string;
  params: Record<string, any>;
};
