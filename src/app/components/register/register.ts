import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  user = {
    firstName: '',
    lastName: '',
    email: '',
    motDePasse: '', 
    addresses: [
      {
        street: '',
        city: '',
        zip: '',
        country: ''
      }
    ],
    favorites: [] 
  };

  confirmPassword: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  validatePassword(password: string): string {
    if (password.length < 8) return 'Le mot de passe doit comporter au moins 8 caractères.';
    if (!/[A-Z]/.test(password)) return 'Le mot de passe doit contenir au moins une lettre majuscule.';
    if (!/[a-z]/.test(password)) return 'Le mot de passe doit contenir au moins une lettre minuscule.';
    if (!/[0-9]/.test(password)) return 'Le mot de passe doit contenir au moins un chiffre.';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Le mot de passe doit contenir un caractère spécial.';
    return '';
  }

  get passwordChecks() {
    const pwd = this.user.motDePasse || '';
    return {
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      hasLength: pwd.length >= 8
    };
  }

  onSubmit() {
    this.error = '';

    if (this.user.motDePasse !== this.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas.";
      return;
    }

    const pwdError = this.validatePassword(this.user.motDePasse);
    if (pwdError) {
      this.error = pwdError;
      return;
    }

    this.authService.register1(this.user).subscribe({

      next: (response) => {
        console.log("Inscription réussie :", response);
        alert("Compte créé avec succès !");
        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.error("Erreur backend :", err);

        if (err.status === 409) {
          this.error = "Cet email est déjà utilisé.";
        } else {
          this.error = "Une erreur est survenue. Réessayez.";
        }
      }
    });
  }
}
