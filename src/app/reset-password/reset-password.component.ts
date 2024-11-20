import { CommonModule } from '@angular/common';
import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  otp: String = '';
  inpOtp: String = '';
  inpNewPassword: any = '';
  inpConformNewPassword: any = '';
  email: any;
  user: any = {
    id: '',
    name: '',
    userName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getOtp();
  }

  btnConformOnAction() {

    console.log(this.otp," A ",this.inpOtp);
    
    if (this.inpConformNewPassword == this.inpNewPassword && this.otp == this.inpOtp) { this.update() }
    else { Swal.fire({ icon: "error", title: "Oops...", text: "Passwords do not match!" }); }

  }

  getOtp() {

    fetch(`http://localhost:8080/user/get-otp`)
      .then(res => {
        if (!res.ok) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
        return res.json()
      })
      .then(data => {
        console.log("OTP ", data);

        this.email = data.email;
        this.inpOtp = data.otp;
        console.log(this.email);

        this.getUser(this.email)
      })
  }

  getUser(email: string) {

    console.log("user get", this.email);

    fetch(`http://localhost:8080/user/all?email=${this.email}`)
      .then(res => res.json())
      .then(data => {
        this.user = data[0]
        console.log("data ", data);
        console.log("user ", this.user);

      })
  }

  update() {

    let encpassword = this.inpConformNewPassword;
    this.user.password = encpassword;
    let updUser = this.user;
    console.log("UPD ", JSON.stringify(updUser));

    fetch(`http://localhost:8080/user/reset`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updUser)
    })
      .then(res => {
        if (res.ok) {
          Swal.fire("Good job!", "Password reset successfully", "success");
          this.otp = '';
          this.inpConformNewPassword = '';
          this.inpNewPassword = '';
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }
  
}
