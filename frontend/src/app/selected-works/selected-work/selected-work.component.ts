import { Component, Input } from '@angular/core';
import { Work } from '../work.model';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-selected-work',
  templateUrl: './selected-work.component.html',
  styleUrls: ['./selected-work.component.css']
})
export class SelectedWorkComponent {
  @Input() work!: Work;
  @Input() index!: number;

  @Input() delete: boolean = false;

  constructor(private router: Router, private requestsService: RequestsService) {}

  navigateToWork(work: Work): void {
    this.router.navigate(['/work', work.slug]); // Redirect using the slug
  }

  deleteWork(id?: number) {
    if (id === undefined) return;
  
    const confirmDelete = window.confirm("Are you sure you want to delete this work?");
    if (!confirmDelete) return; // Cancel deletion if user clicks "Cancel"
  
    this.requestsService.deleteWork(id).subscribe({
      next: () => {
        console.log(`Work with ID ${id} deleted successfully.`);
      },
      error: (err) => {
        console.error("Error deleting work:", err);
      }
    });
  }
  
  
}
