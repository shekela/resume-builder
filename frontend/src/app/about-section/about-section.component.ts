import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent {
  aboutText!: SafeHtml;

  constructor(private requestsService: RequestsService, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.requestsService.getAbout().subscribe(content => {
      if (content) {
        this.updateAboutText(content); // ✅ Update UI immediately
      } else {
        console.warn("⚠️ No about text received.");
      }
    });
  }
  
  private updateAboutText(content: any): void {
    this.aboutText = this.sanitizer.bypassSecurityTrustHtml(
      content?.content || 
      '<p style="color: white;font-family: sans-serif;">Your default About text. Explain your motive and aim. Tell shortly about yourself.</p>'
    );
  }
  
  
}
