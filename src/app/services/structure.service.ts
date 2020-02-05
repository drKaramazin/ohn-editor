import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { OhnApiService } from './ohn-api.service';
import { Structure } from '../models/structure';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  isLoading = new BehaviorSubject<boolean>(false);

  structure: Structure;

  constructor(
    private ohnApiService: OhnApiService,
  ) {
    this.structure = new Structure(this.ohnApiService, 'app', 999);
  }

  read() {
    this.isLoading.next(true);
    this.structure.read().pipe(finalize(() => this.isLoading.next(false))).subscribe();
  }

}
