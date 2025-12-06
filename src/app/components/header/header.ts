import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  isLoggedIn$!: Observable<boolean>;

  menuOpen = false;

  constructor(public auth: AuthService, private router: Router) {
    this.isLoggedIn$ = this.auth.isLoggedIn();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const nav = document.querySelector('.nav-links') as HTMLElement;
    if (nav) {
      nav.style.display = this.menuOpen ? 'flex' : 'none';
    }
  }
}
