import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { Introduction } from './introduction.model';
import { PhotoUrlFormatterService } from '../services/photo-url-formatter.service';
import { HttpClient } from '@angular/common/http';
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
    this.requestsService.profile$.subscribe(profile => {
      console.log('🔄 Received updated profile in IntroductionComponent:', profile);
  
      if (profile) {
        const updatedProfile = { 
          ...profile, 
          name: profile.name ? profile.name : 'Fullname',
          photo: profile.photo 
            ? this.photoURLFormatter.formatPhotoUrl(profile.photo) // ✅ Format if photo exists
            : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png', // ✅ Use default if missing
        };
  
        this.introduction = updatedProfile;
  
        // ✅ Set sanitized greeting text or default if missing
        this.safeGreetingText = this.sanitizer.bypassSecurityTrustHtml(
          profile.greetingText 
            ? profile.greetingText 
            : '<p style="color: white;font-family: sans-serif;">Your default greeting text. Introduce your clients yourself. Tell shortly about yourself.</p>'
        );
  
        // 🔹 Manually trigger change detection to force UI update
        this.cdr.detectChanges();
      } 
      else {
        console.warn("⚠️ Profile data is missing:", profile);
      }
    });
  
    // Fetch profile once on component initialization
    this.requestsService.getUserProfile().subscribe();
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
}
