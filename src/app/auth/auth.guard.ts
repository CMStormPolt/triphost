import {inject} from '@angular/core';
import { Router } from '@angular/router';

import { UserServiceService } from '../services/userService/user-service.service';

export const authGuard = () => {
  const userService = inject(UserServiceService);
  const router = inject(Router);

  if (userService.user()) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};

export const loginGuard = () => {
  const userService = inject(UserServiceService);
  const router = inject(Router);

  if (!userService.user()) {
    return true;
  }

  // Redirect to the dashboard page
  return router.parseUrl('');
};