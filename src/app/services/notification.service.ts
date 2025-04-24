import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSubject = new Subject<string>();
  private errorSubject = new Subject<string>();
  private loadingSubject = new Subject<boolean>();

  message$ = this.messageSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor() {}

  showMessage(message: string): void {
    this.messageSubject.next(message);
  }

  showError(error: string): void {
    this.errorSubject.next(error);
  }

  setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }
}
