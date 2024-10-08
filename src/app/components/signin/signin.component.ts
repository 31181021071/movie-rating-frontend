import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppConstants } from 'src/app/constant/app.constants';
import { Signin } from 'src/app/models/signin/signin.model';
import { ToastService } from 'src/app/services/common/toast.service';
import { SigninService } from 'src/app/services/signin/signin.service';
import { StringUtils } from 'src/app/utils/stringUtil';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  signInModel: Signin = {};

  showErrorMessage = false;
  errorMessages = [];

  constructor(
    private signInService: SigninService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public toastService: ToastService
  ) {

  }

  signIn() {
    this.showErrorMessage = false;
    this.errorMessages = [];
    if (StringUtils.isEmpty(this.signInModel.email) || StringUtils.isEmpty(this.signInModel.password)) {
      this.showErrorMessage = true;
      this.errorMessages.push("Please fill out all required field.");
    }

    if (this.signInModel.password.length < 8) {
      this.showErrorMessage = true;
      this.errorMessages.push("Password must be at least 8 characters.");
    }

    if (this.showErrorMessage) {
      return;
    }
    let param = {
      email: this.signInModel.email,
      password: this.signInModel.password
    }
    this.signInService.signIn(param).subscribe(result => {
      console.log(result);
      if (result.jwt) {
        const jwtToken = result.jwt;
        localStorage.setItem(AppConstants.JWT, jwtToken);
        console.log(JSON.stringify(result.userInfo));
        localStorage.setItem(AppConstants.USER_INFO, JSON.stringify(result.userInfo));
        location.reload();
      }
    })
  }
}
