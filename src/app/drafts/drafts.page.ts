import { Component, OnInit } from '@angular/core';
import { DexieService } from '../dexie.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.page.html',
  styleUrls: ['./drafts.page.scss'],
})
export class DraftsPage implements OnInit {
  drafts: any[] = [];

  constructor(
    private dexieService: DexieService,
    private router: Router,
    private userService: UsersService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadDrafts();
  }

  ionViewDidEnter() {
    this.loadDrafts();
  }

  async loadDrafts() {
    this.drafts = await this.dexieService.getDrafts();
  }

  async deleteDraft(id: number) {
    await this.dexieService.deleteDraft(id);
    const toast = await this.toastController.create({
      message: 'Draft berhasil dihapus',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
    this.loadDrafts();
  }

  editDraft(draft: any) {
    this.router.navigate(['/report'], { state: { draft } });
  }

  async sendDraft(draft: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin mengirim draft ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Kirim',
          handler: async () => {
            this.userService.postData(draft).subscribe(
              async (response: any) => {
                if (response.status === 'success') {
                  await this.deleteDraft(draft.id);
                  const toast = await this.toastController.create({
                    message: 'Draft berhasil dikirim',
                    duration: 2000,
                    color: 'success'
                  });
                  await toast.present();
                } else {
                  const toast = await this.toastController.create({
                    message: 'Gagal mengirim draft',
                    duration: 2000,
                    color: 'danger'
                  });
                  await toast.present();
                }
              },
              async (error: any) => {
                const toast = await this.toastController.create({
                  message: 'Terjadi kesalahan saat mengirim draft',
                  duration: 2000,
                  color: 'danger'
                });
                await toast.present();
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }
}
