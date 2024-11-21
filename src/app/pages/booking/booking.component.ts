import { NgFor } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})

export class BookingComponent implements OnInit {


  editBooking: any = {};
  searchedBooking: any = [];
  inpBookingDateVal: any = '';
  inpCheckInDateVal: any = '';
  inpCheckOutDateVal: any = '';
  inpCustomerIdVal: any = '';
  public names: String = '';
  bookingCount: any = '';
  room: any = '';
  roomCount: any = '';
  remRooms: any = '';
  public bookingInfo: any = [];
  updateBooking: any = {};
  searchQuery: string = '';
  inpCustomerNameVal: any;

  updateBooking2: any = {
    bookingId: '',
    bookingDate: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
    customer: {
        name: '',
        id: ''
    }
  };
inpRoomTypeVal: any;
currentTarget: any;
  
  ngOnInit(): void {
    this.loadBookingInfo();
    this.loadRoomInfo();
  }

  loadTargetBar(bookingCount: number): void {
    this.currentTarget = ((bookingCount / this.roomCount) * 100).toFixed(0) + "%";
    console.log("currentTarget: " + this.currentTarget);
    
  }

  onSelected() {
    console.log("onselectd ",this.updateBooking2.roomType);
    
  }

  performSearch(searchedId: any) {
    if (this.searchQuery.trim()) {
      this.searchByIdOnAction(searchedId)
    }
  }


 // UPDATE


  btnUpdateOnAction1(updateBooking: any) {
    console.log("updateBooking ",updateBooking)
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.update(updateBooking)
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    this.loadBookingInfo()
  }


  btnPencilEditOnAction(booking: any) {

    let updateBooking : any = {
      bookingId: booking.bookingId,
      bookingDate: booking.bookingDate,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      roomType: booking.roomType,
      customer: {
        id: booking.customer.id,
        name: booking.customer.name
      }
    }

    this.updateBooking2 = updateBooking;
    
  }


  btnUpdateOnAction(inpBookingIdVal: any, inpBookingDateVal: any, inpCheckInDateVal: any, inpCheckOutDateVal: any, inpCustomerIdVal: any, inpRoomTypeVal: any) {

    
    let updateBooking = {
      bookingId: inpBookingIdVal,
      bookingDate: inpBookingDateVal,
      checkInDate: inpCheckInDateVal,
      checkOutDate: inpCheckOutDateVal,
      roomType: inpRoomTypeVal,
      customer: {
        id: inpCustomerIdVal,
      }
    }

    console.log("updateBooking ",updateBooking);
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.update(updateBooking);
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

  }


  update(updateBooking : any){

    fetch(`http://localhost:8080/booking/update`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updateBooking)

    })
      .then(res => {
        if (res.ok) {
          // alert("Booking Succussfully Updated :)")
          Swal.fire({
            title: "Good job!",
            text: "Booking Succussfully Updated :)",
            icon: "success"
          });
          this.loadBookingInfo()
          this.loadRoomInfo()
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
        return res;
      })
      
      console.log("body :", JSON.stringify(updateBooking));


  }

  

  // EDIT

  btnEditOnAction(editBooking: any) {

    this.updateBooking = editBooking

    this.inpBookingDateVal = editBooking.bookingDate
    this.inpCheckInDateVal = editBooking.checkInDate
    this.inpCheckOutDateVal = editBooking.checkOutDate
    this.inpRoomTypeVal = editBooking.roomType
    this.inpCustomerIdVal = editBooking.customer.id
    this.inpCustomerNameVal = editBooking.customer.name
    console.log("edit", editBooking);

    console.log(this.inpBookingDateVal);
    console.log(this.inpCheckInDateVal);
    console.log(this.inpCheckOutDateVal);
    console.log(this.inpRoomTypeVal);
    console.log(this.inpCustomerIdVal);
    console.log(this.inpCustomerNameVal);
    
  }


// DELETE

  btnDeleteOnAction(deleteBooking: any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(deleteBooking)
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });

    this.loadBookingInfo()
  }


  delete(deleteBooking: any){
    fetch(`http://localhost:8080/booking/delete-by-id/${deleteBooking}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deleteBooking)
    })
    .then(res => {
      if (res.ok) {
        Swal.fire({
          title: "Good job!",
          text: "Booking Succussfully Deleted :)",
          icon: "success"
        });
        this.loadBookingInfo()
        this.loadRoomInfo()
      }else{

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });

      }
      return res;
    })

    console.log(JSON.stringify("delete b ",deleteBooking));
  }


  getImage(image: any) {
    console.log(image);

  }

// LOAD

  loadBookingInfo() {
    fetch("http://localhost:8080/booking/all")
    .then(res => res.json())
    .then(data => {
      this.bookingInfo = data;
      
      this.bookingCount = data.length;
      console.log("data ",this.bookingInfo);
      console.log('booking count ',this.bookingCount);
      this.loadRoomInfo()

      })
  }

  // ADD


  addBookingOnAction(inpBookingDate: string, inpCustomerId: string, inpCheckInDate: string, inpCheckOutDate: string , inpRoomType: String) {
    console.log(inpBookingDate);
    console.log(inpCustomerId);
    console.log(inpCheckInDate);
    console.log(inpCheckOutDate);
    console.log(inpRoomType);

    const bookingData = {
      bookingDate: inpBookingDate,
      checkInDate: inpCheckInDate,
      checkOutDate: inpCheckOutDate,
      roomType: inpRoomType,
      customer: { id: inpCustomerId }
    };

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        this.save(bookingData);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });


  }

  save(bookingData: any){
    fetch('http://localhost:8080/booking/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    })
    .then(res => {
      if (res.ok) {
        Swal.fire("Saved!", "", "success");
        this.loadBookingInfo()
        this.loadRoomInfo()
      }
      return res;
    })
    .catch(error => { alert("Bookind NOT Add...") })

    console.log(JSON.stringify(bookingData));
  }

// SEARCH

  searchByIdOnAction(bookingId: String) {
    fetch(`http://localhost:8080/booking/all?id=${bookingId}`)
      .then(res => {

        if (!res.ok) {
          alert("Booking is NOT found...!")
        }

        return res.json()
      })

      .then(data => {

        this.searchedBooking = data;
        console.log(this.searchedBooking);

      })
      .catch(error => {
        alert("check and try again...!")
      })

  }

  // LOAD ROOM INFO

  loadRoomInfo() {
    fetch("http://localhost:8080/room/all")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.roomCount = data.length
        this.remRooms = this.roomCount - this.bookingCount
        console.log("booking ",this.bookingCount);
        console.log("room ",this.roomCount);
        this.loadTargetBar(this.bookingCount)

        if (this.remRooms <= 0) {
          this.remRooms = 0;
        }

      })
  }



}
