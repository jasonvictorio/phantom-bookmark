import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Bookmark } from 'src/app/models/bookmark';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
// TODO: validation
export class FormComponent implements OnChanges {
  @Input() bookmark: Bookmark | null = null;
  @Output() submitForm = new EventEmitter<any>();
  @Output() clearBookmark = new EventEmitter<any>();
  URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  errorMessage: string | null = null;

  bookmarkForm = this.fb.group({
    url: ['', [Validators.required, Validators.pattern(this.URL_REGEX)]],
  });

  constructor(private fb: FormBuilder) {}

  onFormSubmit() {
    const newBookmark: Omit<Bookmark, 'id'> = this.bookmarkForm.value;
    this.errorMessage = this.getErrorMessage();

    if (!this.bookmarkForm.valid) return;
    if (this.bookmark) {
      this.submitForm.emit({ ...this.bookmark, ...newBookmark });
    } else {
      this.submitForm.emit(newBookmark);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.errorMessage = null;
    if (changes.bookmark.currentValue === null) {
      this.bookmarkForm.reset();
    } else {
      this.bookmarkForm.patchValue(changes.bookmark.currentValue);
    }
  }

  getErrorMessage() {
    // basic error message deduction
    if (this.bookmarkForm.value.url) return 'url is invalid';
    if (!this.bookmarkForm.valid) return 'url is required';
    return null;
  }
}
