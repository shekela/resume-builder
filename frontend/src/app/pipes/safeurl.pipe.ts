import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeurl'
})
export class SafeurlPipe implements PipeTransform {
     
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null): SafeResourceUrl | null {
    return value ? this.sanitizer.bypassSecurityTrustResourceUrl(value) : null;
  }

}
