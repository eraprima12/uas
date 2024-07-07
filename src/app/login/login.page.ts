import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username = ''
  password = ''

  constructor(
    private usersService: UsersService,
    private router: Router,
    private toastController: ToastController,
  ) { }

  async login() {
    this.usersService.login(this.username, this.password).subscribe(
      async (response) => {
        if (response.status === 'success') {

          const toast = await this.toastController.create({
            message: 'Login Sukses',
            duration: 2000,
            color: 'success'
          });
          await toast.present();
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('fullname', response.user.fullname);
          localStorage.setItem('profile_photo', response.user.profile_photo);
          this.router.navigate(['/dashboard']);
        } else {
          const toast = await this.toastController.create({
            message: response.message,
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      },
      async (error) => {
        const toast = await this.toastController.create({
          message: 'Error',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    );
  }
}
