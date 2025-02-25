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
    // ✅ Directly fetch works and update UI immediately
    this.requestsService.getAllWorks().subscribe(works => {
      if (works && works.length > 0) { 
        this.updateWorks(works); // ✅ Update UI instantly
      } else {
        console.warn("⚠️ Works list is empty.");
      }
    });

    
  }


  private updateWorks(works: Work[]): void {
    this.works = works;
    this.totalworks = works.length;
    this.displayedWorks = this.displayedWorks.filter(work => works.some(w => w.id === work.id));
    this.loadMore(); // ✅ Load additional works if needed
  }

}
