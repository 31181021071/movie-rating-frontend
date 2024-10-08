import { Component, OnInit } from '@angular/core';
import { MovieSearchCondition } from 'src/app/models/admin-profile/admin-profile.model';

@Component({
  selector: 'app-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.scss']
})
export class MovieManagementComponent implements OnInit {

  movieSearchCondition: MovieSearchCondition = {};

  listCountry = [];
  listReleaseYear = [];

  constructor(){}


  ngOnInit(): void {
    this.listReleaseYear = this.generateReleaseYearArray();
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
}
