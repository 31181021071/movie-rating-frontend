import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { lastValueFrom, Observable } from 'rxjs';
import { AppConstants } from 'src/app/constant/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {

  constructor(
    private apiService: ApiService
  ) { }

  save(param: any): Observable<any> {
    return this.apiService.doPostWithJwt(AppConstants.API_AUTHEN_URL + "admin-profile/movie-detail/save", param);
  }

  getInitMovieDetail(): Promise<any> {
    return lastValueFrom(this.apiService.doGetWithJwt(AppConstants.API_AUTHEN_URL + `admin-profile/movie-detail/get-init`));
  }

  getInitMovieManagement(): Promise<any> {
    return lastValueFrom(this.apiService.doGetWithJwt(AppConstants.API_AUTHEN_URL + `admin-profile/movie-management/get-init`));
  }

  getMovieDetail(movieId: any): Observable<any> {
    return this.apiService.doGetWithJwt(AppConstants.API_AUTHEN_URL + `admin-profile/movie-detail/get-movie-detail/${movieId}`);
  }

  delete(param: any): Observable<any> {
    return this.apiService.doPostWithJwt(AppConstants.API_AUTHEN_URL + "admin-profile/movie-detail/delete", param);
  }
}
