import { Component, Signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import { HeaderComponent } from './components/header/header/header.component';
import { UserServiceService } from './services/userService/user-service.service';
import { User } from './types/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private userService: UserServiceService, private router: Router) {}

  title = 'triphost';
  currentUser: Signal<User | null> = this.userService.user
}
