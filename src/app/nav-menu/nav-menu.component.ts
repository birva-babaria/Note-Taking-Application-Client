import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{

  ngOnInit(): void {
      
  }
  
  constructor(public router: Router, public toastr: ToastrService) {
    
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/user/login');
    this.toastr.success("You need to Login again","Successfully Logged Out!");
  }
}
