import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [FormsModule,NgFor,RouterOutlet,RouterLink],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  
  bookingId1: any = [];
  billingInfo: any = {};
  others: number = 0.00;
  poolBill: number = 0.00;
  totalBill: number = 0.00;
  discount: number = 0.00;
  dinnerBill: number = 0.00;
  lunchBill: number = 0.00;
  breakFastBill: number = 0.00;
  duration: any;
  inpPoolBill: any;
  searchQuery: any;
  isDisabled: any = true;
  selectdStatus: any = "Select Status";
  
  billingDetails: any = {
    date: "" ,
    amount: "",
    paymentStatus: "",
    bookingId:""
  }

  constructor(private router: Router) {}

  
  btnContinueCheckOut() {
    this.totalBill = (this.poolBill+this.others+this.dinnerBill+this.lunchBill+this.breakFastBill)-this.discount
    this.billingDetails.date = this.billingInfo.checkOutDate
    this.billingDetails.paymentStatus = this.selectdStatus;
    this.billingDetails.bookingId = this.billingInfo.bookingId 
    this.billingDetails.amount = this.totalBill;
    
    
    console.log(this.totalBill);
    
    console.log("bill tt ",this.billingDetails);
    
    if(this.totalBill>0){
      this.isDisabled = false
    }else{
      this.isDisabled = true
    }
    
  }

  btnViewBillingStory() {
    this.router.navigate(['/dashboard-pages/billing/billing-history']);
  }
  
  onSelected() {
      console.log("stat",this.selectdStatus);
      
  }

  clearForm() {
    this.bookingId1 = [];

    this.poolBill= 0.00;
    this.dinnerBill=0.00;
    this.breakFastBill=0.00;
    this.lunchBill=0.00;
    this.discount=0.00;
    this.totalBill=0.00;
  }

  btnCheckOut(){

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, conform it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.pay(this.billingDetails)
      }
    });

  }


  
  getBookingIdVal(bookingId: string) {
    console.log(bookingId);

    if(bookingId != ""){
      fetch(`http://localhost:8080/booking/all?id=${bookingId}`)
      .then(res => {
        if(!res.ok){
          // alert("Booking not found");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Booking not found!",
            });
          
        }
        return res.json();
      })
      
      .then(data=>{
        console.log("data ",data);
        this.billingInfo = data[0]
        console.log("bill ",this.billingInfo);
        if(this.billingInfo == null){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Booking not found!",
            });
        }

      })

    }
    
  }

  pay(billingObj: any){
    console.log("billingObj ",billingObj);
    console.log("delete Booking Id ",billingObj.bookingId);
    
    console.log("jsom ",JSON.stringify(billingObj));
    fetch("http://localhost:8080/billing/save",{
      method: "POST",
      headers:
      {
        'content-type':'application/json'
      },
      body: JSON.stringify(billingObj)
    })
    
    
    .then(res=>{

      if(res.ok){
          Swal.fire({
            title: "Payment Success!",
            text: "payment finished successfully.",
            icon: "success"
          });
      
      }else{

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "billing NOT success...!",
          });

      }
    
    })

  }

  ngAfterViewInit(): void {
    // Fetch all forms with the "needs-validation" class
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over the forms and add event listeners
    Array.prototype.slice.call(forms).forEach((form: any) => {
      form.addEventListener(
        'submit',
        (event: Event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        },
        false
      );
    });
  }

}
