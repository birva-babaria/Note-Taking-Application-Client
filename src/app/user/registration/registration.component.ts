import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  constructor(public service: UserService, private toastr:ToastrService, public router: Router) {
    
  }
  ngOnInit() {
    this.service.formModel.reset();  
  }
  onSubmit()
  {
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('Now you can Login!!', 'Registration Successful!')
          this.router.navigateByUrl('/user/login');
        } else{
          res.errors.forEach((element: { code: any; }) => {
            switch (element.code){
              case 'DuplicateUserName':
                this.toastr.error('Username Already Taken', 'Registration Failed!');
                break;
              default:
                this.toastr.error('Error Occured :(', 'Registration Failed!');
                break;
            }
          });
        }
      },
    )
  }
}
