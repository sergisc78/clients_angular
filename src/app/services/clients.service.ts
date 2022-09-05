import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/clients';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  
  url:string = 'http://localhost:3000/clients/';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }
  getClient(id: string): Observable<Client> {
    return this.http.get<Client>('http://localhost:3000/clients/'+ id);
  }
  addClient(client: Client): Observable<any> {
    return this.http.post('http://localhost:3000/clients/add', client);
  }
  deleteClient(id: string): Observable<any> {
    return this.http.delete(this.url+ id);
  }
  updateClient(id: string, client: Client): Observable<any> {
    return this.http.patch(this.url+ id, client);
  }

}
