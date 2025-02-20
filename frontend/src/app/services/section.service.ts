import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChildSection } from '../admin/admin-panel/admin-panel.component';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private activeSectionSource = new BehaviorSubject<{ section: string, parentSection: string, id?: any }>({ section: '', parentSection: '' });
  activeSection$ = this.activeSectionSource.asObservable();

  setActiveSection(sectionData: ChildSection) {
    this.activeSectionSource.next(sectionData);
  }
}
