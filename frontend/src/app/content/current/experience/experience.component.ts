import { Component } from '@angular/core';
import { Experience, TimePeriod, TimePeriodFormatter } from './experience.model';
import { RequestsService } from 'src/app/services/requests.service'; 

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  constructor(private http: RequestsService){}
  experiences: Experience[] = [];

  formatPeriod(period: TimePeriod): string {
    return TimePeriodFormatter.formatPeriod(period);
  }

  ngOnInit() {
    this.http.getExperiences().subscribe((x: any) => {
      // Process the experiences to ensure `endYear` is typed correctly
      this.experiences = x.map((experience: any) => ({
        ...experience,
        period: {
          startYear: Number(experience.period.startYear), // Ensure startYear is a number
          endYear: experience.period.endYear === 'Present' 
            ? 'Present' 
            : Number(experience.period.endYear), // Convert endYear to number or 'Present'
        },
      }));
    });
  }
}
