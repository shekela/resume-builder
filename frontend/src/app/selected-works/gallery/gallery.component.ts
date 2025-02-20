import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  @Input() pictures: string[] = [];
  displayedPictures: string[] = [];
  totalPictures!: number;
  loadedCount = 0;
  progressPercentage = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pictures'] && changes['pictures'].currentValue) {
      this.initializeGallery();
    }
  }

  initializeGallery(): void {
    if (!this.pictures || this.pictures.length === 0) {
      console.warn('No pictures available to display.');
      return;
    }
    this.totalPictures = this.pictures.length;
    this.loadedCount = 0;
    this.progressPercentage = 0;
    this.displayedPictures = [];
    this.loadMore();
  }

  loadMore(): void {
    const nextBatch = this.pictures.slice(this.loadedCount, this.loadedCount + 2);
    this.displayedPictures = [...this.displayedPictures, ...nextBatch];
    this.loadedCount = this.displayedPictures.length;
    this.progressPercentage = Math.ceil((this.loadedCount / this.totalPictures) * 100);
  }
}
