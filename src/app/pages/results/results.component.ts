import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Bookmark } from 'src/app/models/bookmark';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  bookmark?: Bookmark;

  constructor(
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookmarkService.getBookmark(id).subscribe((bookmark) => {
      this.bookmark = bookmark;
    });
  }
}
