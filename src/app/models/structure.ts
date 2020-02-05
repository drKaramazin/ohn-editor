import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Element } from './element/element';
import { OhnApiService } from '../services/ohn-api.service';

export class Structure {

  protected ohnApiService: OhnApiService;
  protected slug: string;
  protected depth: number;

  initialized = new BehaviorSubject<boolean>(false);

  element: Element;

  constructor(ohnApiService: OhnApiService, slug: string, depth: number) {
    this.ohnApiService = ohnApiService;
    this.slug = slug;
    this.depth = depth;
  }

  read(): Observable<Element> {
    return this.ohnApiService.getElement(this.slug, this.depth).pipe(tap(element => {
      this.element = element;
      this.initialized.next(true);
    }));
  }

}
