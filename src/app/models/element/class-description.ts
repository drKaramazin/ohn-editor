import { ElementClass } from './element-class';

export interface Describe {
  icon: string;
}

export interface ClassDescription {
  [cls: string]: Describe;
}
