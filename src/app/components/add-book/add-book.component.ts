import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'add-book.component.html',
  styleUrls: ['add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec des validations
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]], // Minimum 3 caractères pour le titre
      author: ['', [Validators.required, Validators.minLength(3)]], // Minimum 3 caractères pour l'auteur
      description: ['', [Validators.required, Validators.maxLength(500)]], // Description maximale de 500 caractères
      category: ['', [Validators.required]],
      rating: [null, [Validators.min(1), Validators.max(5)]], // Note entre 1 et 5
      isFavorite: [false]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe({
        next: () => {
          this.router.navigate(['/books']); // Redirige vers la liste des livres après ajout
        },
        error: (err: any) => {
          console.error('Erreur lors de l\'ajout du livre', err); // Affiche une erreur si l'ajout échoue
        }
      });
    }
  }

  get formControls() {
    return this.bookForm.controls;
  }
}
