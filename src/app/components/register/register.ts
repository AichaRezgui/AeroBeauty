import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { UserService } from '../../core/services/user';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    addresses: [
      { id: 0, street: '', city: '', zip: '', country: '' }
    ],
    favorites: [],
    orders: []
  };

  confirmPassword = '';
  error = '';

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (users) => {
        const maxId = users.length > 0 ? Math.max(...users.map(u => Number(u.id))) : 0;
        this.user.id = maxId + 1;
        this.user.addresses[0].id = maxId + 1;
      },
      error: (err) => console.error('Erreur lors du chargement des utilisateurs :', err)
    });
  }

  onSubmit() {
    const passwordError = this.validatePassword(this.user.password);
    if (passwordError) {
      this.error = passwordError;
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const userToSave = {
      ...this.user,
      id: String(this.user.id),
      addresses: this.user.addresses.map(addr => ({
        ...addr,
        id: String(addr.id)
      }))
    };

    this.auth.register(userToSave as any).subscribe({
      next: () => {
        alert('Inscription réussie ! Vous pouvez vous connecter.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.error = "Une erreur est survenue lors de l'inscription.";
      }
    });
  }

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
    if (password.length < 6) return 'Le mot de passe doit comporter au moins 6 caractères.';
    if (!/[A-Z]/.test(password)) return 'Le mot de passe doit contenir au moins une lettre majuscule.';
    if (!/[a-z]/.test(password)) return 'Le mot de passe doit contenir au moins une lettre minuscule.';
    if (!/[0-9]/.test(password)) return 'Le mot de passe doit contenir au moins un chiffre.';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Le mot de passe doit contenir un caractère spécial.';
    return '';
  }

  get passwordChecks() {
    const pwd = this.user.password || '';
    return {
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      hasLength: pwd.length >= 8
    };
  }
}
