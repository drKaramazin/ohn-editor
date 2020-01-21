import { Injectable } from '@angular/core';
import { Item } from '../models/storage/item';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  get(item: Item) {
    return localStorage.getItem(item) || '';
  }

  set(item: Item, value: string) {
    localStorage.setItem(item, value);
  }

}
