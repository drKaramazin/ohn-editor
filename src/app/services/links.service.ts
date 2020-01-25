import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  navLinks = new BehaviorSubject<{ path: string, label: string, isActive: boolean, isShow: boolean }[]>([
    { path: 'credentials', label: 'Credentials', isActive: false, isShow: true },
    { path: 'structure', label: 'Structure', isActive: false, isShow: true },
    { path: 'current-user', label: 'Current User', isActive: false, isShow: false },
    { path: 'users', label: 'Users', isActive: false, isShow: false },
  ]);

  current = new BehaviorSubject<number>(null);

  constructor() { }
}
