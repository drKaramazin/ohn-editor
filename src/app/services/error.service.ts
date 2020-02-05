import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  push(error: string) {
    const snackBarRef = this.snackBar.open(error, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 7000,
    });
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }

}
