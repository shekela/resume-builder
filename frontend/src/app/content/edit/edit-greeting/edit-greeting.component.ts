import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Introduction } from 'src/app/introdcution/introduction.model';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-greeting',
  templateUrl: './edit-greeting.component.html',
  styleUrls: ['./edit-greeting.component.css']
})
export class EditGreetingComponent {
    greetingContent: string = ''; // Holds the About section content
    savedContent: string = ''; // Stores retrieved content

    introduction!: Introduction;

    // TinyMCE Configuration
    editorConfig = {
      apiKey: 'wsic06fnvkfmbnyp19kf23udg76l91nek4ja31fc14xbiafk',
      plugins: 'paste advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
      toolbar: 'undo redo | formatselect | fontselect fontsizeselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
      
      content_style: `
        body { font-size: 14px; color: white; background-color: black; }
        p { margin: 5px 0; line-height: 1.5; }
      `,

      // ✅ Allow all inline styles (font-family, color, font-size)
      extended_valid_elements: 'span[style],p[style],h1[style],h2[style],h3[style],h4[style],h5[style],h6[style]',
      valid_children: '+body[style],+p[style],+span[style]',
      forced_root_block: 'p', // Wrap text in paragraphs

      paste_as_text: false, // ✅ Keep styles when pasting
      inline_styles: true, // ✅ Force inline styles instead of CSS classes

      // ✅ Force TinyMCE to save font-family, font-size, and color as inline styles
      formats: {
        forecolor: { inline: 'span', styles: { color: '%value' } },
        backcolor: { inline: 'span', styles: { backgroundColor: '%value' } },
        fontfamily: { inline: 'span', styles: { fontFamily: '%value' } }, // ✅ Force font-family inline
        fontsize: { inline: 'span', styles: { fontSize: '%value' } } // ✅ Force font-size inline
      },

      // ✅ Allow Users to Choose Font-Family and Font-Size
      font_formats: 'Arial=arial,helvetica,sans-serif; Times New Roman=times new roman,times,serif; Courier New=courier new,courier,monospace;',
      fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 72px'
    };
  
  
  constructor(private requestsService: RequestsService, private cdr: ChangeDetectorRef) {}


  submitForm() {
    if (!this.introduction) {
      return;
    }
  
    if (this.greetingContent.trim() === '') {
      return;
    }
  
    const formData = new FormData();
    formData.append("GreetingText", this.greetingContent)
  
    this.requestsService.updateUserProfile(formData).subscribe(
      response => {
        alert('Profile updated successfully!');
      },
      error => {
        console.error('❌ Error updating profile:', error);
        alert('Something went wrong. Please try again.');
      }
    );
  }

  ngOnInit(): void {
    this.requestsService.profile$.subscribe(profile => {
      if (profile) {
        this.introduction = profile;
        this.greetingContent = profile.greetingText;
        this.cdr.detectChanges();
      }
    });
  }
}
