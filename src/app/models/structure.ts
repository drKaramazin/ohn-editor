import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Element } from './element/element';
import { OhnApiService } from '../services/ohn-api.service';
import * as _ from 'lodash';

export interface ElementItem {
  parent: Element;
  index: number;
}

export class Structure {

  protected ohnApiService: OhnApiService;
  protected slug: string;
  protected depth: number;

  initialized = new BehaviorSubject<boolean>(false);

  element = new BehaviorSubject<Element>(null);

  constructor(ohnApiService: OhnApiService, slug: string, depth: number) {
    this.ohnApiService = ohnApiService;
    this.slug = slug;
    this.depth = depth;
  }

  read(): Observable<Element> {
    return this.ohnApiService.getElement(this.slug, this.depth).pipe(tap(element => {
      this.element.next(element);
      this.initialized.next(true);
    }));
  }

  getElements(slug: string, parent: Element = this.element.value, acc: ElementItem[] = []): ElementItem[] {
    if (parent.element_slug === OhnApiService.APP_ELEMENT_SLUG && parent.element_slug === slug) {
      return [{
        parent: null,
        index: null,
      }];
    }

    if (parent.elements) {
      for (let i = 0; i < parent.elements.length; i++) {
        if (parent.elements[i].element_slug === slug) {
          acc.push({
            parent,
            index: i,
          });
        } else {
          this.getElements(slug, parent.elements[i], acc);
        }
      }
      return acc;
    }

    return [];
  }

  edit(slug: string, body: string): Observable<Element> {
    return this.ohnApiService.editElement(slug, body).pipe(tap((element) => {
      const root  = _.cloneDeep(this.element.value);
      const elements = this.getElements(element.element_slug, root);
      console.log(elements);
      for (const item of elements) {
        item.parent.elements.splice(item.index, 1, _.cloneDeep(element));
      }
      this.element.next(root);
    }));
  }

}
