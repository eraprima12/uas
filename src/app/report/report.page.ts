import { Component, OnInit } from '@angular/core';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { DexieService } from '../dexie.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  report: any = {
    title: '',
    description: '',
    target_institution: '',
    image: '',
    username: '',
    report_date: new Date().toISOString()
  };
  selectedImage: any;

  constructor(
    private userService: UsersService,
    private dexieService: DexieService,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.report = {
      title: '',
      description: '',
      target_institution: '',
      image: '',
      username: '',
      report_date: new Date().toISOString()
    };
    this.report.username = localStorage.getItem('username');
  }

  async selectImageSource() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Pilih Sumber Gambar',
      buttons: [{
        text: 'Ambil Foto',
        handler: () => {
          this.captureImage(CameraSource.Camera);
        }
      }, {
        text: 'Pilih dari Galeri',
        handler: () => {
          this.captureImage(CameraSource.Photos);
        }
      }, {
        text: 'Batal',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async captureImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    });

    if (image) {
      this.selectedImage = `data:image/png;base64,${image.base64String}`;
      const imageName = `report_${new Date().getTime()}.png`;

      this.userService.uploadBase64(this.selectedImage, imageName).subscribe(
        async (uploadResponse: any) => {
          if (uploadResponse.result === 'success') {
            this.report.image = `${this.userService.apiUrl}/images/${imageName}`;
          }
          else {
            this.selectedImage = '';
            this.report.image = '';
          }
        },
        async () => {
          this.selectedImage = '';
          this.report.image = '';
          const toast = await this.toastController.create({
            message: 'Gambar invalid atau terlalu besar',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      );
    }
  }

  async submitReport() {
    if (this.isDataValid()) {

      this.userService.postData(this.report).subscribe(
        async (response: any) => {
          console.log(response)
          if (response.status === 'success') {
            const toast = await this.toastController.create({
              message: 'Laporan berhasil dikirim',
              duration: 2000,
              color: 'success'
            });
            await toast.present();
            this.router.navigate(['/dashboard']);
          } else {
            const toast = await this.toastController.create({
              message: 'Gagal mengirim laporan',
              duration: 2000,
              color: 'danger'
            });
            await toast.present();
          }
        },
        async () => {
          const toast = await this.toastController.create({
            message: 'Gagal mengirim laporan',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      );
    } else {
      const toast = await this.toastController.create({
        message: 'Draft tidak valid',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  isDataValid() {
    if (this.report.username == '' || this.report.image == '' || this.report.title == '' || this.report.description == '' || this.report.target_institution == '') {
      return false;
    }
    return true;
  }

  async saveDraft() {
    if (this.isDataValid()) {
      await this.dexieService.saveDraft(this.report);
      const toast = await this.toastController.create({
        message: 'Draft berhasil disimpan',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      this.router.navigate(['/dashboard']);
    }
    else {
      const toast = await this.toastController.create({
        message: 'Draft tidak valid',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }

  }
}
