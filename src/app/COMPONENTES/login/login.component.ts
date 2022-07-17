import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../SERVICES/login.service';
//import { Form } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public permiso:string | undefined;
  user={
    username:'',
    password:''
  }
  constructor(private loginservice:LoginService, private router:Router) { 

  }

  ngOnInit(): void {
  }

  signUp(){
    //console.log(this.user);
    this.loginservice.signUp(this.user).subscribe(
      res=>{
        console.log(res);
        localStorage.setItem('token',res.token);
        
        this.router.navigate(['/area']);
      },
      //err=>console.log(err)   
    )
  }
}