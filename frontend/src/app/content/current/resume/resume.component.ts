import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  downloadUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.downloadUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.apiUrl}/api/profile/download-cv`);
  }
}
