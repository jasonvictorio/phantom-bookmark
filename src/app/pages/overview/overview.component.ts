import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Bookmark } from 'src/app/models/bookmark';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  bookmarks: Bookmark[] = [];
  bookmark: Bookmark | null = null;
  pagination: [number, number] = [0, 20];

  constructor(
    private router: Router,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.getBookmarks();
  }

  getBookmarks(): void {
    this.bookmarkService
      .getBookmarks(this.pagination)
      .subscribe((bookmarks) => {
        this.bookmarks = bookmarks;
      });
  }

  onDeleteBookmark(bookmark: Bookmark): void {
    this.bookmarkService.deleteBookmark(bookmark).subscribe(() => {
      this.getBookmarks();
    });
  }

  onEditBookmark(bookmark: Bookmark): void {
    this.bookmark = bookmark;
  }

  onSubmit(bookmark: { id?: number; url: string }) {
    if (bookmark.id) {
      this.bookmarkService
        .updateBookmark(bookmark as Bookmark)
        .subscribe((newBookmark) => {
          this.router.navigate(['/results', newBookmark.id]);
        });
    } else {
      this.bookmarkService.addBookmark(bookmark).subscribe((newBookmark) => {
        this.router.navigate(['/results', newBookmark.id]);
      });
    }
  }

  onClearBookmark() {
    this.bookmark = null;
  }

  previous() {
    const [from, max] = this.pagination;
    this.pagination = [from - 20, max];
    this.getBookmarks();
  }
  next() {
    const [from, max] = this.pagination;
    this.pagination = [from + 20, max];
    this.getBookmarks();
  }
}
