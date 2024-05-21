import { Component, Input, OnInit } from '@angular/core';
import { RegistrationserviceService } from 'src/app/registrationservice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
constructor(private service:RegistrationserviceService){

}
response!:string;
  ngOnInit(): void {
    this.response = this.service.appresponse();
  }


}
