import { CommonModule, NgIfContext } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-billing-history',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './billing-history.component.html',
  styleUrl: './billing-history.component.css'
})
export class BillingHistoryComponent implements OnInit{
  searchQuery: any;
  
  billings: any = [];
  
  
ngOnInit(): void {
  this.load()
}

performSearch(bookingId: string) {
  
  this.find(bookingId)

}

btnReloadOnAction(){
  this.load()
};
load() {
  
  fetch("http://localhost:8080/billing/all")
  .then(res=>res.json())
  .then(data=>{
    this.billings = data;
  })

}
find(bookingId: string) {
  console.log(bookingId);
  
  fetch(`http://localhost:8080/billing/all?bookingId=${bookingId}`)
  .then(res=>{
  
    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Billing NOT Found...!",
      });
    }

    return res.json()
  })
  .then(data=>{
    if(data.length==1){
      this.billings = data
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Billing NOT Found...!",
      });

    }
    console.log(data);
    
  })
}
}