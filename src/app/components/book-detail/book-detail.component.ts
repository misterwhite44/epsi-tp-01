import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'book-detail.component.html',
})
export class BookDetailComponent implements OnInit {
  book!: Book;
  rating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe({
        next: (book: Book) => {
          this.book = book;
          this.rating = book.rating || 0;  // Initialiser la note à celle du livre
        },
        error: (err: any) => {
          console.error(err);
          this.router.navigate(['/books']);
        }
      });
    }
  }

  updateRating(rating: number): void {
    if (rating >= 1 && rating <= 5) {
      this.bookService.updateBook(this.book.id, { rating: rating }).subscribe({
        next: (updatedBook: Book) => {
          console.log('Nouvelle note:', updatedBook);
        },
        error: (err: any) => {
          console.error('Erreur lors de la mise à jour de la note:', err);
        }
      });
    } else {
      console.error('La note doit être comprise entre 1 et 5');
    }
  }

  goBack(): void {
    this.router.navigate(['/books']); 
  }
}
