import { Component, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.getBookmarks();
  }

  getBookmarks(): void {
    this.bookmarkService.getBookmarks().subscribe((bookmarks) => {
      this.bookmarks = bookmarks;
    });
  }

  onDeleteBookmark(bookmark: Bookmark): void {
    this.bookmarkService.deleteBookmark(bookmark).subscribe(() => {
      this.getBookmarks();
    });
  }

  onSubmit([bookmark, callback]: [Omit<Bookmark, 'id'>, Function]) {
    this.bookmarkService.addBookmark(bookmark).subscribe(() => {
      this.getBookmarks();
      callback();
    });
  }
}
