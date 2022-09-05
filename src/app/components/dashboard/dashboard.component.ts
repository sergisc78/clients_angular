import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dataUser: any;
  listClients: Client[] = [];
  listClientsCopy: Client[] = [];
  searchClient !:string;
  

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private clientService: ClientsService,
    private aRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getClients();

  

    //IF USER IS NOT LOGGED

     this.afAuth.currentUser.then((user) => {
      if (user && user?.emailVerified) {
        this.dataUser = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }



  getClients() {
    this.clientService.getClients().subscribe(
      (data) => {
        console.log(data);
        this.listClients = data;
      },
      (error) => {
        console.log(error);
      }
      
    );
    
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.toastr.info('See you soon !', 'Logout', {
        timeOut: 5000,
      });

      // TO SHOW TOASTR MESSAGE CORRECTLY
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    });
  }
  
  deleteClient(id: any): void {
    if(confirm('Are you sure you want to delete this client?')){
    this.clientService.deleteClient(id).subscribe(
      (data) => {
       this.toastr.error('Client deleted successfully', 'Delete client', {
          positionClass: 'toast-top-right',
          timeOut: 6000,
        })
      
        this.getClients();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
}

