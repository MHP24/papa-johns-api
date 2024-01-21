export interface HasherAdapter {
  hash: (arg: string) => string;
  compare: (arg1: string, arg2: string) => boolean;
}
