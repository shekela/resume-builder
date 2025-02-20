import { Component, OnInit } from '@angular/core';
import { Experience } from '../../current/experience/experience.model';
import { RequestsService } from 'src/app/services/requests.service';
import { ExperienceFormComponent } from '../experience-form/experience-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements OnInit {
  experiences: Experience[] = [];

  constructor(private experienceService: RequestsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchExperiences();
  }

  fetchExperiences(): void {
    this.experienceService.getExperiences().subscribe((data) => {
      this.experiences = data;
    });
  }

  addExperience(): void {
    const dialogRef = this.dialog.open(ExperienceFormComponent, {
      width: '400px',
      data: { experience: null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.experienceService.addExperience(result).subscribe(() => {
          this.fetchExperiences();
        });
      }
    });
  }

  editExperience(experience: Experience): void {
    const dialogRef = this.dialog.open(ExperienceFormComponent, {
      width: '400px',
      data: { experience }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // ✅ Ensure the ID is properly assigned before sending
        result.id = experience.id;
  
        this.experienceService.updateExperience(result.id, result).subscribe({
          next: () => {
            console.log("✅ Experience updated successfully.");
            this.fetchExperiences();
          },
          error: (error) => {
            console.error("❌ ERROR updating experience:", error);
          }
        });
      }
    });
  }
  

  deleteExperience(id: number): void {
    if (confirm('Are you sure you want to delete this experience?')) {
      this.experienceService.deleteExperience(id).subscribe(() => {
        this.fetchExperiences();
      });
    }
  }
}