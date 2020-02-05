import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { JsonEditorOptions } from 'ang-jsoneditor';

import { DialogData } from './dialog-data';
import { StructureService } from '../../services/structure.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.scss']
})
export class EditElementComponent implements OnInit {

  editorOptions = new JsonEditorOptions();

  code = {};

  isLoading = new BehaviorSubject<boolean>(false);

  constructor(
    public dialogRef: MatDialogRef<EditElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private structureService: StructureService,
  ) { }

  setEditorOptions() {
    this.editorOptions.modes = ['code'];
    this.editorOptions.history = false;
    this.editorOptions.mode = 'code';
    this.editorOptions.search = false;
  }

  ngOnInit() {
    this.setEditorOptions();
  }

  apply() {
    this.isLoading.next(true);
    this.structureService.edit(this.data.element.element_slug, JSON.stringify(this.code))
      .pipe(finalize(() => this.isLoading.next(false)))
      .subscribe(() => this.dialogRef.close());
  }

  cancel() {
    this.dialogRef.close();
  }

}
