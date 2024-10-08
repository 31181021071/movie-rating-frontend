import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareConfirmService {

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  confirm(message: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.confirmationService.confirm({
        message: message || "Are you sure?",
        header: "Confirmation",
        icon: "pi pi-question-circle",
        acceptLabel: "OK",
        rejectLabel: "Cancel",
        accept: () => {
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        },
      });
    });
  }

  info(message: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.confirmationService.confirm({
        message: message,
        header: "Information",
        icon: 'pi pi-info-circle',
        rejectVisible: false,
        acceptLabel: "OK",
        accept: () => {
          observer.next(true);
          observer.complete();
        }
      });
    });
  }

  error(message: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.confirmationService.confirm({
        message: message,
        header: "Error",
        icon: 'pi pi-times-circle',
        rejectVisible: false,
        acceptLabel: "OK",
        accept: () => {
          observer.next(true);
          observer.complete();
        }
      });
    });
  }

}
