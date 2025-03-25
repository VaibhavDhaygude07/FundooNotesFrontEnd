import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/User/user.service';

@Component({
  selector: 'app-reset-password',
  standalone:false,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private user: UserService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
     
    });

    // ✅ Get the reset token from the URL
    this.token = this.activeRoute.snapshot.paramMap.get('token');
    console.log(this.token);
  }

  onSubmit() {
   

    if (this.resetForm.valid) {
      let reqData = {
        password: this.resetForm.value.password,
        confirmPassword: this.resetForm.value.confirmPassword
      };

      console.log(reqData);

      this.user.resetPassword(reqData, this.token).subscribe((response: any) => {
        console.log(response);
      });
    }
  }
}
