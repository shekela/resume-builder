import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Contact } from 'src/app/contact/contact.model';
import { Introduction } from 'src/app/introdcution/introduction.model';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-social-media',
  templateUrl: './edit-social-media.component.html',
  styleUrls: ['./edit-social-media.component.css']
})
export class EditSocialMediaComponent {
    contact?: Contact;
    @Input() social!: string;
    inputValue: string = '';


    constructor(private requestsService: RequestsService, private cdr: ChangeDetectorRef){}

    submitForm() {
      if (!this.contact) {
        console.error("Introduction data is not available.");
        return;
      }
      if (this.inputValue.trim() === '') {
        console.error("Input value is empty.");
        return;
      }
      
      const formData = new FormData();
      formData.append(this.social, this.inputValue);
    
      this.requestsService.updateContact(formData).subscribe(
        response => {
          console.log('Profile updated successfully:', response);
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
      // Subscribe to profile$ to get the latest profile data
      this.requestsService.contact$.subscribe(contact => {
        this.contact = contact!;
      });
  
      // Fetch the profile initially
      this.requestsService.getContact().subscribe();
    }
}
