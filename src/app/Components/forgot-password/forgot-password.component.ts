import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/User/user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private user: UserService) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Getter for email control
  get email() {
    return this.forgotForm.get('email');
  }

  onSubmit() {
    this.submitted = true;
  if (this.forgotForm.invalid) {
    return;
  }
  let reqData = { email: this.forgotForm.value.email };
  this.user.forgotPassword(reqData).subscribe(
    (response) => {
      console.log("Success:", response);
    },
    (error) => {
      console.error("Error:", error);
    }
  );
  
  }
}
