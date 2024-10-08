import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { catchError, finalize, lastValueFrom, Observable, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { ShareConfirmService } from './confirm.service';
import { ToastService } from './toast.service';
import { AppConstants } from 'src/app/constant/app.constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private confirmService: ShareConfirmService,
    private toastService: ToastService,
    private router: Router
  ) { }

  // Phương thức GET
  doGetWithOutJwt(endpoint: string): Observable<any> {
    const url = environment.rooturl + endpoint;
    this.loadingService.setLoading(true);
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        this.toastService.showError("System error. Please contact adminitrator.");
        return []
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  // Phương thức POST
  doPostWithOutJwt(endpoint: string, body: any): Observable<any> {
    const url = environment.rooturl + endpoint;
    this.loadingService.setLoading(true)
    return this.http.post(url, body).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        this.toastService.showError("System error. Please contact adminitrator.");
        return []
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }
  // Phương thức GET
  doGetWithJwt(endpoint: string): Observable<any> {
    const url = environment.rooturl + endpoint;
    this.loadingService.setLoading(true);
    return this.http.get(url, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => {
        if (error.status = 403) {
          localStorage.clear()
          this.router.navigateByUrl("/home");
        } else {
          console.error('Error occurred:', error);
          this.toastService.showError("System error. Please contact adminitrator.");
        }
        return []
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  // Phương thức POST
  doPostWithJwt(endpoint: string, body: any): Observable<any> {
    const url = environment.rooturl + endpoint;
    this.loadingService.setLoading(true)
    return this.http.post(url, body, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => {
        if (error.status = 403) {
          localStorage.clear()
          this.router.navigateByUrl("/home");
        } else {
          console.error('Error occurred:', error);
          this.toastService.showError("System error. Please contact adminitrator.");
        }
        return []
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  createAuthorizationHeader() {
    const jwtToken = localStorage.getItem(AppConstants.JWT);

    if (jwtToken) {
      return new HttpHeaders().set(
        'Authorization', 'Bearer ' + jwtToken
      )
    }
    return null;
  }
}
