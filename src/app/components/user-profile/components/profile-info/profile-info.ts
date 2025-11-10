import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../models/user';
import { UserService } from '../../../../core/services/user';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  templateUrl: './profile-info.html',
  styleUrls: ['./profile-info.css'],
  imports: [CommonModule, FormsModule]
})
export class ProfileInfoComponent {
  @Input() user!: User;
  editing = false;
  showPasswordFields = false;

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService) {}

  saveProfile() {
    if (this.showPasswordFields) {
      if (this.passwordData.currentPassword !== this.user.password) {
        alert(' L’ancien mot de passe est incorrect.');
        return;
      }
      if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        alert(' Les nouveaux mots de passe ne correspondent pas.');
        return;
      }

      this.user.password = this.passwordData.newPassword;
    }

    this.userService.update(this.user.id, this.user).subscribe(() => {
      alert('Profil mis à jour avec succès ✅');
      this.editing = false;
      this.showPasswordFields = false;
      this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
    });
  }
}
