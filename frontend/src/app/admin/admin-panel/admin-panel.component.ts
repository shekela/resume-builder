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
  isSidebarOpen: boolean = false;
  isSectionChosen: boolean = false;

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
    this.toggleSidebar();
    this.isSectionChosen = true;
  }

  isActiveSection(sectionName: string, parentSection: string, id?: number): boolean {
    if (parentSection === "selectedWorks") {
        // ✅ Ensure active selection for works
        return (
            this.activeChildSection?.section === sectionName &&
            this.activeChildSection?.parentSection === parentSection &&
            this.displayedWork?.id === id
        );
    } else {
        // ✅ Ensure active selection for other sections (fullname, greeting, photo, etc.)
        return (
            this.activeChildSection?.section === sectionName &&
            this.activeChildSection?.parentSection === parentSection
        );
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  onWorkAdded(updatedWorks: Work[]): void {
    if (updatedWorks && updatedWorks.length > 0) {
      this.selectedWorks = updatedWorks;
      this.totalworks = updatedWorks.length;
  
      this.displayedWorks = updatedWorks.filter(work => 
        this.displayedWorks.some(w => w.id === work.id) || work.id
      );
  
      this.loadMore();
      this.cdr.detectChanges();
    } else {
      console.warn("⚠️ Warning: Empty works list after adding.");
    }
  }


  deleteWork(id?: number) {
    if (id === undefined) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this work?");
    if (!confirmDelete) return;

    // ✅ Find index of the currently displayed work BEFORE deleting
    const currentIndex = this.selectedWorks.findIndex(work => work.id === id);

    this.requestsService.deleteWork(id).subscribe({
      next: () => {
        console.log(`✅ Work with ID ${id} deleted successfully.`);

        // ✅ Remove deleted work from lists
        this.selectedWorks = this.selectedWorks.filter(work => work.id !== id);
        this.displayedWorks = this.displayedWorks.filter(work => work.id !== id);
        this.totalworks = this.selectedWorks.length;

        // ✅ Determine next displayed work
        if (this.selectedWorks.length > 0) {
          if (currentIndex === this.selectedWorks.length) {
            // If last item was deleted, move to the previous work
            this.displayedWork = this.selectedWorks[currentIndex - 1] || this.selectedWorks[0];
          } else {
            // Otherwise, move to the next work
            this.displayedWork = this.selectedWorks[currentIndex] || this.selectedWorks[0];
          }
          
          // ✅ Ensure the new displayedWork is also the active section
          this.activeChildSection = {
            section: this.displayedWork.name,
            parentSection: "selectedWorks",
            id: this.displayedWork.id,
          };
        } else {
          // If no works left, reset displayedWork & activeChildSection
          this.displayedWork = {} as Work;
          this.activeChildSection = {} as ChildSection;
        }

        this.loadMore(); // ✅ Ensure displayed works update
        this.cdr.detectChanges(); // ✅ Force UI update
      },
      error: (err) => {
        console.error("❌ Error deleting work:", err);
      }
    });
}



  
  ngOnInit(): void {
    this.requestsService.getUserProfile().subscribe(); 
    this.requestsService.profile$.subscribe(profile => {
      if (profile) {
        this.updateProfileUI(profile); 
      }
    });

    this.requestsService.getAllWorks().subscribe(); // ✅ Fetch works from API once
    this.requestsService.works$.subscribe(works => {
      if (works && works.length > 0) { 
        this.selectedWorks = [...works]; 
        this.totalworks = this.selectedWorks.length;
        this.loadMore();

        this.cdr.detectChanges(); // ✅ Force Angular to refresh UI
      } else {
        console.warn("⚠️ Works list is empty.");
      }
    });


    this.requestsService.getAbout().subscribe();
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
      
        
    this.requestsService.getContact().subscribe();
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
  }

  
  private updateProfileUI(profile: Introduction): void {
    this.introduction = { ...profile }; // ✅ Ensures Angular detects changes
    this.safeGreetingText = this.sanitizer.bypassSecurityTrustHtml(profile.greetingText);
    this.introduction.photo = this.photoURLFormatter.formatPhotoUrl(profile.photo);
    this.cdr.detectChanges(); // ✅ Forces Angular to update UI immediately
  }


  loadMore(): void {
    if (!this.selectedWorks || this.selectedWorks.length === 0) {
        console.error("selectedWorks is undefined or empty");
        return; 
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

// ngOnInit(): void {
//   this.requestsService.profile$.subscribe(profile => {
//     console.log('🔄 Received updated profile in IntroductionComponent:', profile);

//     if (profile) {
//       const updatedProfile = { 
//         ...profile, 
//         name: profile.name ? profile.name : 'Fullname',
//         photo: profile.photo 
//           ? this.photoURLFormatter.formatPhotoUrl(profile.photo) // ✅ Format if photo exists
//           : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png', // ✅ Use default if missing
//       };

//       this.introduction = updatedProfile;

//       // ✅ Set sanitized greeting text or default if missing
//       this.safeGreetingText = this.sanitizer.bypassSecurityTrustHtml(
//         profile.greetingText 
//           ? profile.greetingText 
//           : '<p style="color: white;font-family: sans-serif;">Your default greeting text. Introduce your clients yourself. Tell shortly about yourself.</p>'
//       );

//       // 🔹 Manually trigger change detection to force UI update
//       this.cdr.detectChanges();
//     } 
//     else {
//       console.warn("⚠️ Profile data is missing:", profile);
//     }
//   });
  
//   this.requestsService.getUserProfile().subscribe();

//   // ✅ Subscribe to works$ to get real-time updates
//   this.requestsService.works$.subscribe(works => {
//     if (works && works.length > 0) { 
//       console.log("✅ Works received and UI updating:", works);
//       this.selectedWorks = works;
//       this.totalworks = works.length;

//       this.loadMore()
//     } else {
//       console.warn("⚠️ Works list is empty after update.");
//     }
//   });

//   // ✅ Fetch works initially
//   this.requestsService.getAllWorks().subscribe();

//   // Fetch other data
//   this.requestsService.getExperiences().subscribe(exps => {
//     this.experiences = exps;
//   });

//   this.requestsService.getAwards().subscribe(awards => {
//     this.Awards = awards;
//   });

//   this.requestsService.getSkills().subscribe(skills => {
//     this.skills = skills;
//   });

//   this.requestsService.aboutText$.subscribe(text => {
//     if(text) {
//       this.safeAboutText = this.sanitizer.bypassSecurityTrustHtml(
//         text.content
//           ? text.content
//           : '<p style="color: white;font-family: sans-serif;">Your default About text. Explain your motive and aim. Tell shortly about yourself.</p>'
//       );
//       this.cdr.detectChanges();
//     }
//   });

//   this.requestsService.contact$.subscribe(contact => {
//     if(contact){
//       this.safeContactText = this.sanitizer.bypassSecurityTrustHtml(
//         contact.contactText 
//           ? contact.contactText 
//           : '<p style="color: white;font-family: sans-serif;">Your default contact text. Ask you clients how to contact you.</p>'
//       );
//       console.log("Contact data:" + contact);
//     }
//   });

//   this.requestsService.getContact().subscribe();
//   this.requestsService.getAbout().subscribe();

//   this.loadMore();
// }

// loadMore(): void {
//   if (!this.selectedWorks || this.selectedWorks.length === 0) {
//       console.error("selectedWorks is undefined or empty");
//       return; // Exit the function early
//   }

//   const nextBatch = this.selectedWorks.slice(
//       this.loadedCount,
//       this.loadedCount + 5
//   );

//   this.displayedWorks = [...this.displayedWorks, ...nextBatch];
//   this.loadedCount = this.displayedWorks.length;
//   this.progressPercentage = Math.ceil(
//       (this.loadedCount / this.totalworks) * 100
//   );
// }