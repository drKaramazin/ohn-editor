import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingsCount = new BehaviorSubject<number>(0);

  isLoading = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadingsCount.subscribe((count) => this.isLoading.next(!!count));
  }

  addLoading() {
    this.loadingsCount.next(this.loadingsCount.value + 1);
  }

  removeLoading() {
    this.loadingsCount.next(this.loadingsCount.value - 1);
  }

}
