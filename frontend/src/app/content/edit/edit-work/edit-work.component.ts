import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoUrlFormatter } from 'src/app/PhotoUrlFormatter';
import { Work } from 'src/app/selected-works/work.model';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.css']
})
export class EditWorkComponent {
  @Input() work!: Work; // The work object to edit
  @Input() task!: string;
  @Input() update: boolean = false;

  Gallery!: any[];
  displayedPictures: any[] = [];
  totalPictures!: number;
  loadedCount = 0;
  progressPercentage = 0;

  workForm!: FormGroup;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';


  @Output() workAdded = new EventEmitter<Work[]>();

  constructor(private fb: FormBuilder, private requestsService: RequestsService) {}

  ngOnInit(): void {

    if (this.work && this.work.slug) {
      this.requestsService.getWorkBySlug(this.work.slug).subscribe(x => {
        this.Gallery = x.workGallery.map((item: any) => ({
          ...item,
          picture: `${PhotoUrlFormatter.formatPhotoURL(item.picture)}` 
        }));; 
        console.log("✅ Gallery initialized:", this.Gallery); // Debugging log

        // ✅ Only initialize gallery after data is available
        this.initializeGallery();
      });
    } else {
      console.warn("Work slug is undefined, skipping API call.");
    }

    this.workForm = this.fb.group({
      name: [this.work?.name || '', Validators.required],
      year: [this.work?.year || '', [Validators.required, Validators.pattern(/^\d{4}$/)]], // Ensures a 4-digit year
      role: [this.work?.role || '', Validators.required],
      location: [this.work?.location || '', Validators.required],
      type: [this.work?.type || '', Validators.required],
      imageUrl: [this.work?.imageUrl || '', Validators.required],
      description: [this.work?.description || '', [Validators.required, Validators.minLength(10)]],
    });
  }

  submitForm() {
    if (this.workForm.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.update) {
      this.requestsService.updateWork(this.workForm.value).subscribe({
        next: () => {
          this.successMessage = 'Work updated successfully!';
          this.isSubmitting = false;
          this.workAdded.emit()
        },
        error: (err) => {
          this.errorMessage = 'Error updating work. Please try again.';
          console.error(err);
          this.isSubmitting = false;
        }
      });
    } else {
      this.requestsService.addWork(this.workForm.value).subscribe({
        next: (updatedWorks) => {
          this.successMessage = 'Work added successfully!';
          this.workAdded.emit(updatedWorks); // ✅ Emit the updated list to the parent
          this.workForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          this.errorMessage = 'Error adding work. Please try again.';
          console.error(err);
          this.isSubmitting = false;
        }
      });
    }
  }

  initializeGallery(): void {
    if (!this.Gallery || this.Gallery.length === 0) {
      console.warn('No pictures available to display.');
      return;
    }
    this.totalPictures = this.Gallery.length;
    this.loadedCount = 0;
    this.progressPercentage = 0;
    this.displayedPictures = [];
    this.loadMore();
  }

  loadMore(loadAmount?: number): void {
    if (!this.Gallery || this.Gallery.length === 0) {
      console.warn('⚠️ Warning: No pictures available to load.');
      return;
    }
  
    if(loadAmount){
      const nextBatch = this.Gallery.slice(this.loadedCount, this.loadedCount + loadAmount);
      this.displayedPictures = [...this.displayedPictures, ...nextBatch];
      this.loadedCount = this.displayedPictures.length;
      this.progressPercentage = Math.ceil((this.loadedCount / this.totalPictures) * 100);
    }
    else{
      const nextBatch = this.Gallery.slice(this.loadedCount, this.loadedCount + 4);
      this.displayedPictures = [...this.displayedPictures, ...nextBatch];
      this.loadedCount = this.displayedPictures.length;
      this.progressPercentage = Math.ceil((this.loadedCount / this.totalPictures) * 100);
    }
  
    console.log("✅ Loaded more pictures:", this.displayedPictures);
  }
  
  selectedFile: File | null = null;
  fileName: string = '';
  filePreview: string | ArrayBuffer | null = null;
  isUploading: boolean = false;
  uploadSuccess: boolean = false;


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
  
    if (!this.work || this.work.id === undefined || this.work.id === null) {
      alert('Work ID is missing. Cannot upload file.');
      console.error('❌ Error: Work ID is undefined or null.');
      return;
    }
  
    console.log("📡 Work ID before upload:", this.work.id, typeof this.work.id);
    console.log("📡 Selected File before upload:", this.selectedFile);
  
    this.isUploading = true;
    this.uploadSuccess = false;
  
    const formData = new FormData();
    formData.append('Picture', this.selectedFile);
    formData.append('WorkId', this.work.id.toString());
  
    this.requestsService.addWorkPicture(formData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((event.loaded / (event.total || 1)) * 100);
          console.log(`📡 Upload Progress: ${percentDone}%`);
        } else if (event instanceof HttpResponse) {
          console.log('✅ File uploaded successfully:', event.body);
          this.uploadSuccess = true;
          alert('File uploaded successfully!'); // ✅ Alert only triggers once
        }
      },
      error: (error) => {
        console.error('❌ Error uploading file:', error);
        if (error.status === 200 || error.status === 201) {
          console.warn("⚠️ Backend returned success but triggered error block.");
          this.uploadSuccess = true;
          alert('File uploaded successfully!');
        } else {
          alert('Failed to upload file. Please try again.');
        }
      },      
      complete: () => {
        this.isUploading = false;
      }
    });
  }

  deleteImage(index: number, picture?: any) {
    if (!picture) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this photo?");
    if (!confirmDelete) return; // Cancel deletion if user clicks "Cancel"

    this.requestsService.deleteWorkPhoto(picture.workId, picture.id).subscribe({
        next: () => {
            // Remove the image from the Gallery and displayedPictures
            this.Gallery = this.Gallery.filter(img => img.id !== picture.id);
            this.displayedPictures = this.displayedPictures.filter(img => img.id !== picture.id);

            this.loadedCount = this.displayedPictures.length;
            this.loadMore(1);
            this.totalPictures -= 1;
            this.progressPercentage = Math.ceil((this.loadedCount / this.totalPictures) * 100);
        },
        error: (err) => {
            console.error("Error deleting image:", err);
        }
    });
   }

}