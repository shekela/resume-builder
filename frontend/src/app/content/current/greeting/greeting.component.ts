import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent {
  @Input() greeting: SafeHtml = '<p style="color: white;font-family: sans-serif;">Your default greeting text. Introduce your clients yourself. Tell shortly about yourself.</p>';
}
