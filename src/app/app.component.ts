import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonComponent } from "./common/common.component";
import { CustomerComponent } from "./pages/customer/customer.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./login/login.component";
import AOS from 'aos';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonComponent, CustomerComponent, FooterComponent, HomeComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'hotel-front-end';
  ngOnInit() {
    AOS.init({
      duration: 1000, // Duration of the animation in milliseconds
      once: true      // Animation will happen only once
    });
  }
}