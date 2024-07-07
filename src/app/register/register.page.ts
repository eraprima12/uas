import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username = '';
  fullname = '';
  password = '';
  photoMethod = '';
  photoURL = '';
  base64Image = '';

  constructor(
    private usersService: UsersService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  async register() {
    if (this.base64Image != '') {
      var name = (Date.now()).toString() + '.png';
      this.photoURL = this.usersService.apiUrl + 'images/' + name;
      this.usersService.uploadBase64(this.base64Image, name).subscribe(
        async (res: any) => {
          console.log(res);
          if (res.result === 'success') {
            this.completeRegistration();
          }
        },
        async (err) => {
          const toast = await this.toastController.create({
            message: 'Failed to upload image.',
            duration: 2000,
            position: 'bottom',
          });
          toast.present();
        }
      );
    }
  }

  completeRegistration() {
    this.usersService.register(this.username, this.fullname, this.password, this.photoURL).subscribe(
      async (res) => {
        if (res.result === 'success') {
          const toast = await this.toastController.create({
            message: 'Registration successful.',
            duration: 2000,
            position: 'bottom',
          });
          toast.present();
          this.router.navigate(['/login']);
        } else {
          const toast = await this.toastController.create({
            message: 'Registration failed.',
            duration: 2000,
            position: 'bottom',
          });
          toast.present();
        }
      },
      async (err) => {
        const toast = await this.toastController.create({
          message: 'Registration failed.',
          duration: 2000,
          position: 'bottom',
        });
        toast.present();
      }
    );
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });
    this.base64Image = image.base64String!;
    this.photoURL = `data:image/png;base64,${image.base64String}`;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = 'data:image/png;base64,' + (reader.result as string).split(',')[1];
      this.photoURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
