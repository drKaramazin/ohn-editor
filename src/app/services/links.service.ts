import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  navLinks: { path: string, label: string, isActive: boolean }[] = [
    { path: 'credentials', label: 'Credentials', isActive: false },
    { path: 'structure', label: 'Structure', isActive: false },
    { path: 'current-user', label: 'Current User', isActive: false },
  ];

  current = new BehaviorSubject<number>(null);

  constructor() { }
}
