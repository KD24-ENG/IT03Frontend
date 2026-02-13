import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  template: `
    <h2 mat-dialog-title>IT 03-2 Approve</h2>
    <mat-dialog-content>
      <p>{{ data.documentNo }} - {{ data.title }}</p>
      <mat-form-field appearance="outline" style="width:100%">
        <mat-label>Reason</mat-label>
        <textarea matInput [(ngModel)]="reason"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-raised-button color="primary"
              [disabled]="!reason"
              (click)="confirm()">
        Approve
      </button>
    </mat-dialog-actions>
  `,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ApproveDialogComponent {

  reason = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ApproveDialogComponent>
  ) {}

  confirm() {
    this.dialogRef.close(this.reason);
  }

  cancel() {
    this.dialogRef.close();
  }
}
