import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Work } from '../work.model';
import { RequestsService } from 'src/app/services/requests.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent {
  workSlug!: string;
  work: Work | undefined;
  works: Work[] = []; // Assume this is populated with all works from the backend
  workGallery!: string[];

  constructor(private route: ActivatedRoute, private http: RequestsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.workSlug = params.get('slug') || '';
      this.http.getWorkBySlug(this.workSlug).subscribe((x) => {
        this.work = x.work;
        this.workGallery = x.workGallery.map((item: any) => `${environment.apiUrl}${item.picture}`);
      })
    });
  }
}