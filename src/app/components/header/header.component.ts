import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ShareDialogService } from 'src/app/services/common/dialog.service';
import { SignupComponent } from '../signup/signup.component';
import { SigninComponent } from '../signin/signin.component';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constant/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  items: MenuItem[] | undefined;
  authUser: any = false;
  itemsMenuProfile: MenuItem[] | undefined;

  constructor(
    private dialogService: ShareDialogService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: "Home",
        icon: "pi pi-home"
      }
    ]

    this.itemsMenuProfile = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => this.handleProfileClick()
      },
      {
        label: 'Sign out',
        icon: 'pi pi-sign-out',
        command: () => this.handleSignoutClick()
      }
    ];

    let jwtToken = sessionStorage.getItem(AppConstants.JWT);
    if (jwtToken) {
      this.authUser = true;
    } else {
      this.authUser = false;
    }
  }

  openDialogSignup() {
    let param = {
      title: "SIGN UP",
      width: '20vw',
      data: null
    }
    this.dialogService.openDialog(SignupComponent, param);
  }

  openDialogSignin() {
    let param = {
      title: "SIGN IN",
      width: '20vw',
      data: null
    }
    this.dialogService.openDialog(SigninComponent, param);
  }

  handleProfileClick() {
    let userInfoJson = sessionStorage.getItem(AppConstants.USER_INFO);
    if (userInfoJson) {
      let userInfo = JSON.parse(userInfoJson);
      let role = userInfo.role;
      if (role == "2") {
        this.router.navigateByUrl("/user-profile");
      } else {
        this.router.navigateByUrl("/admin-profile");
      }
    }
  }

  handleSignoutClick() {
    sessionStorage.clear();
    this.router.navigateByUrl('/').then(() => {
      location.reload();
    });
  }
}
