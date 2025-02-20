import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Awards } from 'src/app/content/current/awards-certificates/awards.model'; 
import { Experience } from 'src/app/content/current/experience/experience.model'; 
import { Introduction } from 'src/app/introdcution/introduction.model';
import { Work } from 'src/app/selected-works/work.model';
import { PhotoUrlFormatterService } from 'src/app/services/photo-url-formatter.service';
import { RequestsService } from 'src/app/services/requests.service';
import { Skill } from 'src/app/content/current/skills/skill.model'; 
import { Contact } from 'src/app/contact/contact.model';


export interface ChildSection{
  parentSection: string;
  section: string;
  id?: number;
}

export type dropdown = 'introduction' | 'selectedWorks' | 'about' | 'contact';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})

export class AdminPanelComponent implements OnInit{
  constructor(private requestsService: RequestsService,  
              private sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef,
              private photoURLFormatter: PhotoUrlFormatterService,){}

  isEditorActive: boolean = false;

  selectedWorks!: Work[];
  introduction!: Introduction;
  safeGreetingText!: SafeHtml;
  displayedWork!: Work;

  experiences!: Experience[];
  skills!: Skill[];
  Awards!: Awards[];
  safeAboutText!: SafeHtml;

  contact!: Contact;
  safeContactText!: SafeHtml;
                        
  activeChildSection!: ChildSection;
  openedParentSections: string[] = [];

  totalworks!: number; // Total number of pictures
  loadedCount: number = 0; // Number of pictures currently loaded
  progressPercentage: number = 0;
  displayedWorks: Work[] = [];


  


  toggleDropdown(section: dropdown) {
    if(this.openedParentSections.includes(section)){
      this.openedParentSections = this.openedParentSections.filter(item => item !== section);
    }           
    else{
      this.openedParentSections.push(section);
    }
  }


  toggleEditor(){
    this.isEditorActive = !this.isEditorActive;
  }


  getToggleIcon(section: string): string {
    if(this.openedParentSections.includes(section)){
      return '+';
    }
    else{
      return '-';
    }
  }


  selectSection(section: ChildSection) {
    this.activeChildSection = section;
    this.isEditorActive = false;
  
    if (section.parentSection === 'selectedWorks') {
      this.displayedWork = this.selectedWorks.find(work => work.id === section.id) || {} as Work;
    }
    
    console.log('Active section:', section);
  }

  isActiveSection(section: string, parentSection: string, workId?: number): boolean {
    return (
      this.activeChildSection?.section === section &&
      this.activeChildSection?.parentSection === parentSection &&
      (!workId || this.displayedWork?.id === workId) // Ensure only the selected work ID is active
    );
  }

  onWorkAdded(updatedWorks: Work[]): void {
    console.log("✅ Updated works received in AdminPanelComponent after adding:", updatedWorks);
  
    if (updatedWorks && updatedWorks.length > 0) {
      this.selectedWorks = updatedWorks;
      this.totalworks = updatedWorks.length;
  
      // ✅ Ensure `displayedWorks` includes the new work
      this.displayedWorks = updatedWorks.filter(work => 
        this.displayedWorks.some(w => w.id === work.id) || work.id
      );
  
      this.loadMore();
      this.cdr.detectChanges();
    } else {
      console.warn("⚠️ Warning: Empty works list after adding.");
    }
  }
  
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
    
    this.requestsService.getUserProfile().subscribe();

    // ✅ Subscribe to works$ to get real-time updates
    this.requestsService.works$.subscribe(works => {
      if (works && works.length > 0) { 
        console.log("✅ Works received and UI updating:", works);
        this.selectedWorks = works;
        this.totalworks = works.length;

        this.loadMore()
      } else {
        console.warn("⚠️ Works list is empty after update.");
      }
    });
  
    // ✅ Fetch works initially
    this.requestsService.getAllWorks().subscribe();
  
    // Fetch other data
    this.requestsService.getExperiences().subscribe(exps => {
      this.experiences = exps;
    });
  
    this.requestsService.getAwards().subscribe(awards => {
      this.Awards = awards;
    });
  
    this.requestsService.getSkills().subscribe(skills => {
      this.skills = skills;
    });

    this.requestsService.aboutText$.subscribe(text => {
      if(text) {
        this.safeAboutText = this.sanitizer.bypassSecurityTrustHtml(
          text.content
            ? text.content
            : '<p style="color: white;font-family: sans-serif;">Your default About text. Explain your motive and aim. Tell shortly about yourself.</p>'
        );
        this.cdr.detectChanges();
      }
    });

    this.requestsService.contact$.subscribe(contact => {
      if(contact){
        this.safeContactText = this.sanitizer.bypassSecurityTrustHtml(
          contact.contactText 
            ? contact.contactText 
            : '<p style="color: white;font-family: sans-serif;">Your default contact text. Ask you clients how to contact you.</p>'
        );
        console.log("Contact data:" + contact);
      }
    });

    this.requestsService.getContact().subscribe();
    this.requestsService.getAbout().subscribe();
  
    this.loadMore();
  }
  
  loadMore(): void {
    if (!this.selectedWorks || this.selectedWorks.length === 0) {
        console.error("selectedWorks is undefined or empty");
        return; // Exit the function early
    }

    const nextBatch = this.selectedWorks.slice(
        this.loadedCount,
        this.loadedCount + 5
    );

    this.displayedWorks = [...this.displayedWorks, ...nextBatch];
    this.loadedCount = this.displayedWorks.length;
    this.progressPercentage = Math.ceil(
        (this.loadedCount / this.totalworks) * 100
    );
}
}
