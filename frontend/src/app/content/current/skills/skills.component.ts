import { Component } from '@angular/core';
import { Skill } from './skill.model';
import { RequestsService } from 'src/app/services/requests.service'; 

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  skills: Skill[] = [];

  constructor(private http: RequestsService){}

  ngOnInit(){
    this.http.getSkills().subscribe((x)=> {
      this.skills = x;
    })
  }
}
