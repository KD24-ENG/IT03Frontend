import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { It03Service } from '../../core/services/it03.service';
import { It03Document } from '../../core/models/it03.model';
import { ApproveDialogComponent } from './approve-dialog.component';
import { RejectDialogComponent } from './reject-dialog.component';

@Component({
  selector: 'app-it03-list',
  standalone: true,

  template: `
  <div class="page">

    <!-- TOP BAR -->
    <mat-toolbar color="primary" class="toolbar">
      <span>IT 03-1 Approval System</span>
    </mat-toolbar>

    <div class="content">

      <mat-card class="card mat-elevation-z4">

        <div class="card-header">
          <h2>Document List</h2>
          <span class="count">
            Page {{ pageNumber }} | Total: {{ totalRecords }}
          </span>
        </div>

        <table mat-table [dataSource]="documents" class="mat-elevation-z1 table">

          <!-- Document No -->
          <ng-container matColumnDef="documentNo">
            <th mat-header-cell *matHeaderCellDef>Document No</th>
            <td mat-cell *matCellDef="let d">{{ d.documentNo }}</td>
          </ng-container>

          <!-- Title -->
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Title</th>
            <td mat-cell *matCellDef="let d">{{ d.title }}</td>
          </ng-container>

          <!-- Status -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let d">

              <span class="chip"
                    [ngClass]="statusClass(d.status)">
                {{ statusText(d.status) }}
              </span>

            </td>
          </ng-container>

          <!-- Action -->
          <ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef align="right">Action</th>
            <td mat-cell *matCellDef="let d" align="right">

              <button mat-stroked-button
                      color="primary"
                      class="action-btn"
                      [disabled]="d.status !== 0"
                      (click)="openApprove(d)">
                Approve
              </button>

              <button mat-stroked-button
                      color="warn"
                      class="action-btn"
                      [disabled]="d.status !== 0"
                      (click)="openReject(d)">
                Reject
              </button>

            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="cols"></tr>
          <tr mat-row
              *matRowDef="let row; columns: cols;"
              class="hover-row">
          </tr>

        </table>

        <!-- PAGINATOR -->
        <mat-paginator
          [length]="totalRecords"
          [pageSize]="pageSize"
          [pageSizeOptions]="[5,10,20]"
          (page)="onPageChange($event)">
        </mat-paginator>

      </mat-card>

    </div>

  </div>
  `,

  styles: [`

    .page {
      background: #f4f6f9;
      min-height: 100vh;
    }

    .toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .content {
      padding: 32px;
    }

    .card {
      padding: 24px;
      border-radius: 12px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .count {
      color: #666;
      font-size: 14px;
    }

    table {
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
    }

    th {
      font-weight: 600;
    }

    /* Hover effect */
    .hover-row:hover {
      background-color: #f1f5ff;
      transition: 0.2s ease;
    }

    /* Action buttons */
    .action-btn {
      margin-left: 8px;
    }

    /* Custom chip style */
    .chip {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    }

    .chip-pending {
      background-color: #fff3cd;
      color: #856404;
    }

    .chip-approved {
      background-color: #d4edda;
      color: #155724;
    }

    .chip-rejected {
      background-color: #f8d7da;
      color: #721c24;
    }

  `],

  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    MatPaginatorModule
  ]
})
export class It03ListComponent implements OnInit {

  documents: It03Document[] = [];
  cols = ['documentNo', 'title', 'status', 'action'];

  pageNumber = 1;
  pageSize = 10;
  totalRecords = 0;

  constructor(
    private service: It03Service,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll(this.pageNumber, this.pageSize)
      .subscribe(res => {
        this.documents = res.data;
        this.totalRecords = res.totalRecords;
        this.cdr.detectChanges();
      });
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.load();
  }

  statusText(status: number) {
    if (status === 0) return 'Pending';
    if (status === 1) return 'Approved';
    return 'Rejected';
  }

  statusClass(status: number) {
    if (status === 0) return 'chip chip-pending';
    if (status === 1) return 'chip chip-approved';
    return 'chip chip-rejected';
  }

  openApprove(doc: It03Document) {
    const ref = this.dialog.open(ApproveDialogComponent, { data: doc });
    ref.afterClosed().subscribe(reason => {
      if (!reason) return;
      this.service.approve(doc.id, reason).subscribe(() => {
        this.snack.open('Approved successfully', 'Close', { duration: 2000 });
        this.load();
      });
    });
  }

  openReject(doc: It03Document) {
    const ref = this.dialog.open(RejectDialogComponent, { data: doc });
    ref.afterClosed().subscribe(reason => {
      if (!reason) return;
      this.service.reject(doc.id, reason).subscribe(() => {
        this.snack.open('Rejected successfully', 'Close', { duration: 2000 });
        this.load();
      });
    });
  }
}