import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.css'
})
export class ForgottenPasswordComponent implements OnInit{
  email: any;
  
  constructor(private router: Router){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  btnBackToLogin() {
    
    this.router.navigate([''])

  }

  btnResetPasswordForm(email: string) {
    console.log("email OTP ", email);
  
    const spinner = document.getElementById('spinner');
    if (spinner) spinner.classList.remove('d-none');
  
    fetch(`http://localhost:8080/user/generate-otp/${email}`)
      .then(res => {
        // Hide spinner
        if (spinner) spinner.classList.add('d-none');
  
        if (res.ok) {
          Swal.fire({
            title: "Good job!",
            text: "OTP Sent to your email. Check your email box...!",
            icon: "success"
          });
  
          this.router.navigate(['/reset-password']);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
        return res.json();
      })
      .catch(error => {
        // Hide spinner
        if (spinner) spinner.classList.add('d-none');
  
        console.log('OTP Send Failed');
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "OTP Send Failed!",
        });
      });
  }


}