import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IntrodcutionComponent } from './introdcution/introdcution.component';
import { SelectedWorksComponent } from './selected-works/selected-works.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { SkillsComponent } from './content/current/skills/skills.component'; 
import { ExperienceComponent } from './content/current/experience/experience.component'; 
import { AwardsCertificatesComponent } from './content/current/awards-certificates/awards-certificates.component'; 
import { SelectedWorkComponent } from './selected-works/selected-work/selected-work.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WorkComponent } from './selected-works/work/work.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { GalleryComponent } from './selected-works/gallery/gallery.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { HttpClientModule } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FullnameComponent as FullnameContent} from './content/current/fullname/fullname.component';
import { FullnameComponent as FullnameEdit} from './content/edit/fullname/fullname.component';
import { GreetingComponent } from './content/current/greeting/greeting.component';
import { EditGreetingComponent } from './content/edit/edit-greeting/edit-greeting.component';
import { ProfilePicComponent } from './content/current/profile-pic/profile-pic.component';
import { ProfilePicComponent as EditProfilePic } from './content/edit/profile-pic/profile-pic.component';
import { ResumeComponent } from './content/current/resume/resume.component';
import { EditResumeComponent } from './content/edit/edit-resume/edit-resume.component';
import { SafeurlPipe } from './pipes/safeurl.pipe';
import { EditWorkComponent } from './content/edit/edit-work/edit-work.component';
import { SidebarComponent } from './admin/admin-panel/sidebar/sidebar.component';
import { CurrentContentComponent } from './admin/admin-panel/current-content/current-content.component';
import { ContentEditorComponent } from './admin/admin-panel/content-editor/content-editor.component';
import { PanelRedoComponent } from './admin/admin-panel/panel-redo/panel-redo.component';
import { AboutTextComponent } from './content/current/about-text/about-text.component';
import { AboutTextEditComponent } from './content/edit/about-text-edit/about-text-edit.component';
import { SkillsEditComponent } from './content/edit/skills-edit/skills-edit.component';

import { ExperienceListComponent } from './content/edit/experience-list/experience-list.component';
import { ExperienceFormComponent } from './content/edit/experience-form/experience-form.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';
import { AwardsListComponent } from './content/edit/awards-list/awards-list.component';
import { AwardsFormComponent } from './content/edit/awards-form/awards-form.component';
import { SkillsFormComponent } from './content/edit/skills-form/skills-form.component';
import { SkillsListComponent } from './content/edit/skills-list/skills-list.component';
import { ContactTextComponent } from './content/current/contact-text/contact-text.component';
import { EditContactTextComponent } from './content/edit/edit-contact-text/edit-contact-text.component';
import { EditSocialMediaComponent } from './content/edit/edit-social-media/edit-social-media.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IntrodcutionComponent,
    SelectedWorksComponent,
    AboutSectionComponent,
    SkillsComponent,
    ExperienceComponent,
    AwardsCertificatesComponent,
    SelectedWorkComponent,
    ContactComponent,
    WorkComponent,
    MainpageComponent,
    GalleryComponent,
    AdminPanelComponent,
    AdminLoginComponent,
    FullnameContent,
    FullnameEdit,
    GreetingComponent,
    EditGreetingComponent,
    ProfilePicComponent,
    EditProfilePic,
    ResumeComponent,
    EditResumeComponent,
    SafeurlPipe,
    EditWorkComponent,
    SidebarComponent,
    CurrentContentComponent,
    ContentEditorComponent,
    PanelRedoComponent,
    AboutTextComponent,
    AboutTextEditComponent,
    SkillsEditComponent,
    ExperienceListComponent,
    ExperienceFormComponent,
    AwardsListComponent,
    AwardsFormComponent,
    SkillsFormComponent,
    SkillsListComponent,
    ContactTextComponent,
    EditContactTextComponent,
    EditSocialMediaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    EditorModule,
    MatDialogModule,   // ✅ Import Dialog for Modal
    MatButtonModule,   // ✅ Import Button Module
    MatInputModule,    // ✅ Import Input Module (Fix for mat-form-field)
    MatFormFieldModule,// ✅ Import FormField Module (Fix for mat-form-field)
    MatSelectModule,   // ✅ Import Select Dropdown Support
    MatIconModule      //
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
