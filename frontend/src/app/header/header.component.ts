import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent {
  currentYear: string;

  constructor(private datePipe: DatePipe) {
    this.currentYear = this.datePipe.transform(new Date(), 'yyyy') || '';
  }
  
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // ✅ Smooth scrolling effect
    }
  }
}
