import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { Introduction } from './introduction.model';
import { PhotoUrlFormatterService } from '../services/photo-url-formatter.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-introdcution',
  templateUrl: './introdcution.component.html',
  styleUrls: ['./introdcution.component.css']
})
export class IntrodcutionComponent implements OnInit{
   introduction?: Introduction;
   safeGreetingText!: SafeHtml;

   constructor(
    private requestsService: RequestsService,
    private photoURLFormatter: PhotoUrlFormatterService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.requestsService.getUserProfile().subscribe(profile => {
      if (profile) {
        this.updateProfileData(profile);
      } else {
        console.warn("⚠️ No profile data received.");
      }
    });
  }
  
  
  
  


  onDownloadClick(): void {
    this.requestsService.downloadCV().subscribe(
      (response: Blob) => {
        // Create a link element
        const link = document.createElement('a');

        // Create a URL for the Blob response
        const url = window.URL.createObjectURL(response);

        // Set the download attribute (optional: use a dynamic filename if needed)
        link.href = url;
        link.download = 'CV.pdf'; // You can dynamically use a filename returned from the backend

        // Append the link to the document body and trigger a click event
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Release the object URL after download
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading CV:', error);
      }
    );
  }


  private updateProfileData(profile: Introduction): void {
    const updatedProfile = { 
      ...profile, 
      name: profile.name ? profile.name : 'Fullname',
      photo: profile.photo 
        ? this.photoURLFormatter.formatPhotoUrl(profile.photo)
        : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png',
    };
  
    this.introduction = updatedProfile;
    this.safeGreetingText = this.sanitizer.bypassSecurityTrustHtml(
      profile.greetingText || '<p style="color: white;font-family: sans-serif;">Your default greeting text.</p>'
    );
  
    this.cdr.detectChanges(); // ✅ Forces UI update immediately
  }
  
}
