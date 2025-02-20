import { Component } from '@angular/core';
import { Work } from './work.model';
import { works } from './works.data';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-selected-works',
  templateUrl: './selected-works.component.html',
  styleUrls: ['./selected-works.component.css']
})
export class SelectedWorksComponent {
  totalworks!: number; // Total number of pictures
  loadedCount: number = 0; // Number of pictures currently loaded
  progressPercentage: number = 0;
  displayedWorks: Work[] = [];
  works!: Work[];


  constructor(private requestsService: RequestsService){}

  loadMore(): void {
    const nextBatch = this.works.slice(
      this.loadedCount,
      this.loadedCount + 6
    ); 
    this.displayedWorks = [...this.displayedWorks, ...nextBatch]; 
    this.loadedCount = this.displayedWorks.length; 
    this.progressPercentage = Math.ceil(
      (this.loadedCount / this.totalworks) * 100
    ); 
  }

  ngOnInit(): void {
    this.requestsService.works$.subscribe(works => {
      if (works && works.length > 0) { 
        console.log("✅ Works received and UI updating:", works);
        this.works = works;
        this.totalworks = works.length;
  
        // ✅ Only reset `displayedWorks` if it's empty, to avoid flickering
        this.displayedWorks = this.displayedWorks.filter(work => works.some(w => w.id === work.id));

        this.loadMore()
      } else {
        console.warn("⚠️ Works list is empty after update.");
      }
    });
  
    // ✅ Fetch works initially
    this.requestsService.getAllWorks().subscribe();
  }
}
