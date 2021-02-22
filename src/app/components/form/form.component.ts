import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Bookmark } from 'src/app/models/bookmark';

import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
// TODO: validation
export class FormComponent implements OnInit {
  bookmarkForm = this.fb.group({
    url: [''],
  });

  constructor(
    private fb: FormBuilder,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const newBookmark: Omit<Bookmark, 'id'> = this.bookmarkForm.value;
    this.bookmarkService.addBookmark(newBookmark).subscribe(() => {
      this.bookmarkForm.reset();

      // todo: use store, delegate service access to parent component?
      this.bookmarkService.getBookmarks().subscribe((bookmarks) => {
        console.log(bookmarks);
      });
    });
  }
}
