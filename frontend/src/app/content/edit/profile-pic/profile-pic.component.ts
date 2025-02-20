import { Component } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'edit-app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css']
})
export class ProfilePicComponent {
  selectedFile: File | null = null;
  fileName: string = '';
  filePreview: string | ArrayBuffer | null = null;
  isUploading: boolean = false;
  uploadSuccess: boolean = false;

  constructor(private requestsService: RequestsService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
      this.uploadSuccess = false; // Reset success message

      // Show file preview
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
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
    formData.append('Photo', this.selectedFile);

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
