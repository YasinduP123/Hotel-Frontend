import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppComponent } from "../app.component";
import { Input } from 'mdb-ui-kit';

@Component({
  selector: 'app-common',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AppComponent],
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css'] // Corrected "styleUrls"
})
export class CommonComponent {
   
  isHomeActive: any;
  isBillingActive: any;
  isComplainActive: any;
  isBookingActive: any;
  isCustomerActive: any;
  isCollapse: any;
  collapse: any;
  isRoomActive: any;
  isReportActive: any;
  
  navRoomBtnActive() {

    this.isBillingActive = ""
    this.isComplainActive = ""
    this.isBookingActive = ""
    this.isCustomerActive = ""
    this.isHomeActive = ""
    this.isRoomActive = "active"
    this.isReportActive = ""

  }

  navCustomerBtnActive() {

    this.isBillingActive = ""
    this.isComplainActive = ""
    this.isBookingActive = ""
    this.isCustomerActive = "active"
    this.isHomeActive = ""
    this.isRoomActive = ""
    this.isReportActive = ""

  }

  navBookingBtnActive() {

    this.isBillingActive = ""
    this.isComplainActive = ""
    this.isBookingActive = "active"
    this.isCustomerActive = ""
    this.isHomeActive = ""
    this.isRoomActive = ""
    this.isReportActive = ""

  }

  navComplainBtnActive() {

    this.isBillingActive = ""
    this.isComplainActive = "active"
    this.isBookingActive = ""
    this.isCustomerActive = ""
    this.isHomeActive = ""
    this.isRoomActive = ""
    this.isReportActive = ""

  }

  navBillingBtnActive() {

    this.isBillingActive = "active"
    this.isComplainActive = ""
    this.isBookingActive = ""
    this.isCustomerActive = ""
    this.isHomeActive = ""
    this.isRoomActive = ""
    this.isReportActive = ""

  }

  navHomeBtnActive() {

    this.isBillingActive = ""
    this.isComplainActive = ""
    this.isBookingActive = ""
    this.isCustomerActive = ""
    this.isHomeActive = "active"
    this.isRoomActive = ""
    this.isReportActive = ""

  }

  navReportBtnActive() {
  
    this.isBillingActive = ""
    this.isComplainActive = ""
    this.isBookingActive = ""
    this.isCustomerActive = ""
    this.isHomeActive = ""
    this.isRoomActive = ""
    this.isReportActive = "active"
  
  }

  
  isCollapsed: boolean = false;
  active: any;
  isActive: any;

  toggleHover(isToggeled:boolean):void {
    this.toggleCollapse
  }

  myFunction(x: HTMLElement): void {
    x.classList.toggle("change");
  }

  toggleCollapse(isCollapsed : any) {
    this.isCollapsed = !this.isCollapsed;
  }

  @ViewChild('hamburger') trigger!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;
  isClosed = false;

  ngAfterViewInit(): void {
    this.trigger.nativeElement.addEventListener('click', () => this.toggleSidebar());
  }

  toggleSidebar(): void {
    const wrapper = document.getElementById('wrapper');
    if (wrapper) {
      wrapper.classList.toggle('toggled');
    }

    if (this.isClosed) {
      this.overlay.nativeElement.style.display = 'none';
      this.trigger.nativeElement.classList.remove('is-open');
      this.trigger.nativeElement.classList.add('is-closed');
    } else {
      this.overlay.nativeElement.style.display = 'block';
      this.trigger.nativeElement.classList.remove('is-closed');
      this.trigger.nativeElement.classList.add('is-open');
    }
    this.isClosed = !this.isClosed;
  }


}