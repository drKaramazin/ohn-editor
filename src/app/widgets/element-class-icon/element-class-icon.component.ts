import { Component, Input, OnInit } from '@angular/core';

import { DESCRIPTION, DEFAULT_DESCRIPTION } from '../../models/element/description';
import { ElementClass } from '../../models/element/element-class';

@Component({
  selector: 'app-element-class-icon',
  templateUrl: './element-class-icon.component.html',
  styleUrls: ['./element-class-icon.component.scss']
})
export class ElementClassIconComponent implements OnInit {

  DESCRIPTION = DESCRIPTION;
  DEFAULT_DESCRIPTION = DEFAULT_DESCRIPTION;

  @Input() class: ElementClass;

  constructor() { }

  ngOnInit() {
  }

}
