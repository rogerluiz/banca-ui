declare module '*.png';

declare module '*.json' {
  const value: any;
  export default value;
}

type ObjectMap<T> = { [key: string]: T };

type ActionType<T = unknown> = {
  type: string;
  payload: T;
};

type StatusType = {
  [key: string]: string | number;
};
