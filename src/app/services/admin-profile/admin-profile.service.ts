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

  // movie
  saveMovie(param: any): Observable<any> {
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

  deleteMovie(param: any): Observable<any> {
    return this.apiService.doPostWithJwt(AppConstants.API_AUTHEN_URL + "admin-profile/movie-detail/delete", param);
  }

  searchMovie(param : any): Observable<any> {
    return this.apiService.doPostWithJwt(AppConstants.API_AUTHEN_URL + "admin-profile/movie-management/search", param);
  }

  // director
  saveDirector(param: any): Observable<any> {
    return this.apiService.doPostWithJwt(AppConstants.API_AUTHEN_URL + "admin-profile/director-detail/save", param);
  }

  getInitDirectorDetail(): Promise<any> {
    return lastValueFrom(this.apiService.doGetWithJwt(AppConstants.API_AUTHEN_URL + `admin-profile/director-detail/get-init`));
  }

  getInitDirectorManagement(): Promise<any> {
    return lastValueFrom(this.apiService.doGetWithJwt(AppConstants.API_AUTHEN_URL + `admin-profile/director-management/get-init`));
  }

  getDirectorDetail(directorId: any): Observable<any> {
    return this.apiService.doGetWithJwt(AppConstants.API_AUTHEN_URL + `admin-profile/director-detail/get-director-detail/${directorId}`);
  }

  deleteDirector(param: any): Observable<any> {
    return this.apiService.doPostWithJwt(AppConstants.API_AUTHEN_URL + "admin-profile/director-detail/delete", param);
  }

  searchDirector(param : any): Observable<any> {
    return this.apiService.doPostWithJwt(AppConstants.API_AUTHEN_URL + "admin-profile/director-management/search", param);
  }

  // actor
  saveActor(param: any): Observable<any> {
    return this.apiService.doPostWithJwt(AppConstants.API_AUTHEN_URL + "admin-profile/actor-detail/save", param);
  }

  getInitActorDetail(): Promise<any> {
    return lastValueFrom(this.apiService.doGetWithJwt(AppConstants.API_AUTHEN_URL + `admin-profile/actor-detail/get-init`));
  }

  getInitActorManagement(): Promise<any> {
    return lastValueFrom(this.apiService.doGetWithJwt(AppConstants.API_AUTHEN_URL + `admin-profile/actor-management/get-init`));
  }

  getActorDetail(actorId: any): Observable<any> {
    return this.apiService.doGetWithJwt(AppConstants.API_AUTHEN_URL + `admin-profile/actor-detail/get-actor-detail/${actorId}`);
  }

  deleteActor(param: any): Observable<any> {
    return this.apiService.doPostWithJwt(AppConstants.API_AUTHEN_URL + "admin-profile/actor-detail/delete", param);
  }

  searchActor(param : any): Observable<any> {
    return this.apiService.doPostWithJwt(AppConstants.API_AUTHEN_URL + "admin-profile/actor-management/search", param);
  }
}
