import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Introduction } from '../introdcution/introduction.model';
import { Experience } from '../content/current/experience/experience.model'; 
import { Skill } from '../content/current/skills/skill.model'; 
import { Awards } from '../content/current/awards-certificates/awards.model'; 
import { Work } from '../selected-works/work.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RequestsService {
  private apiUrl = `${environment.apiUrl}/api`;

  // BehaviorSubject to store and share profile data
  private profileSubject = new BehaviorSubject<Introduction | null>(null);
  public profile$ = this.profileSubject.asObservable(); // Observable for components to subscribe to

  private worksSubject = new BehaviorSubject<Work[]>([]);
  public works$ = this.worksSubject.asObservable();

  private aboutTextSubject = new BehaviorSubject<any>(null);
  public aboutText$ = this.aboutTextSubject.asObservable();

  private contactSubject = new BehaviorSubject<any>(null);
  public contact$ = this.contactSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshWorks();
  }

  //---------------------------------------------------------------Profile of user---------------------------------------------------------------

  // GET: Get the profile and update the BehaviorSubject
  getUserProfile(): Observable<Introduction> {
    return this.http.get<Introduction>(`${this.apiUrl}/Profile/get-profile`).pipe(
      tap(profile => {
        if (profile) {
          this.profileSubject.next(profile); // ✅ Ensure BehaviorSubject gets updated
        } else {
          console.warn("⚠️ Received empty profile from API.");
        }
      })
    );
}


  // UPDATE OR CREATE PROFILE and notify subscribers
  updateUserProfile(formData: FormData): Observable<Introduction> {
    return this.http.post<Introduction>(`${this.apiUrl}/Profile/create-profile`, formData, {
      headers: {
        // ✅ Do NOT set `Content-Type`: Angular automatically sets it for `FormData`
      }
    }).pipe(
      tap(updatedProfile => {
        this.profileSubject.next(updatedProfile);
      })
    );
  }

  // DELETE: Delete the profile
  deleteProfile(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Profile/delete-profile`);
  }

  // GET: Download CV
  downloadCV(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/Profile/download-cv`, {
      responseType: 'blob',
    });
  }

  getCVUrl(): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.apiUrl}/Profile/download-cv`);
  }
  

  //---------------------------------------------------------------Works of user---------------------------------------------------------------
  getAllWorks(): Observable<Work[]> {
    return this.http.get<Work[]>(`${this.apiUrl}/Works/get-all-works`).pipe(
      tap(works => {
        if (works && works.length > 0) {
          this.worksSubject.next(works); // ✅ Only update BehaviorSubject when works are available
        } else {
          console.warn("⚠️ API returned an empty works list.");
        }
      })
    );
  }


  getWorkBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Works/get-work/${slug}`);
  }

  addWork(work: any): Observable<Work[]> {
    return this.http.post<Work[]>(`${this.apiUrl}/Works/add-work`, work).pipe(
      tap(updatedWorks => {
        if (updatedWorks && updatedWorks.length > 0) {
          this.worksSubject.next(updatedWorks); // ✅ Update UI immediately
        } else {
          console.warn("⚠️ Warning: Backend returned empty works list after adding.");
        }
      })
    );
  }
  

  updateWork(work: Work): Observable<any> {
    return this.http.post(`${this.apiUrl}/Works/update-work/${work.id}`, work).pipe(
      tap(() => this.refreshWorks())
    );
  }

  deleteWork(id: number): Observable<Work[]> {
    return this.http.delete<Work[]>(`${this.apiUrl}/Works/delete-work/${id}`).pipe(
      tap(updatedWorks => {
        if (updatedWorks && updatedWorks.length >= 0) {
          this.worksSubject.next(updatedWorks); // ✅ Update BehaviorSubject immediately
        } else {
          console.error("❌ Error: Backend returned empty works list.");
        }
      })
    );
  }

  deleteWorkPhoto(worId: number, pictureId: number):Observable<Work[]>{
    return this.http.delete<Work[]>(`${this.apiUrl}/Works/delete-work-photo/${worId}/${pictureId}`).pipe(
      tap(updatedWorks => {
        if (updatedWorks && updatedWorks.length >= 0) {
          this.worksSubject.next(updatedWorks); // ✅ Only update if valid
        } else {
          console.error("Error: Backend returned empty works list.");
        }
      })
    );
  }


  addWorkPicture(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Works/add-gallery`, formData, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        // ✅ Remove 'Content-Type', Angular automatically sets it for `FormData`
      })
    });
  }
  

  refreshWorks(): void {
    this.getAllWorks().subscribe();
  }

  //---------------------------------------------------------------Experiences of user----------------------------------------------------------
  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/Experiences`);
  }

  getExperienceById(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/Experiences/get-experience/${id}`);
  }

  addExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(`${this.apiUrl}/Experiences/add-experience`, experience);
  }

  updateExperience(id: number, experience: Experience): Observable<void> {
    const requestPayload = {
      id: id, // ✅ Ensure the correct ID is included
      role: experience.role,
      place: experience.place,
      period: {
        startYear: experience.period.startYear,
        endYear: experience.period.endYear
      }
    };
  
    return this.http.put<void>(`${this.apiUrl}/Experiences/update-experience/${id}`, requestPayload);
  }
  
  

  deleteExperience(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Experiences/experience/${id}`);
  }

  //---------------------------------------------------------------Skills of user---------------------------------------------------------------
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/Skills/get-skills`);
  }

  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}/Skills/add-skill`, skill);
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Skills/delete-skill/${id}`);
  }


  //---------------------------------------------------------------Awards of user---------------------------------------------------------------
  getAwards(): Observable<Awards[]> {
    return this.http.get<Awards[]>(`${this.apiUrl}/Awards/`);
  }

  getAwardById(id: number): Observable<Awards> {
    return this.http.get<Awards>(`${this.apiUrl}/Awards/${id}`);
  }

  addAward(experience: Awards): Observable<Awards> {
    return this.http.post<Awards>(`${this.apiUrl}/Awards`, experience);
  }

  updateAward(id: number, award: Awards): Observable<void> {
    const requestPayload = {
      id: id, // ✅ Ensure the correct ID is included
      role: award.role,
      place: award.place,
      year: award.year
    };
  
    return this.http.put<void>(`${this.apiUrl}/Awards/${id}`, requestPayload);
  }

  deleteAward(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Awards/${id}`);
  }

  //---------------------------------------------------------------About Text of user---------------------------------------------------------------
  getAbout(): Observable<any>{
    //return this.http.get(`${this.apiUrl}/About`);
    return this.http.get<any>(`${this.apiUrl}/About`).pipe(
      tap(content => {
        this.aboutTextSubject.next(content); // Update BehaviorSubject
      })
    );
  }

  updateAboutText(content: FormData): Observable<any> {
    //return this.http.post(`${this.apiUrl}/About`, content);
    return this.http.post<any>(`${this.apiUrl}/About`, content, {
      headers: {
        // ✅ Do NOT set `Content-Type`: Angular automatically sets it for `FormData`
      }
    }).pipe(
      tap(updatedContent => {
        this.aboutTextSubject.next(updatedContent);
      })
    );
  }

  //---------------------------------------------------------------Contact of user---------------------------------------------------------------
  getContact(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Contact`).pipe(
      tap(contact => {
        this.contactSubject.next(contact); // Update BehaviorSubject
      })
    );
  }

  updateContact(content: FormData): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/Contact`, content).pipe(
      tap(contact => {
        this.contactSubject.next(contact);
      })
    )
  }
}