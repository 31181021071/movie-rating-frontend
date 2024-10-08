import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs';
import { Signup } from 'src/app/models/signup/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private apiService: ApiService
  ) { }

  signUp(param: any): Observable<any> {
    return this.apiService.doPostWithOutJwt("/register", param);
  }
}
