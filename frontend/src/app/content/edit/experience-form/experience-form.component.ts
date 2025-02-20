import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Experience } from '../../current/experience/experience.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})
export class ExperienceFormComponent implements OnInit {
  experienceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExperienceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { experience: Experience | null }
  ) {
    // ✅ Populate form with existing experience values when editing
    this.experienceForm = this.fb.group({
      role: [data.experience?.role || '', Validators.required],
      place: [data.experience?.place || '', Validators.required],
      period: this.fb.group({
        startYear: [data.experience?.period.startYear || '', [Validators.required, Validators.min(1900)]],
        endYear: [data.experience?.period.endYear || 'Present', Validators.required]
      })
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.experienceForm.valid) {
      this.dialogRef.close(this.experienceForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}