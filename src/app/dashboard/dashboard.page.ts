import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userPosts: any[] = [];

  constructor(private userService: UsersService,
    private toastController: ToastController,) { }

  ngOnInit() {
    this.loadUserPosts();
  }

  ionViewDidEnter() {
    this.loadUserPosts();
  }

  loadUserPosts() {
    this.userService.getReports('').subscribe(
      (response) => {
        this.userPosts = response;
      },
      (error) => {
        console.error('Error fetching user posts', error);
      }
    );
  }

  async likePost(reportId: number) {
    try {
      var username = localStorage.getItem('username');
      const response = await this.userService.likePost(reportId, username!).toPromise();
      console.log(response);
      if (response.status === 'success') {
        await this.showToast('Post liked', 'success');
        this.loadUserPosts();
      } else {
        await this.showToast('Failed to like post', 'danger');
      }
    } catch (error) {
      console.error('Error liking post:', error);
      await this.showToast('Error', 'danger');
    }
  }

  async dislikePost(reportId: number) {
    try {
      var username = localStorage.getItem('username');
      const response = await this.userService.dislikePost(reportId, username!).toPromise();
      if (response.status === 'success') {
        await this.showToast('Post disliked', 'success');
        this.loadUserPosts();
      } else {
        await this.showToast('Failed to dislike post', 'danger');
      }
    } catch (error) {
      console.error('Error disliking post:', error);
      await this.showToast('Error', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }
}
