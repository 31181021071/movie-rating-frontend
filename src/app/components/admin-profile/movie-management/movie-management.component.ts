import { Component, OnInit } from '@angular/core';
import { MovieSearchCondition } from 'src/app/models/admin-profile/admin-profile.model';
import { ShareDialogService } from 'src/app/services/common/dialog.service';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AdminProfileService } from 'src/app/services/admin-profile/admin-profile.service';

@Component({
  selector: 'app-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.scss']
})
export class MovieManagementComponent implements OnInit {

  movieSearchCondition: MovieSearchCondition = {};

  listCountry = [];
  listReleaseYear = [];
  listGenre = [];
  listIsShow = [
    {
      code: true,
      codeName: "Show"
    },
    {
      code: false,
      codeName: "Not Show"
    }
  ];

  movieList = [
    {
      id: 1,
      movieName: 'Inception',
      country: 'USA',
      releaseYear: 2010,
      rating: 8.8,
    },
    {
      id: 2,
      movieName: 'Parasite',
      country: 'South Korea',
      releaseYear: 2019,
      rating: 8.6,
    },
    {
      id: 3,
      movieName: 'The Shawshank Redemption',
      country: 'USA',
      releaseYear: 1994,
      rating: 9.3,
    },
    {
      id: 4,
      movieName: 'Spirited Away',
      country: 'Japan',
      releaseYear: 2001,
      rating: 8.6,
    },
    {
      id: 5,
      movieName: 'Amélie',
      country: 'France',
      releaseYear: 2001,
      rating: 8.3,
    },
  ];

  size = 50;
  totalRecord = 200;

  constructor(
    private dialogService: ShareDialogService,
    public adminProfileService: AdminProfileService,
  ){}


  async ngOnInit(): Promise<void> {
    this.listReleaseYear = this.generateReleaseYearArray();
    // let resutlInit = await this.adminProfileService.getInitMovieManagement();
    // this.listCountry = resutlInit.listCountry;
    // this.listGenre = resutlInit.listGenre;
  }

  generateReleaseYearArray() {
    const startYear = 1895;
    const currentYear = new Date().getFullYear(); // Get the current year
    const endYear = currentYear + 5; // Extend to 5 years in the future

    // Generate the array of years from startYear to endYear
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ code: year, codeName: year });
    }
    return years;
  }

  onSearch() {
    console.log(this.movieSearchCondition);
  }

  onClear() {
    this.movieSearchCondition = {};
  }

  openDialogDetail(movie?: any) {
    let param = {
      title: "Movie Detail",
      data: movie
    }
    this.dialogService.openDialog(MovieDetailComponent, param);
  }

  onChangePage(event: any) {
    console.log(event);
  }
}
