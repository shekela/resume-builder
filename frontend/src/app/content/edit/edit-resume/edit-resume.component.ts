import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-resume',
  templateUrl: './edit-resume.component.html',
  styleUrls: ['./edit-resume.component.css']
})
export class EditResumeComponent {
    selectedFile: File | null = null;
    fileName: string = '';
    filePreview: string | ArrayBuffer | null = null;

    filePreviewView: SafeResourceUrl | null = null;

    isUploading: boolean = false;
    uploadSuccess: boolean = false;
  
    constructor(private requestsService: RequestsService, private sanitizer: DomSanitizer) {}
  
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        this.fileName = this.selectedFile.name;
  
        const fileType = this.selectedFile.type;
        const fileURL = URL.createObjectURL(this.selectedFile); // ✅ Generate preview URL
  
        console.log("Selected File Type:", fileType);
        console.log("Generated Preview URL:", fileURL);
  
        if (fileType === 'application/pdf') {
          // ✅ PDF Files: Use blob URL inside iframe
          this.filePreviewView = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
        } 
        else if (
          fileType === 'application/msword' || 
          fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          // ✅ DOCX Files: Convert to Google Docs Viewer
          const googleDocsURL = `https://docs.google.com/gview?url=${encodeURIComponent(fileURL)}&embedded=true`;
          this.filePreviewView = this.sanitizer.bypassSecurityTrustResourceUrl(googleDocsURL);
        } 
        else {
          alert('Unsupported file type. Please select a PDF or Word document.');
          this.filePreviewView = null;
        }
      }
    }
    uploadFile() {
      if (!this.selectedFile) {
        alert('Please select a file first.');
        return;
      }
  
      this.isUploading = true;
      this.uploadSuccess = false;
  
      const formData = new FormData();
      formData.append('CV', this.selectedFile);
  
      this.requestsService.updateUserProfile(formData).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.uploadSuccess = true;
          alert('Profile updated successfully!');
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
        },
        complete: () => {
          this.isUploading = false;
        }
      });
    }
}
