import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  togglePassword(fieldId: string) {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    const button = input?.parentElement?.querySelector('.toggle-password') as HTMLButtonElement;
    if (input && button) {
      if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
      } else {
        input.type = 'password';
        button.textContent = '👁️';
      }
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = "Veuillez renseigner l'email et le mot de passe.";
      return;
    }

    this.isLoading = true;

    const credentials = {
      email: this.email,
      motDePasse: this.password  
    };

    this.auth.login1(credentials).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        console.log('Connexion réussie', response);
        this.router.navigate(['/']); 
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur login :', err);

        if (err.status === 401 || err.status === 403) {
          this.error = 'Email ou mot de passe incorrect.';
        } else {
          this.error = 'Une erreur est survenue. Réessayez.';
        }
      }
    });
  }

}
