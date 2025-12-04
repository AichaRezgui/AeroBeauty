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
  const updateData: any = {
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    email: this.user.email
  };

  if (this.showPasswordFields) {
    updateData.currentPassword = this.passwordData.currentPassword;
    updateData.newPassword = this.passwordData.newPassword;
  }

  this.userService.update(this.user.id, updateData).subscribe({
    next: updatedUser => {
      alert('Profil mis à jour avec succès ');
      this.user = updatedUser;
      this.editing = false;
      this.showPasswordFields = false;
      this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
    },
    error: err => {
      console.error(err);
      alert(err.error || 'Erreur lors de la mise à jour du profil');
    }
  });
}

}
