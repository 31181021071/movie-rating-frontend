import { Component, OnInit } from '@angular/core';
import { MovieSearchCondition } from 'src/app/models/admin-profile/admin-profile.model';
import { ShareDialogService } from 'src/app/services/common/dialog.service';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AdminProfileService } from 'src/app/services/admin-profile/admin-profile.service';
import { DatePipe } from '@angular/common';
import { AppConstants } from 'src/app/constant/app.constants';

@Component({
  selector: 'app-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.scss']
})
export class MovieManagementComponent implements OnInit {

  movieSearchCondition: MovieSearchCondition = {};

  listCountry = [];
  listGenre = [];
  listIsShow = [
    {
      code: "1",
      codeName: "Show"
    },
    {
      code: "0",
      codeName: "Not Show"
    }
  ];

  movieList = [];

  size = 50;
  totalRecord = 0;
  currentPage = 1;

  constructor(
    private dialogService: ShareDialogService,
    public adminProfileService: AdminProfileService,
    public datePipe: DatePipe
  ){}


  async ngOnInit(): Promise<void> {
    let resutlInit = await this.adminProfileService.getInitMovieManagement();
    this.listCountry = resutlInit.listCountry;
    this.listGenre = resutlInit.listGenre;
  }

  onSearch() {
    const offset = 0;
    const limit = this.size;
    this.currentPage = 1;
    let releaseDateFrom = this.datePipe.transform(this.movieSearchCondition.releaseDateFrom, AppConstants.DATE_FORMAT_YYYYMMDD);
    let releaseDateTo = this.datePipe.transform(this.movieSearchCondition.releaseDateTo, AppConstants.DATE_FORMAT_YYYYMMDD);
    let param = {
      movieName: this.movieSearchCondition.movieName,
      releaseDateFrom: releaseDateFrom,
      releaseDateTo: releaseDateTo,
      country: this.movieSearchCondition.country,
      genre: this.movieSearchCondition.genre,
      ratingFrom: this.movieSearchCondition.ratingFrom,
      ratingTo: this.movieSearchCondition.ratingTo,
      isShow: this.movieSearchCondition.isShow,
      offset: offset,
      limit: limit
    }

    this.adminProfileService.search(param).subscribe(result => {
      if(result) {
        this.totalRecord = result.totalRecord
        this.movieList = result.movieList
      }
    })
  }

  onClear() {
    this.movieSearchCondition = {};
  }

  openDialogDetail(id?: any) {
    let param = {
      title: "Movie Detail",
      data: id
    }
    this.dialogService.openDialog(MovieDetailComponent, param);
  }

  onChangePage(event: any) {
    console.log(event);
    const offset = event.first;
    const limit = event.rows;
    this.currentPage = event.page + 1;

    let releaseDateFrom = this.datePipe.transform(this.movieSearchCondition.releaseDateFrom, AppConstants.DATE_FORMAT_YYYYMMDD);
    let releaseDateTo = this.datePipe.transform(this.movieSearchCondition.releaseDateTo, AppConstants.DATE_FORMAT_YYYYMMDD);
    let param = {
      movieName: this.movieSearchCondition.movieName,
      releaseDateFrom: releaseDateFrom,
      releaseDateTo: releaseDateTo,
      country: this.movieSearchCondition.country,
      genre: this.movieSearchCondition.genre,
      ratingFrom: this.movieSearchCondition.ratingFrom,
      ratingTo: this.movieSearchCondition.ratingTo,
      isShow: this.movieSearchCondition.isShow,
      offset: offset,
      limit: limit
    }

    this.adminProfileService.search(param).subscribe(result => {
      if(result) {
        this.totalRecord = result.totalRecord
        this.movieList = result.movieList
      }
    })
  }
}
