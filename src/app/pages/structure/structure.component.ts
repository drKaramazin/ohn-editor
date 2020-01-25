import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { OhnApiService } from '../../services/ohn-api.service';
import { Element } from '../../models/element/element';
import { CurrentElementService } from '../../services/current-element.service';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {

  isLoading = new BehaviorSubject<boolean>(false);

  element: Element;

  constructor(
    private ohnApi: OhnApiService,
    public current: CurrentElementService,
    private links: LinksService,
  ) { }

  ngOnInit() {
    setTimeout(() => this.links.current.next(1));
  }

  browseApp() {
    this.isLoading.next(true);
    this.ohnApi.getElement('app', 999)
      .pipe(finalize(() => this.isLoading.next(false)))
      .subscribe((element) => this.element = element);
  }

}
