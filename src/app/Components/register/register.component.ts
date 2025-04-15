import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/User/user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
   
   registerForm!:FormGroup
    constructor(private formbuild:FormBuilder,private user:UserService){}
    ngOnInit(): void {
      this.registerForm = this.formbuild.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
    Register(){
      let reqData={
        firstName:this.registerForm.value.firstName,
        lastName:this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }
      return this.user.Register(reqData).subscribe((res:any)=>{
        console.log(res)
      })
  
    }

}
