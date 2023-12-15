import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit() {
    this.service.formData.reset();  
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/home');
    }

  }
  constructor(public service:UserService, public router: Router, public toastr: ToastrService){
  }

 onSubmit(){
    this.service.login().subscribe({
      next: (res: any) => {
        this.toastr.success('WELCOME TO NOTE TAKING APP', 'Login Successful!')
        localStorage.setItem('token', res.jwtstr);
        this.router.navigateByUrl('/home');
      },
      error: (err: { status: number; }) => {
        if(err.status == 400){
          this.toastr.error("Incorrect Username or Password", "Authentication Failed!")
        }
        else{
          console.log(err)
        }
      }
    }
    );
  }

}