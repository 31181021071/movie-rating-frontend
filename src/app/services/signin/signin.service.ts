import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    private apiService: ApiService
  ) { }

  signIn(param: any): Observable<any> {
    return this.apiService.doPostWithOutJwt("/authentication", param);
  }
}
