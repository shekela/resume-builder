import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.css']
})
export class SkillsFormComponent {
  skillForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SkillsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { skill: string | null }
  ) {
    this.skillForm = this.fb.group({
      skill: [data.skill || '', Validators.required]
    });
  }

  save(): void {
    if (this.skillForm.valid) {
      this.dialogRef.close(this.skillForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
