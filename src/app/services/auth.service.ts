import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { OhnApiService } from './ohn-api.service';
import { LinksService } from './links.service';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  users = new BehaviorSubject<User[]>([]);

  selectedSC = new BehaviorSubject<string>(null);

  constructor(
    private ohnApi: OhnApiService,
    private links: LinksService,
  ) {}

  init() {
    combineLatest([this.ohnApi.getMyRole(), this.ohnApi.getUserList()]).subscribe(([user, users]) => {
      this.user.next(user);
      this.selectedSC.next(user.smart_contract);
      this.users.next(users);
      const routes = this.links.navLinks.value;
      routes[2].isShow = true;
      routes[3].isShow = true;
      this.links.navLinks.next(routes);
    });
  }

}
