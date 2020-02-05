import { Component, OnInit, HostListener } from '@angular/core';

import { OhnApiService } from '../../services/ohn-api.service';
import { Element } from '../../models/element/element';
import { CurrentElementService } from '../../services/current-element.service';
import { LinksService } from '../../services/links.service';
import { StructureService } from '../../services/structure.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {

  constructor(
    private ohnApi: OhnApiService,
    public current: CurrentElementService,
    private links: LinksService,
    public structure: StructureService,
  ) {}

  ngOnInit() {
    setTimeout(() => this.links.current.next(1));
  }

  browseApp() {
    this.structure.read();
  }

}
