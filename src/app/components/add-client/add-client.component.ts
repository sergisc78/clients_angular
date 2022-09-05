import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;
  title = 'Add new client';
  id: string | null;
  button='Add'

  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private clientService: ClientsService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telephone: [null, [Validators.required]],
      country: [null, [Validators.required]],
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    // IF USER IS NOT LOGGED
    /* this.afAuth.currentUser.then((user) => {
      if (user && user?.emailVerified) {
        this.dataUser = user;
      } else {
        this.router.navigate(['/login']);
      }
    });*/
    this.edit();
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

  addUpdateClient() {
    const CLIENT: Client = {
      name: this.clientForm.get('name')?.value,
      email: this.clientForm.get('email')?.value,
      telephone: this.clientForm.get('telephone')?.value,
      country: this.clientForm.get('country')?.value,
    };
    console.log(CLIENT);

    // IF ID IS NOT NULL, THE CLIENT EXIST, THEN WE CAN UPDATE IT

    if (this.id !== null) {
      this.clientService.updateClient(this.id, CLIENT).subscribe(
        (data) => {
          this.toastr.success(
            'Client updated sucessfully',
            "Update info's client",
            {
              positionClass: 'toast-top-right',
              timeOut: 6000,
            }
          );
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
          this.clientForm.reset();
        }
      );
    } else {

      // ADD CLIENT

      console.log(CLIENT);
      this.clientService.addClient(CLIENT).subscribe(
        (data) => {
          this.toastr.success('Client added succesfully', 'Add client', {
            positionClass: 'toast-top-right',
            timeOut: 6000,
          });
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
          this.clientForm.reset();
        }
      );
    }
  }

   // SHOW DATA IN INPUTS
  edit() {
    if (this.id !== null) {
      this.title = 'Edit client';
      this.button='Update'
      this.clientService.getClient(this.id).subscribe((data) => {
        this.clientForm.setValue({
          name: data.name,
          email: data.email,
          telephone: data.telephone,
          country: data.country,
        });
      });
    }
  }
}
