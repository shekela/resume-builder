import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Introduction } from 'src/app/introdcution/introduction.model';
import { RequestsService } from 'src/app/services/requests.service';


@Component({
  selector: 'app-edit-fullname',
  templateUrl: './fullname.component.html',
  styleUrls: ['./fullname.component.css']
})
export class FullnameComponent {
    introduction?: Introduction;
    inputValue: string = '';

    constructor(private requestsService: RequestsService, private cdr: ChangeDetectorRef){}

    submitForm() {
      if (!this.introduction) {
        console.error("Introduction data is not available.");
        return;
      }
      if (this.inputValue.trim() === '') {
        console.error("Input value is empty.");
        return;
      }
    
      const formData = new FormData();
      formData.append("Name", this.inputValue);
    
      this.requestsService.updateUserProfile(formData).subscribe(
        response => {
          this.inputValue = ''; // Clear input field
        },
        error => {
          console.error('Error updating profile:', error);
          if (error.error?.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      );
    }
    
  
    ngOnInit(): void {
      this.requestsService.profile$.subscribe(profile => {
        this.introduction = profile!;
      });
  
      this.requestsService.getUserProfile().subscribe();
    }
}
