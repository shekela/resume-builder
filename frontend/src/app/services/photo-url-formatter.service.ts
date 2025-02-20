import { Injectable } from '@angular/core';
import { PhotoUrlFormatter } from '../PhotoUrlFormatter';

@Injectable({
  providedIn: 'root'
})
export class PhotoUrlFormatterService {
  formatPhotoUrl(period: string): string {
      return PhotoUrlFormatter.formatPhotoURL(period);
  }
}
