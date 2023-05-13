import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DialogComponent>,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    let count = 5
    setInterval(() => {
      count--;
      if (count === 0) {
        this.dialogRef.close(true);
      }
    }, 500);
    this.router.navigate(['/tickets'])
  }

}
