import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthSessionService } from '@services/auth-session.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth.component.html',
  imports: [CommonModule, RouterModule],
})
export class AuthLayoutComponent {
  user: any;

  constructor(private authSession: AuthSessionService) {
    this.user = this.authSession.getUser();
  }
}
