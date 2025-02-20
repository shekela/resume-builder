import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Awards } from '../../current/awards-certificates/awards.model';

@Component({
  selector: 'app-awards-form',
  templateUrl: './awards-form.component.html',
  styleUrls: ['./awards-form.component.css']
})
export class AwardsFormComponent {
    awardForm: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<AwardsFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { award: Awards | null }
    ) {
      // ✅ Populate form with existing experience values when editing
      this.awardForm = this.fb.group({
        role: [data.award?.role || '', Validators.required],
        place: [data.award?.place || '', Validators.required],
        year: [data.award?.year || '', Validators.required]
      });
    }
  
    ngOnInit(): void {}
  
    save(): void {
      if (this.awardForm.valid) {
        this.dialogRef.close(this.awardForm.value);
      }
    }
  
    close(): void {
      this.dialogRef.close();
    }
}
