import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgFor,FormsModule,HttpClientModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {

  selectedRoom: String= "";
  searchQuery: any;
  customerEmail: String = '';
  roomCount: number = 0;
  room: any = {
    roomId:"",
    roomNumber:"",
    roomType:"",
    pricePerHour:0,
    pricePerDay:0
  };
  public roomList:any = [];
  searchedRoom: any = []
  roomUpdate: any = {}
  
  
  constructor(private http: HttpClient) { }
  
  ngOnInit():void{
    this.loadRoomInfo();
  }

  onSelected() {
    console.log("room type", this.room.roomType);
    
  }

  btnUpdateInIconOnAction(room: any) {
    this.roomUpdate = room
  }

  btnDeleteInIconOnAction(roomId: any) {
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
        this.delete(roomId)

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
  }

  btnDeleteOnAction(roomId: String) {

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
        this.delete(roomId)

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

    
  }
  
  btnUpdateOnAction(room: Object) {

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.update(room)
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

  }
    

  btnEditOnAction(room: Object) {
    this.roomUpdate = room;
    console.log("editRoom ",this.room);
  }

  updateRoom(room: any) {

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.update(room)
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    
  }

  addRoom(room: any) {
    console.log("room add ",room);

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.save(room)
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    
  }

  performSearch(roomNumber: string) {

    this.search(roomNumber);
    
  }

  loadRoomInfo(){
    this.http.get("http://localhost:8080/room/all").subscribe(data=>{
      console.log(data);
      console.log();
      this.roomList = data
      this.roomCount = this.roomList.length
    })
    
    
  }
  
  update(room: any):void{
    
    fetch("http://localhost:8080/room/update",{
      
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
      
      
    })
    .then(res=>{
      
      if(res.ok){
        Swal.fire({
          title: "Good job!",
          text: "Room Details Updated...!",
          icon: "success"
        });
        this.loadRoomInfo()
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }
      
      return res.json()
    })
    
    
  }
  
  delete(roomId: any):void{
    
    fetch(`http://localhost:8080/room/delete/${roomId}`,{
      
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomId)
      
      
    })
    .then(res=>{
      
      if(res.ok){
        
        Swal.fire({
          title: "Good job!",
          text: "Room Deleted!",
          icon: "success"
        });
        
        this.loadRoomInfo()
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
        
      }
      
      return res.json()
    })
    
    
  }
  
  save(room: any):void{
    
    fetch("http://localhost:8080/room/save",{
      
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
      
      
    })
    .then(res=>{
      
      if(res.ok){
        Swal.fire({
          title: "Good job!",
          text: "Room Saved Successfully...!",
          icon: "success"
        });
        this.loadRoomInfo()
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
        
      }
      
      return res.json()
    })
    
  }
  
  search(roomNumber: String){
    
    fetch(`http://localhost:8080/room/all?roomNumber=${roomNumber}`)
    .then(res=>{
    
     if(!res.ok){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User NOT found...!"
      });
     }
    
     return res.json()
    
    })

    .then(data=>{
      
      if(data.length==1){
        this.searchedRoom = data
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Room NOT Find... !"
        });

      }

    })

    
  }


}
