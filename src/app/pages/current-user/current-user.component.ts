import { Component, OnInit } from '@angular/core';

import { LinksService } from '../../services/links.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  constructor(
    private links: LinksService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    setTimeout(() => this.links.current.next(2));
  }

}
