import { environment } from "src/environments/environment";
export class PhotoUrlFormatter {
    static formatPhotoURL(photo: string) {
      if (photo) {
        return `${environment.apiUrl}${photo}`;
      }
        return "CANNOT FIND PHOTO"
    }
}