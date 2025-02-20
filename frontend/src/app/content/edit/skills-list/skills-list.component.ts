import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Skill } from '../../current/skills/skill.model';
import { RequestsService } from 'src/app/services/requests.service';
import { SkillsFormComponent } from '../skills-form/skills-form.component';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.css']
})
export class SkillsListComponent {
  skills: Skill[] = [];

  constructor(private skillService: RequestsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillService.getSkills().subscribe((data) => {
      this.skills = data;
    });
  }

  addSkill(): void {
    const dialogRef = this.dialog.open(SkillsFormComponent, {
      width: '400px',
      data: { skill: null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.skillService.addSkill(result).subscribe(() => {
          this.loadSkills();
        });
      }
    });
  }

  deleteSkill(id: number): void {
    if (confirm('Are you sure you want to delete this skill?')) {
      this.skillService.deleteSkill(id).subscribe(() => {
        this.loadSkills();
      });
    }
  }
}
