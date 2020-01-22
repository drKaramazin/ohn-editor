import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Element } from '../models/element/element';

@Injectable({
  providedIn: 'root'
})
export class CurrentElementService {

  currentElement = new BehaviorSubject<Element>(null);

  constructor(
    public current: CurrentElementService,
  ) {}

}
