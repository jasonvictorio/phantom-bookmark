import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Bookmark } from 'src/app/models/bookmark';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent {
  @Input() bookmarks?: Bookmark[];
  @Output() deleteBookmark = new EventEmitter<Bookmark>();
}
