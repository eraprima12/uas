import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.page.html',
  styleUrls: ['./detailpost.page.scss'],
})
export class DetailpostPage implements OnInit {
  post: any;
  newComment: string = '';
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private toastController: ToastController,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const reportId = params.get('index');
      if (reportId) {
        this.loadPostDetails(reportId);
        this.getComments(parseInt(reportId));
      }
    });
  }

  async likePost(reportId: number) {
    try {
      var username = localStorage.getItem('username');
      const response = await this.userService.likePost(reportId, username!).toPromise();
      console.log(response);
      if (response.status === 'success') {
        await this.showToast('Post liked', 'success');
        this.loadPostDetails(reportId.toString());
      } else {
        await this.showToast('Failed to like post', 'danger');
      }
    } catch (error) {
      console.error('Error liking post:', error);
      await this.showToast('Error', 'danger');
    }
  }

  async postComment() {
    if (this.newComment.trim() === '') {
      return;
    }

    var username = localStorage.getItem('username');
    try {
      const commentData = {
        report_id: this.post.report_id,
        username: username,
        comment_text: this.newComment,
        comment_date: new Date().toISOString()
      };

      const response: any = await this.userService.postComment(commentData).toPromise();
      if (response.status === 'success') {
        this.loadPostDetails(this.post.report_id);
        this.getComments(this.post.report_id);
        this.newComment = '';
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  }

  getComments(reportId: number) {
    this.userService.getComments(reportId).subscribe(
      (response: any[]) => {
        this.comments = response;
      },
      error => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  async dislikePost(reportId: number) {
    try {
      var username = localStorage.getItem('username');
      const response = await this.userService.dislikePost(reportId, username!).toPromise();
      if (response.status === 'success') {
        await this.showToast('Post disliked', 'success');
        this.loadPostDetails(reportId.toString());
      } else {
        await this.showToast('Failed to dislike post', 'danger');
      }
    } catch (error) {
      console.error('Error disliking post:', error);
      await this.showToast('Error', 'danger');
    }
  }

  loadPostDetails(reportId: string) {
    this.userService.getReportById(reportId).subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.length > 0) {
          this.post = response[0];
        }
      },
      (error) => {
        console.error('Error loading post details:', error);
      }
    );
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
