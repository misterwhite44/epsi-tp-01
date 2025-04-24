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

  // Récupérer tous les livres
  getBooks(): Observable<Book[]> {
    return of(BOOKS).pipe(delay(300));
  }

  // Récupérer un livre par son ID
  getBookById(id: string): Observable<Book> {
    const book = BOOKS.find(b => b.id === id);

    if (!book) {
      return throwError(() => new Error('Livre non trouvé')).pipe(delay(300));
    }

    return of(book).pipe(delay(300));
  }

  // Ajouter un nouveau livre
  addBook(book: Partial<Book>): Observable<Book> {
    // Créer un nouveau livre
    const newBook: Book = {
      id: (BOOKS.length + 1).toString(),
      title: book.title || '',
      author: book.author || '',
      description: book.description || '',
      category: book.category || '',
      rating: 0,
      isFavorite: false
    };

    // En réalité, ce livre serait ajouté à une base de données
    BOOKS.push(newBook);

    return of(newBook).pipe(delay(300));
  }

  // Mettre à jour les informations d'un livre
  updateBook(id: string, bookData: Partial<Book>): Observable<Book> {
    const index = BOOKS.findIndex(b => b.id === id);

    if (index === -1) {
      return throwError(() => new Error('Livre non trouvé')).pipe(delay(300));
    }

    // Mettre à jour le livre
    const updatedBook = { ...BOOKS[index], ...bookData };
    BOOKS[index] = updatedBook;

    return of(updatedBook).pipe(delay(300));
  }

  // Supprimer un livre par son ID
  deleteBook(id: string): Observable<void> {
    const index = BOOKS.findIndex(b => b.id === id);

    if (index === -1) {
      return throwError(() => new Error('Livre non trouvé')).pipe(delay(300));
    }

    // Supprimer le livre
    BOOKS.splice(index, 1);

    return of(undefined).pipe(delay(300));
  }

  // Mettre à jour le statut 'favori' d'un livre
  toggleFavorite(id: string): Observable<Book> {
    const index = BOOKS.findIndex(b => b.id === id);

    if (index === -1) {
      return throwError(() => new Error('Livre non trouvé')).pipe(delay(300));
    }

    // Alterner le statut de favori
    BOOKS[index].isFavorite = !BOOKS[index].isFavorite;

    return of(BOOKS[index]).pipe(delay(300));
  }
}
