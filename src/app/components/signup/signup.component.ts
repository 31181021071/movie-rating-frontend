import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Signup } from 'src/app/models/signup/signup.model';
import { ShareConfirmService } from 'src/app/services/common/confirm.service';
import { ToastService } from 'src/app/services/common/toast.service';
import { SignupService } from 'src/app/services/signup/signup.service';
import { StringUtils } from 'src/app/utils/stringUtil';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpModel:Signup = {};

  showErrorMessage = false;
  errorMessages = [];

  constructor(
    private signUpService: SignupService,
    private confirmService: ShareConfirmService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public toastService: ToastService
  ) {

  }

  signUp() {
    this.showErrorMessage = false;
    this.errorMessages = [];
    if (StringUtils.isEmpty(this.signUpModel.name) || StringUtils.isEmpty(this.signUpModel.email) || StringUtils.isEmpty(this.signUpModel.password) || StringUtils.isEmpty(this.signUpModel.confirmPassword)) {
      this.showErrorMessage = true;
      this.errorMessages.push("Please fill out all required field.");
    }

    if (this.signUpModel.password.length < 8 || this.signUpModel.confirmPassword.length < 8) {
      this.showErrorMessage = true;
      this.errorMessages.push("Password and Confirm Password must be at least 8 characters.");
    }

    if (this.signUpModel.password != this.signUpModel.confirmPassword) {
      this.showErrorMessage = true;
      this.errorMessages.push("Confirm Password does not match Password.");
    }

    if (this.showErrorMessage) {
      return;
    }
    let param = {
      name: this.signUpModel.name,
      email: this.signUpModel.email,
      password: this.signUpModel.password
    }
    this.signUpService.signUp(param).subscribe(result => {
      if (result.fail) {
        this.toastService.showError(result.fail);
      } else {
        console.log(result);
        this.toastService.showSuccess("Sign up an account successfully!");
        this.ref.close();
      }
    })
  }
}
