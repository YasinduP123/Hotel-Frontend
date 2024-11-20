  import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-customer',
    standalone: true,
    imports: [NgFor,FormsModule],
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.css'
  })
  export class CustomerComponent{
    
    
    
    editCustomer : any = {};
    
    public customers:any = [];
    
    customer: any={
      name: "",
      nic: "",
      address: "",
      contactNumber: "",
      email: "",
      dob: "",
      gender: ""
    }
    image:any ;
    searchQuery: any;
    customerForm: FormGroup;

    
    constructor(private fb: FormBuilder,private http:HttpClient) {
      this.customerForm = this.fb.group({
        name: ['', Validators.required],
        nic: ['', Validators.required],
        address: ['', Validators.required],
        contactNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        image: ['']
      });
    }
    
    ngOnInit():void{
      this.loadCustomerInfo();
    }
    
    onFileChange(event: any) {
      this.image = <File>event.target.files[0];
      console.log("img ",this.image);
      
    }

    imageRemoveOnAction(editCustomerImg:any) {
      editCustomerImg = null;
      this.image = null
    }
    
    addCustomer(customer: any) {

      if(customer.name != "" && customer.nic != "" && customer.address != "" && customer.contactNumber != "" && customer.email != "" ){

        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            
            this.save(customer)
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });


      }else{

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Cannot add NULL details!",
        });
        
      }
      

    }

    performSearch(id: string) {

      this.searchByNic(id);
      
    }
    
    updateCustomerOnAction(selectedCustomer: any) {
      console.log(selectedCustomer);

      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.update(selectedCustomer)

        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

    }
    
    btnEditOnAction(customer: any) {  
      this.editCustomer = customer
    }
    
    btnDeleteOnAction(customerId: any) {

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
          this.delete(customerId) 
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

    update(updateCustomer : any){

      const formData = new FormData();

      formData.append('files', this.image);
      console.log("IMG ", this.image);
      
      formData.append('customer', new Blob([JSON.stringify(updateCustomer)], { type: 'application/json' }));
  
      fetch('http://localhost:8080/customer/update', {
        method: 'PUT',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire('Success!', 'Customer Updated successfully.', 'success');
            this.loadCustomerInfo()
            return response.text();
          } else {
            Swal.fire('Error!', 'Failed to Updated the customer.', 'error');
            throw new Error('Failed to Updated customer');
          }
        })
        .then((result) => {
          console.log('Result:', result);
        })
        .catch((error) => {
          console.error('Error Updating customer:', error);
          Swal.fire('Error!', 'An error occurred while Updating the customer.', 'error');
        });

    }

    delete(deleteCustomer : String){
      console.log("A ",deleteCustomer);
      

      fetch(`http://localhost:8080/customer/delete-by-id/${deleteCustomer}`,{
        method  : 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteCustomer)

      })
      .then(res=>{

        if(res.ok){
          
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });

          this.loadCustomerInfo()
        }else{
          Swal.fire({
            title: "Delete Failed!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }

        return res.json()

      })
    }

    searchByNic(nic: string) {

      fetch(`http://localhost:8080/customer/all?nic=${nic}`)
      .then(res => {

        if(!res.ok){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }

        return res.json()
      })
      .then(data => {
        console.log("ser cus " ,data);      
        this.customers = data;
        if (this.customers.length<=0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "customer Not Found!",
          });
          
        } else {
          
        }
      })
      
    }

    save(customer: any) {
      const formData = new FormData();

      formData.append('files', this.image);
      
      formData.append('customer', new Blob([JSON.stringify(customer)], { type: 'application/json' }));
  
      fetch('http://localhost:8080/customer/save', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire('Success!', 'Customer saved successfully.', 'success');
            this.loadCustomerInfo()
            return response.text();
          } else {
            Swal.fire('Error!', 'Failed to save the customer.', 'error');
            throw new Error('Failed to save customer');
          }
        })
        .then((result) => {
          console.log('Result:', result);
        })
        .catch((error) => {
          console.error('Error saving customer:', error);
          Swal.fire('Error!', 'An error occurred while saving the customer.', 'error');
        });
    

    }
    

    loadCustomerInfo(){
      fetch("http://localhost:8080/customer/all")
      .then(res => res.json())
      .then(data => {
        console.log(data);      
        this.customers = data;
      })
    }

  }


