import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router
  ) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout(); 
    this.router.navigate(['/']); 
  }
  menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
  const nav = document.querySelector('.nav-links') as HTMLElement;
  if(nav) {
    nav.style.display = this.menuOpen ? 'flex' : 'none';
  }
}

}
