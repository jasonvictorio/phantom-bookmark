import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bookmark } from '../models/bookmark';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks: Bookmark[] = [
    { id: 1, url: 'https://angular.io/' },
    { id: 2, url: 'https://angular.io/2' },
    { id: 3, url: 'https://angular.io/3' },
  ];
  constructor() {}

  getBookmarks(): Observable<Bookmark[]> {
    return of(this.bookmarks);
  }

  getBookmark(id: number): Observable<Bookmark | undefined> {
    return of(this.getBookmarkById(id));
  }

  addBookmark(bookmark: Omit<Bookmark, 'id'>): Observable<Bookmark> {
    const newBookmark = {
      id: this.getNewId(),
      ...bookmark,
    };
    this.bookmarks = [...this.bookmarks, newBookmark];
    return of(newBookmark);
  }

  deleteBookmark(bookmark: Bookmark): Observable<Bookmark | undefined> {
    this.bookmarks = this.bookmarks.filter(
      (_bookmark) => _bookmark.id !== bookmark.id
    );
    return of(bookmark);
  }

  updateBookmark(bookmark: Bookmark): Observable<Bookmark> {
    this.bookmarks = this.bookmarks.map((_bookmark) =>
      _bookmark.id === bookmark.id ? bookmark : _bookmark
    );
    return of(bookmark);
  }

  // helper functions
  private getNewId(): number {
    // this function assumes the id of tail in bookmarks[] be the biggest number
    // note: backend should handle id generation
    const lastBookmark: Bookmark = this.bookmarks.slice(-1)[0];
    return lastBookmark.id;
  }

  private getBookmarkById(id: number): Bookmark | undefined {
    return this.bookmarks.find((bookmark) => bookmark.id === id);
  }
}
