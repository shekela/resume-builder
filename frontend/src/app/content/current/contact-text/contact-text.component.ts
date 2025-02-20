import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-text',
  templateUrl: './contact-text.component.html',
  styleUrls: ['./contact-text.component.css']
})
export class ContactTextComponent {
  @Input() contactText!: SafeHtml;
}
