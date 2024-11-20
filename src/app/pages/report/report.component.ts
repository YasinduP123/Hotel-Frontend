import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
Chart.register(...registerables);

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {

  singleRoomBookingCount: number = 0;
  doubleRoomBookingCount: number = 0;
  deluxeRoomBookingCount: number = 0;
  suiteRoomBookingCount: number = 0;

  singleBarRoomBookingCount: number=0;
  doubleBarRoomBookingCount: number=0;
  deluxeBarRoomBookingCount: number=0;
  suiteBarRoomBookingCount: number=0;
  // Doughnut chart data
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Single', 'Double', 'Suite', 'Deluxe'],
    datasets: [
      {
        data: [this.singleRoomBookingCount, this.doubleRoomBookingCount, this.suiteRoomBookingCount, this.deluxeRoomBookingCount],
        backgroundColor: ['#9EDF9C', '#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  // Doughnut chart options
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  public doughnutChartType: 'doughnut' = 'doughnut';

  // Bar chart data
  public barChartData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'booking count',
        data: [],
        backgroundColor: '#9EDF9C'
      },

    ]
  };

  // Bar chart options
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        },
        beginAtZero: true,
      }
    }
  };

  public barChartType: 'bar' = 'bar';
  januaryBarRoomBookingCount: number = 0;
  februaryBarRoomBookingCount: number = 0;
  marchBarRoomBookingCount: number = 0;
  aprilBarRoomBookingCount: number = 0;
  mayBarRoomBookingCount: number = 0;
  juneBarRoomBookingCount: number = 0;
  julyBarRoomBookingCount: number = 0;
  augustBarRoomBookingCount: number = 0;
  septemberBarRoomBookingCount: number = 0;
  octoberBarRoomBookingCount: number = 0;
  novemberBarRoomBookingCount: number = 0;
  decemberBarRoomBookingCount: number = 0;
  januaryRoomBookingCount: any;
  februaryRoomBookingCount: any;
  marchRoomBookingCount: any;
  aprilRoomBookingCount: any;
  mayRoomBookingCount: any;
  juneRoomBookingCount: any;
  julyRoomBookingCount: any;
  augustRoomBookingCount: any;
  septemberRoomBookingCount: any;
  octoberRoomBookingCount: any;
  novemberRoomBookingCount: any;
  decemberRoomBookingCount: any;

  constructor() {}

  ngOnInit(): void {
    this.fetchBookingData();
    this.fetchBookingDataToBarChart();
  }

  // Add data to Bar chart

  fetchBookingDataToBarChart(): void {
    // Create an array of promises for each month's booking data
    const promises = [];
    
    promises.push(this.fetchBarChartRoomBookingCount(1));
    promises.push(this.fetchBarChartRoomBookingCount(2));
    promises.push(this.fetchBarChartRoomBookingCount(3));
    promises.push(this.fetchBarChartRoomBookingCount(4));
    promises.push(this.fetchBarChartRoomBookingCount(5));
    promises.push(this.fetchBarChartRoomBookingCount(6));
    promises.push(this.fetchBarChartRoomBookingCount(7));
    promises.push(this.fetchBarChartRoomBookingCount(8));
    promises.push(this.fetchBarChartRoomBookingCount(9));
    promises.push(this.fetchBarChartRoomBookingCount(10));
    promises.push(this.fetchBarChartRoomBookingCount(11));
    promises.push(this.fetchBarChartRoomBookingCount(12));
  
    // Wait for all promises to resolve, then update the bar chart data
    Promise.all(promises).then(() => {
      this.updateBarChartData();
    });
  }
  
  fetchBarChartRoomBookingCount(month: number): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/booking/all?month=${month}`)
        .then(res => res.json())
        .then(data => {
          // Update the corresponding month booking count
          switch (month) {
            case 1:
              this.januaryBarRoomBookingCount = data.length;
              break;
            case 2:
              this.februaryBarRoomBookingCount = data.length;
              break;
            case 3:
              this.marchBarRoomBookingCount = data.length;
              break;
            case 4:
              this.aprilBarRoomBookingCount = data.length;
              break;
            case 5:
              this.mayBarRoomBookingCount = data.length;
              break;
            case 6:
              this.juneBarRoomBookingCount = data.length;
              break;
            case 7:
              this.julyBarRoomBookingCount = data.length;
              break;
            case 8:
              this.augustBarRoomBookingCount = data.length;
              break;
            case 9:
              this.septemberBarRoomBookingCount = data.length;
              break;
            case 10:
              this.octoberBarRoomBookingCount = data.length;
              break;
            case 11:
              this.novemberBarRoomBookingCount = data.length;
              break;
            case 12:
              this.decemberBarRoomBookingCount = data.length;
              break;
          }
          console.log(`Month ${month}: ${data.length} bookings`);
          resolve();
        })
        .catch(err => {
          console.error('Error fetching booking data for month ' + month, err);
          reject(err);
        });
    });
  }
  
  updateBarChartData(): void {
    // Prepare new data array with booking counts
    const newData = [
      this.januaryBarRoomBookingCount,
      this.februaryBarRoomBookingCount,
      this.marchBarRoomBookingCount,
      this.aprilBarRoomBookingCount,
      this.mayBarRoomBookingCount,
      this.juneBarRoomBookingCount,
      this.julyBarRoomBookingCount,
      this.augustBarRoomBookingCount,
      this.septemberBarRoomBookingCount,
      this.octoberBarRoomBookingCount,
      this.novemberBarRoomBookingCount,
      this.decemberBarRoomBookingCount
    ];
    
    this.barChartData = {
      ...this.barChartData,
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'Room Bookings',
        data: newData,
        backgroundColor: [
          '#FF6384', '#FF6384', '#FF6384', '#FF6384', '#FF6384', '#FF6384', 
          '#FF6384', '#FF6384', '#FF6384', '#FF6384', '#FF6384', '#FF6384'
        ], 
        borderColor: [
          '#FF6384', '#FF6384', '#FF6384', '#FF6384', '#FF6384', '#FF6384', 
          '#FF6384', '#FF6384', '#FF6384', '#FF6384', '#FF6384', '#FF6384'
        ],
        borderWidth: 1
      }]
    };
    
  }
  


  // Add data to dougnet chart

  fetchBookingData(): void {
    this.fetchRoomBookingCount('Single', count => this.singleRoomBookingCount = count);
    this.fetchRoomBookingCount('Double', count => this.doubleRoomBookingCount = count);
    this.fetchRoomBookingCount('Deluxe', count => this.deluxeRoomBookingCount = count);
    this.fetchRoomBookingCount('Suite', count => this.suiteRoomBookingCount = count);
  }

  fetchRoomBookingCount(roomType: string, callback: (count: number) => void) {
    fetch(`http://localhost:8080/booking/all?roomType=${roomType}`)
      .then(res => res.json())
      .then(data => {
        callback(data.length);
        console.log(data);
        this.updateDoughnutChartData();
      });
  }

  updateDoughnutChartData(): void {
    // Update doughnut chart data
    const newData = [
      this.singleRoomBookingCount,
      this.doubleRoomBookingCount,
      this.suiteRoomBookingCount,
      this.deluxeRoomBookingCount
    ];

    // Force re-assignment of the doughnutChartData object to trigger Angular's change detection
    this.doughnutChartData = {
      ...this.doughnutChartData,
      datasets: [{ ...this.doughnutChartData.datasets[0], data: newData }]
    };
  }
}
