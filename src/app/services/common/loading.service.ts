import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading$ = new BehaviorSubject<boolean>(false);
  bodyElement = window.document.querySelector('body');
  loadingCount = 0;

  constructor() { }

  public setLoading(value: boolean) {
    if (value) {
      this.loadingCount++;
    } else {
      this.loadingCount--;
    }

    if (this.loadingCount <= 0) {
      this.loadingCount = 0; // Ensure loadingCount does not go negative
    }
    setTimeout(() => this.isLoading$.next(this.loadingCount > 0));
    if (this.bodyElement) {
      if (this.loadingCount > 0) {
        this.bodyElement.style.overflow = 'hidden';
      } else {
        this.bodyElement.style.overflow = '';
      }
    }
  }

  public getLoading() {
    return this.isLoading$.getValue();
  }

}
