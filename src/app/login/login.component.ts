import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, UrlTree } from '@angular/router';
import { Input, Tab, Ripple, initMDB } from 'mdb-ui-kit';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Updated to styleUrls
})
export class LoginComponent implements OnInit {

  selectRole: any;
  inpLogInUserName: any;
  inpLogInPassword: any;
  name: any;
  userName: any;
  email: any;
  showPassword: string = 'password';
  password: string = '';
  passwordRetype: string = '';
  isShowPassword: boolean = false;

  user:any = {
    name: "",
    userName:"",
    email:"" ,
    password:""
  }


  constructor(private router: Router) {}

  ngOnInit(): void {
    initMDB({ Input, Tab, Ripple });
  }

  btnForgotPasswordOnAction() {
    this.router.navigate(['/forgot-password']);
  }

  onSelected() {
  
  }

  viewPassword() {
    this.showPassword = this.isShowPassword ? 'text' : 'password';
  }
  
  btnSignInOnAction(){
    this.validate(this.inpLogInUserName , this.inpLogInPassword)
  }



  btnCreateOnAction(){

    if(this.user.password == this.passwordRetype){
      this.create(this.user)
      console.log(" YES ");
      
    }else{
      
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password Not Same!",
      });
      
    }
  }
  
  create(user:any){
    
    fetch("http://localhost:8080/user/save",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    })
    .then(res=>{
      if(res.ok){
        Swal.fire({
          title: "Good job!",
          text: "Account Created Success!",
          icon: "success"
        });
        user=null;
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          });        
      }
    })

  }

  validate(userName: any, password: any) {

      
      const encUserName = encodeURIComponent(userName);
      const encPassword = encodeURIComponent(password);
      
      console.log(encPassword);
      
      
      fetch(`http://localhost:8080/user/validate?userName=${encUserName}&password=${encPassword}`)
      .then(res => {
          if (!res.ok) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => {
          if (data.length <= 0) { 
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "User not found!",
            });
          } else {
            console.log(data);
            this.router.navigate(['/dashboard-pages']);
            Swal.fire({
              title: "Good job!",
              text: "Login Success!",
              icon: "success"
            });
          }
        })

      }
      
}
