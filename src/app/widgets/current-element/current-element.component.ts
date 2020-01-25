import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { CurrentElementService } from '../../services/current-element.service';
import { OhnApiService } from '../../services/ohn-api.service';
import { AuthService } from '../../services/auth.service';
import { ElementClass } from '../../models/element/element-class';

@Component({
  selector: 'app-current-element',
  templateUrl: './current-element.component.html',
  styleUrls: ['./current-element.component.scss']
})
export class CurrentElementComponent implements OnInit, OnDestroy {

  ElementClass = ElementClass;

  editorOptions = new JsonEditorOptions();

  willBeDestroyed = new Subject();

  state: any;

  constructor(
    private current: CurrentElementService,
    private ohnApi: OhnApiService,
    private auth: AuthService,
  ) {}

  setEditorOptions() {
    this.editorOptions.modes = ['view', 'code', 'tree'];
    this.editorOptions.history = false;
    this.editorOptions.mode = 'view';
    this.editorOptions.search = false;
  }

  ngOnInit() {
    this.setEditorOptions();
    this.current.currentElement.pipe(takeUntil(this.willBeDestroyed), filter(el => !!el)).subscribe(element => {
      this.state = null;
      this.ohnApi.getElementStateSc(element.element_slug, this.auth.selectedSC.value).subscribe(state => {
        this.state = state.value.value;
        console.log(this.state);
      });
    });
  }

  ngOnDestroy(): void {
    this.willBeDestroyed.next();
    this.willBeDestroyed.complete();
  }

}
