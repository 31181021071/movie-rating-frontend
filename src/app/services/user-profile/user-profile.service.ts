import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/constant/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    private apiService: ApiService
  ) { }

  getUserProfile(): Observable<any> {
    return this.apiService.doGetWithJwt(AppConstants.API_AUTHEN_URL + "hello");
  }
}
