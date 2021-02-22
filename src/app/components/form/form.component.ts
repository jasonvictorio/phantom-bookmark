import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Bookmark } from 'src/app/models/bookmark';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
// TODO: validation
export class FormComponent {
  @Output() submitForm = new EventEmitter<any>();
  URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  bookmarkForm = this.fb.group({
    url: ['', [Validators.required, Validators.pattern(this.URL_REGEX)]],
  });

  constructor(private fb: FormBuilder) {}

  onFormSubmit() {
    const newBookmark: Omit<Bookmark, 'id'> = this.bookmarkForm.value;

    if (this.bookmarkForm.valid) {
      this.submitForm.emit(newBookmark);
    }
  }
}
