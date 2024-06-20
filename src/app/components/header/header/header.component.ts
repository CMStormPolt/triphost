import { Component, InputSignal, input, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import { UserServiceService } from '../../../services/userService/user-service.service';

import { User } from '../../../types/user.interface';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatDividerModule, MatButtonModule, RouterLink, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: InputSignal<User | null> = input<User | null>(null);

  constructor(private userService: UserServiceService) {}

  onLogOutClick(event: MouseEvent) {
    event.stopPropagation();
    this.userService.loggOut();
  }
}
