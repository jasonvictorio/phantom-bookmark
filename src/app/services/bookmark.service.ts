import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bookmark } from '../models/bookmark';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  LOCAL_STORAGE_KEY = 'app-bookmarks';
  bookmarks: Bookmark[] = [];

  constructor() {
    this.initializeLocalStorage();
  }

  getBookmarks([from, max]: [number, number]): Observable<Bookmark[]> {
    this.updateLocalBookmarks(
      this.getLocalStorage(this.LOCAL_STORAGE_KEY) ?? []
    );
    return of(this.bookmarks.slice(from, from + max));
  }

  getBookmark(id: number): Observable<Bookmark | undefined> {
    return of(this.getBookmarkById(id));
  }

  addBookmark(bookmark: Omit<Bookmark, 'id'>): Observable<Bookmark> {
    const newBookmark = {
      id: this.getNewId(),
      ...bookmark,
    };
    this.updateLocalBookmarks([...this.bookmarks, newBookmark]);
    return of(newBookmark);
  }

  deleteBookmark(bookmark: Bookmark): Observable<Bookmark | undefined> {
    this.updateLocalBookmarks(
      this.bookmarks.filter((_bookmark) => _bookmark.id !== bookmark.id)
    );
    return of(bookmark);
  }

  updateBookmark(bookmark: Bookmark): Observable<Bookmark> {
    this.updateLocalBookmarks(
      this.bookmarks.map((_bookmark) =>
        _bookmark.id === bookmark.id ? bookmark : _bookmark
      )
    );
    return of(bookmark);
  }

  // helper functions
  private updateLocalBookmarks(bookmarks: Bookmark[]) {
    this.bookmarks = bookmarks;
    this.setLocalStorage(this.LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
  }

  private getNewId(): number {
    // this function assumes the id of tail in bookmarks[] be the biggest number
    // note: backend should handle id generation
    const lastBookmark: Bookmark = this.bookmarks.slice(-1)[0];
    return lastBookmark ? lastBookmark.id + 1 : 0;
  }

  private getBookmarkById(id: number): Bookmark | undefined {
    return this.bookmarks.find((bookmark) => bookmark.id === id);
  }

  private initializeLocalStorage(): void {
    const localStorageBookmarks = this.getLocalStorage<Bookmark[]>(
      this.LOCAL_STORAGE_KEY
    );

    // set localStorageBookmarks to [] if not found (expected on first run)
    if (localStorageBookmarks === null) {
      this.setLocalStorage(this.LOCAL_STORAGE_KEY, '[]');
      this.bookmarks = [];
    } else {
      this.bookmarks = localStorageBookmarks;
    }
  }

  // generic local storage functions
  private getLocalStorage<T>(key: string): T | null {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue ? JSON.parse(localStorageValue) : null;
  }
  private setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
