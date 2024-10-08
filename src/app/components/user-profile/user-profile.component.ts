import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  message = "";

  constructor(
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe(result => {
      this.message = result.hello;
    })
  }


}
