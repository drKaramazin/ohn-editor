import { Component, OnDestroy, OnInit } from '@angular/core';

import { LinksService } from '../../services/links.service';
import { AuthService } from '../../services/auth.service';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  willBeDestroyed = new Subject();

  sc: string;

  constructor(
    private links: LinksService,
    public auth: AuthService,
  ) {
    if (this.auth.selectedSC.value) {
      this.sc = this.auth.selectedSC.value;
    } else {
      this.auth.selectedSC.pipe(
        filter(val => !!val),
        take(1),
        takeUntil(this.willBeDestroyed)
      ).subscribe((val) => {
        this.sc = val;
        console.warn(this.sc);
      });
    }
  }

  ngOnInit() {
    setTimeout(() => this.links.current.next(3));
  }

  currentSCChanged(event) {
    this.auth.selectedSC.next(event.value);
  }

  ngOnDestroy(): void {
    this.willBeDestroyed.next();
    this.willBeDestroyed.complete();
  }

}
