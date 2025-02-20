import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { RequestsService } from '../services/requests.service';
import { Contact } from './contact.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm!: FormGroup;
  submitted: boolean = false;
  contact!: Contact;
  safeContactText!: SafeHtml;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private requestsService: RequestsService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

    this.requestsService.contact$.subscribe(contact => {
      if(contact){
        this.contact = contact;
        this.safeContactText = this.sanitizer.bypassSecurityTrustHtml(
          contact.contactText 
            ? contact.contactText 
            : '<p style="color: white;font-family: sans-serif;">Your default contact text. Ask you clients how to contact you.</p>'
        );
      }
    });
    this.requestsService.getContact().subscribe();

  }

  get email() {
    return this.contactForm.get('email')!;
  }

  get message() {
    return this.contactForm.get('message')!;
  }


  async send(){
    emailjs.init("tX6leYMuSMTLgiehw");
    let response = await emailjs.send("service_nu5skvk","template_4l27v5k",{
      from_name: this.contactForm.value.email,
      message: this.contactForm.value.message,
      });
  }

  @ViewChild('submitButton') submitButton!: ElementRef;


  onSubmit(): void {
    if (this.contactForm.invalid) {
      return; // Don't proceed with animation if form is invalid
    }
  
    this.submitted = true;  // Change the text and image to green
    this.cdr.detectChanges();  // Manually trigger change detection to update the view immediately
  
    const imgElement = this.submitButton.nativeElement;
    imgElement.classList.add('animate');  // Add animation class to move the image
  
    // After the animation duration (1200ms), execute the following:
    setTimeout(() => {
      this.submitted = false;  // Reset the state (revert to the white image and text)
      imgElement.classList.remove('animate');  // Remove the animation class
  
      // Now that animation is complete, perform the form submission logic
      this.send();  // Call your send function
      this.contactForm.reset();  // Reset the form
    }, 800);  // Match the duration of the animation (1200ms)
  }
  
}
