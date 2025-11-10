import { Component, Input } from '@angular/core';
import { Address } from '../../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.html',
   styleUrls: ['./address-list.css'],
  imports : [CommonModule]
})
export class AddressListComponent {
  @Input() addresses: Address[] = [];
}
