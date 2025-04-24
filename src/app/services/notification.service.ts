import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

// notification.service.ts
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSubject = new BehaviorSubject<string>('');
  private loadingSubject = new BehaviorSubject<boolean>(false);
  message$ = this.messageSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor() {}

  // Affiche un message
  showMessage(message: string) {
    this.messageSubject.next(message);
    setTimeout(() => {
      this.messageSubject.next('');
    }, 3000);
  }

  // Affiche un message d'erreur
  showError(message: string) {
    this.messageSubject.next(message);
    setTimeout(() => {
      this.messageSubject.next('');
    }, 3000);
  }

  // Gère l'état de chargement
  setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }
}
