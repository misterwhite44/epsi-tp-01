import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { BOOKS } from '../mocks/books.mock';
import { NotificationService } from './notification.service'; // Import du service Notification

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private notificationService: NotificationService) {}

  getBooks(): Observable<Book[]> {
    return of(BOOKS).pipe(delay(300)); 
  }

  getBookById(id: string): Observable<Book> {
    const book = BOOKS.find(b => b.id === id);
    if (!book) {
      this.notificationService.showMessage('Livre non trouvé');
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
    this.notificationService.showMessage('Livre ajouté avec succès!');
    return of(newBook).pipe(delay(300));
  }

  updateBook(id: string, bookData: Partial<Book>): Observable<Book> {
    const index = BOOKS.findIndex(b => b.id === id);
    if (index === -1) {
      this.notificationService.showMessage('Livre non trouvé');
      return throwError(() => new Error('Livre non trouvé')).pipe(delay(300));
    }
    const updatedBook = { ...BOOKS[index], ...bookData };
    BOOKS[index] = updatedBook;
    this.notificationService.showMessage('Livre mis à jour avec succès!');
    return of(updatedBook).pipe(delay(300));
  }

  deleteBook(id: string): Observable<void> {
    const index = BOOKS.findIndex(b => b.id === id);
    if (index === -1) {
      this.notificationService.showMessage('Livre non trouvé');
      return throwError(() => new Error('Livre non trouvé')).pipe(delay(300));
    }
    BOOKS.splice(index, 1);
    this.notificationService.showMessage('Livre supprimé avec succès!');
    return of(undefined).pipe(delay(300));
  }

  toggleFavorite(id: string): Observable<Book> {
    const index = BOOKS.findIndex(b => b.id === id);
    if (index === -1) {
      this.notificationService.showMessage('Livre non trouvé');
      return throwError(() => new Error('Livre non trouvé')).pipe(delay(300));
    }
    const updatedBook = { ...BOOKS[index], isFavorite: !BOOKS[index].isFavorite };
    BOOKS[index] = updatedBook;
    this.notificationService.showMessage('Statut favori modifié!');
    return of(updatedBook).pipe(delay(300));
  }
}
