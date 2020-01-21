import { Permissions } from './../permissions';
import { Settings } from './../settings';
import { Id } from './../id';
import { ElementClass } from './element-class';

/* tslint:disable:variable-name */
export class Element {
  _cls: ElementClass;
  app_slug: string;
  element_slug: string;
  elements: Element[];
  controller: string;
  id: string;
  text: string;
  access: string;
  configurable: string[];
  default_controller: string;
  metadata: boolean;
  permissions: Permissions;
  repeatable: boolean;
  settings: Settings;
  shareable: boolean;
  stateful: boolean;
  transitions: any[];
  version: string;
  _id: Id;
  value?: any;
  image_url?: string;
}
/* tslint:enable:variable-name */
