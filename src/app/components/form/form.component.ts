import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Bookmark } from 'src/app/models/bookmark';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
// TODO: validation
export class FormComponent {
  @Output() submitForm = new EventEmitter<any>();
  bookmarkForm = this.fb.group({
    url: [''],
  });

  constructor(private fb: FormBuilder) {}

  onFormSubmit() {
    const newBookmark: Omit<Bookmark, 'id'> = this.bookmarkForm.value;
    this.submitForm.emit([
      newBookmark,
      () => {
        this.bookmarkForm.reset();
      },
    ]);
  }
}
