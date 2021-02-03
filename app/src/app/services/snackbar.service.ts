import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private DURATION = 2000;
  private POSITION_Y: MatSnackBarVerticalPosition = 'bottom';
  private POSITION_X: MatSnackBarHorizontalPosition = 'right';
  private config = {
    duration: this.DURATION,
    horizontalPosition: this.POSITION_X,
    verticalPosition: this.POSITION_Y,
  };
  constructor(private _snackBar: MatSnackBar) {}

  success(message: string): void {
    this.show(message, ['bg-success', 'text-white']);
  }
  error(message: string): void {
    this.show(message, ['bg-danger', 'text-white']);
  }
  info(message: string): void {
    this.show(message, ['bg-info', 'text-white']);
  }
  warning(message: string): void {
    this.show(message, ['bg-warning', 'text-white']);
  }

  private show(message: string, panelClass: string[] = []): void {
    const messageUpperCase = message.toUpperCase();
    this._snackBar.open(messageUpperCase, 'CERRAR', {
      ...this.config,
      panelClass,
    });
  }
}
