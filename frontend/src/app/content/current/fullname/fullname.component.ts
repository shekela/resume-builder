import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fullname',
  templateUrl: './fullname.component.html',
  styleUrls: ['./fullname.component.css']
})
export class FullnameComponent {
  @Input() fullname: string = "Gio Tavadze"
}
