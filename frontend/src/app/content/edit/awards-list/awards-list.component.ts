import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestsService } from 'src/app/services/requests.service';
import { AwardsFormComponent } from '../awards-form/awards-form.component';
import { Awards } from '../../current/awards-certificates/awards.model';

@Component({
  selector: 'app-awards-list',
  templateUrl: './awards-list.component.html',
  styleUrls: ['./awards-list.component.css']
})
export class AwardsListComponent {
    awards: Awards[] = [];
  
    constructor(private awardsService: RequestsService, private dialog: MatDialog) {}
  
    ngOnInit(): void {
      this.fetchAwards();
    }
  
    fetchAwards(): void {
      this.awardsService.getAwards().subscribe((data) => {
        this.awards = data;
      });
    }
  
    addAward(): void {
      const dialogRef = this.dialog.open(AwardsFormComponent, {
        width: '400px',
        data: { award: null }
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.awardsService.addAward(result).subscribe(() => {
            this.fetchAwards();
          });
        }
      });
    }
  
    editAward(award: Awards): void {
      const dialogRef = this.dialog.open(AwardsFormComponent, {
        width: '400px',
        data: { award }
      });
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // ✅ Ensure the ID is properly assigned before sending
          result.id = award.id;
    
          this.awardsService.updateAward(result.id, result).subscribe({
            next: () => {
              this.fetchAwards();
            },
            error: (error) => {
            }
          });
        }
      });
    }
    
  
    deleteAwards(id: number): void {
      if (confirm('Are you sure you want to delete this Award?')) {
        this.awardsService.deleteAward(id).subscribe(() => {
          this.fetchAwards();
        });
      }
    }
}
