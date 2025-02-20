import { Component, OnInit } from '@angular/core';
import { Awards } from './awards.model';
import { RequestsService } from 'src/app/services/requests.service'; 

@Component({
  selector: 'app-awards-certificates',
  templateUrl: './awards-certificates.component.html',
  styleUrls: ['./awards-certificates.component.css']
})
export class AwardsCertificatesComponent implements OnInit{
  awards: Awards[] = [];

  constructor(private http: RequestsService){}
  ngOnInit(): void{
    this.http.getAwards().subscribe(x => {
      this.awards = x;
    })
  }
}
