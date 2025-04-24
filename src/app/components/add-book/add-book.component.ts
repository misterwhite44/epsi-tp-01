import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { NotificationService } from '../../services/notification.service';  

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
    private router: Router,
    private notificationService: NotificationService  
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]], 
      author: ['', [Validators.required, Validators.minLength(3)]], 
      description: ['', [Validators.required, Validators.maxLength(500)]], 
      category: ['', [Validators.required]],
      rating: [null, [Validators.min(1), Validators.max(5)]], 
      isFavorite: [false]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.notificationService.setLoading(true); 

      this.bookService.addBook(this.bookForm.value).subscribe({
        next: () => {
          this.notificationService.setLoading(false); 
          this.router.navigate(['/books']); 
          this.notificationService.showMessage('Livre ajouté avec succès!');
        },
        error: (err: any) => {
          this.notificationService.setLoading(false); 
          console.error('Erreur lors de l\'ajout du livre', err);
          this.notificationService.showError('Erreur lors de l\'ajout du livre');
        }
      });
    } else {
      this.notificationService.showError('Veuillez remplir tous les champs du formulaire correctement.');
    }
  }

  get formControls() {
    return this.bookForm.controls;
  }
}
