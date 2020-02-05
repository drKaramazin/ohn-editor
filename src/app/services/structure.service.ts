import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { OhnApiService } from './ohn-api.service';
import { Structure } from '../models/structure';
import { Element } from '../models/element/element';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  isLoading = new BehaviorSubject<boolean>(false);

  structure: Structure;

  constructor(
    private ohnApiService: OhnApiService,
  ) {
    this.structure = new Structure(this.ohnApiService, 'app', OhnApiService.DEPTH);
  }

  read() {
    this.isLoading.next(true);
    this.structure.read().pipe(finalize(() => this.isLoading.next(false))).subscribe();
  }

  edit(slug: string, body: string): Observable<Element> {
    return this.structure.edit(slug, body);
  }

}
