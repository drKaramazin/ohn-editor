import { Component, OnInit } from '@angular/core';
import { JsonEditorOptions } from 'ang-jsoneditor';

import { CurrentElementService } from '../../services/current-element.service';

@Component({
  selector: 'app-current-element',
  templateUrl: './current-element.component.html',
  styleUrls: ['./current-element.component.scss']
})
export class CurrentElementComponent implements OnInit {

  editorOptions = new JsonEditorOptions();

  constructor(
    private current: CurrentElementService,
  ) {}

  ngOnInit() {
    this.editorOptions.modes = ['view', 'code', 'tree'];
    this.editorOptions.history = false;
    this.editorOptions.mode = 'view';
    this.editorOptions.search = false;
  }

}
