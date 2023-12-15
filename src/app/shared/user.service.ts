import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }


  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', [Validators.required,Validators.email]],
    Name: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator : this.comparePasswords }),
    Role: ['', Validators.required],
  });

  comparePasswords(fb:FormGroup){
    let confirmPwd = fb.get('ConfirmPassword');
    if(confirmPwd?.errors == null || 'passwordMismatch' in confirmPwd.errors){
      if(fb.get('Password')?.value != confirmPwd?.value)
        confirmPwd?.setErrors({ passwordMismatch : true});
      else
        confirmPwd?.setErrors(null);
    }
  }

  getToken(): string | null{
    return localStorage.getItem("token");
  }

  register()
  {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Name: this.formModel.value.Name,
      Password: this.formModel.value.Passwords.Password,
      Role: this.formModel.value.Role,
    };
    return this.http.post(environment.baseUrl + '/ApplicationUser/Register', body);
  }

  formData = this.fb.group({
    UserName: ['', Validators.required],
    Password: ['', Validators.required],
  });

  login()
  {
    var body = {
      UserName: this.formData.value.UserName,
      Password: this.formData.value.Password,
    };
    return this.http.post(environment.baseUrl + '/ApplicationUser/Login', body);
  }

  roleMatch(allowedRoles: any[]): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem("token")!.split('.')[1]));
    //this part returns the name of role of the user.
    console.log(payLoad["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"][0]);
    var userRole = payLoad["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"][0];
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
}