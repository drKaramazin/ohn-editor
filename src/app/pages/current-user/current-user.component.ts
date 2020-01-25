import { Component, OnInit } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LinksService } from '../../services/links.service';
import { OhnApiService } from '../../services/ohn-api.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  isLoading = new BehaviorSubject<boolean>(false);

  me: User;

  constructor(
    private links: LinksService,
    private ohnApi: OhnApiService,
  ) { }

  ngOnInit() {
    setTimeout(() => this.links.current.next(2));
  }

  getCurrentUser() {
    this.isLoading.next(true);
    this.ohnApi.getMyRole()
      .pipe(finalize(() => this.isLoading.next(false)))
      .subscribe((me) => this.me = me);
  }

}
