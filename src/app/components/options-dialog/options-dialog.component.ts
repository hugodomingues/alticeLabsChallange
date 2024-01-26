import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TimezoneService } from '../../services/timezone.service';
import moment from 'moment-timezone';
import { DialogData } from '../../interface/common-values';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-options-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
  ],
  templateUrl: './options-dialog.component.html',
  styleUrl: './options-dialog.component.css',
})
export class OptionsDialogComponent {
  TZService: TimezoneService = inject(TimezoneService);

  timezones: string[] = [];
  selectedTimezone: string = '';
  languageOptions: string[] = ['EN', 'PT'];

  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.timezones = this.TZService.getTimezones();
    this.selectedTimezone = moment.tz.guess();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onTimezoneChange() {
    console.log(this.selectedTimezone);
  }
}
