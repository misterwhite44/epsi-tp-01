import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { BOOKS } from '../mocks/books.mock';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor() {}

  getBooks(): Observable<Book[]> {
    return of(BOOKS).pipe(delay(300)); 
  }

  getBookById(id: string): Observable<Book> {
    const book = BOOKS.find(b => b.id === id);
    if (!book) {
      return throwError(() => new Error('Livre non trouvé')).pipe(delay(300));
    }
    return of(book).pipe(delay(300));
  }

  addBook(book: Partial<Book>): Observable<Book> {
    const newBook: Book = {
      id: (BOOKS.length + 1).toString(),
      title: book.title || '',
      author: book.author || '',
      description: book.description || '',
      category: book.category || '',
      rating: 0,
      isFavorite: false
    };
    BOOKS.push(newBook);
    return of(newBook).pipe(delay(300));
  }

  updateBook(id: string, bookData: Partial<Book>): Observable<Book> {
    const index = BOOKS.findIndex(b => b.id === id);
    if (index === -1) {
      return throwError(() => new Error('Livre non trouvé')).pipe(delay(300));
    }
    const updatedBook = { ...BOOKS[index], ...bookData };
    BOOKS[index] = updatedBook;
    return of(updatedBook).pipe(delay(300));
  }

  deleteBook(id: string): Observable<void> {
    const index = BOOKS.findIndex(b => b.id === id);
    if (index === -1) {
      return throwError(() => new Error('Livre non trouvé')).pipe(delay(300));
    }
    BOOKS.splice(index, 1);
    return of(undefined).pipe(delay(300));
  }

  toggleFavorite(id: string): Observable<Book> {
    const index = BOOKS.findIndex(b => b.id === id);
    if (index === -1) {
      return throwError(() => new Error('Livre non trouvé')).pipe(delay(300));
    }
    const updatedBook = { ...BOOKS[index], isFavorite: !BOOKS[index].isFavorite };
    BOOKS[index] = updatedBook;
    return of(updatedBook).pipe(delay(300));
  }
}
