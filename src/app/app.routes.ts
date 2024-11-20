import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { HomeComponent } from './pages/home/home.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BillingComponent } from './pages/billing/billing.component';
import { ReportComponent } from './pages/report/report.component';
import { CommonComponent } from './common/common.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { ComplainComponent } from './pages/complain/complain.component';
import { RoomComponent } from './pages/room/room.component';
import { LoginComponent } from './login/login.component';
import { DashboardPagesComponent } from './pages/dashboard-pages/dashboard-pages.component';
import { BillingHistoryComponent } from './pages/billing-history/billing-history.component';
import { BillingPagesComponent } from './pages/billing-pages/billing-pages.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';


export const routes: Routes = [
    {
        path: "",
        component:LoginComponent
    },
    {   path: "forgot-password" ,
        component: ForgottenPasswordComponent
    },
    {
        path: "reset-password",
        component: ResetPasswordComponent
    },
    {
        path : "dashboard-pages",
        component : DashboardPagesComponent,
        children:[
            {
                path : "",
                component : HomeComponent
            },
            {
                path : "billing",
                component : BillingPagesComponent,
                children:[
                    {
                        path: "",
                        component: BillingComponent
                    },
                    {
                        path: "billing-history",
                        component: BillingHistoryComponent
                    }
                ]
            },
            {
                path : "complain",
                component : ComplainComponent
            },
            {
                path : "booking",
                component : BookingComponent
            },
            {
                path : "dashBoard",
                component : AppComponent
            },
            {
                path : "room",
                component: RoomComponent
            },
            {
                path : "customer",
                component: CustomerComponent
            },
            {
                path : "report",
                component : ReportComponent
            },
        ],
        
    }
];

  @NgModule({
    imports: [RouterModule.forRoot(routes,  { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}