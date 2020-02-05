import { Component, HostListener, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { CurrentElementService } from '../../services/current-element.service';
import { OhnApiService } from '../../services/ohn-api.service';
import { AuthService } from '../../services/auth.service';
import { ElementClass } from '../../models/element/element-class';
import { EditElementComponent } from '../../dialogs/edit-element/edit-element.component';

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

  @ViewChild('container', { read: ElementRef, static: true }) container;

  @HostListener('window:scroll', ['$event']) scrollWindow() {
    if (window.pageYOffset > 120) {
      if (!this.container.nativeElement.classList.contains('fixed')) {
        this.container.nativeElement.classList.add('fixed');
      }
    } else {
      if (this.container.nativeElement.classList.contains('fixed')) {
        this.container.nativeElement.classList.remove('fixed');
      }
    }
  }

  constructor(
    private current: CurrentElementService,
    private ohnApi: OhnApiService,
    private auth: AuthService,
    private dialog: MatDialog,
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
        this.state = state.value ? state.value.value : null;
      });
    });
  }

  editElement() {
    const dialogRef = this.dialog.open(EditElementComponent, {
      width: '90%',
      data: {
        element: this.current.currentElement.value,
      },
    });
  }

  ngOnDestroy(): void {
    this.willBeDestroyed.next();
    this.willBeDestroyed.complete();
  }

}
