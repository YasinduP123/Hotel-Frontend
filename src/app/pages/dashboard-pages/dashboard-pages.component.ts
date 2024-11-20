import { Component } from '@angular/core';
import { CommonComponent } from "../../common/common.component";
import { FooterComponent } from "../../footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-pages',
  standalone: true,
  imports: [CommonComponent, FooterComponent, RouterOutlet],
  templateUrl: './dashboard-pages.component.html',
  styleUrl: './dashboard-pages.component.css'
})
export class DashboardPagesComponent {

}
