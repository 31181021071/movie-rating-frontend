import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private messageService: MessageService
  ) { }

  showInfo(detail: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: detail, life: 100000 });
  }

  showWarn(detail: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: detail, life: 100000 });
  }

  showError(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: detail, life: 100000 });
  }

  showSuccess(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: detail, life: 100000 });
  }
}
