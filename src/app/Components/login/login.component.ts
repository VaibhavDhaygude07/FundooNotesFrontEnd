import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/User/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formbuild: FormBuilder, private user: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.formbuild.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]] // At least 8 characters, 1 letter and 1 number 
    });
  }

  Login() {
    let reqData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.user.Login(reqData).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem("token", res.data);
      },
      (error) => {
        console.error("Login failed:", error);  
      }
    );
  }
}
