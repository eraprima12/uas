import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public apiUrl = 'https://ubaya.me/hybrid/160717058/';

  constructor(private http: HttpClient, private toastController: ToastController, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });

    return this.http.post(`${this.apiUrl}login.php`, body, { headers });
  }


  register(username: string, fullname: string, password: string, photoURL: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, fullname, password, photoURL });
    return this.http.post(`${this.apiUrl}register.php`, body, { headers });
  }

  uploadBase64(base64: string, name: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('base64', base64);
    body.set('name', name);
    const urlEncodedData = body.toString();
    return this.http.post(
      `${this.apiUrl}upload_image.php`, urlEncodedData, { headers });
  }

  getReports(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}get_reports.php?search=${search}`);
  }


  getReportById(reportId: string) {
    return this.http.get(`${this.apiUrl}get_reports.php?id=${reportId}`);
  }

  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'add_report.php', JSON.stringify(data), { headers });
  }

  likePost(reportId: number, username: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ report_id: reportId, username: username });

    return this.http.post(`${this.apiUrl}like.php`, body, { headers });
  }

  dislikePost(reportId: number, username: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ report_id: reportId, username: username });

    return this.http.post(`${this.apiUrl}dislike.php`, body, { headers });
  }

  getComments(reportId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get_comments.php?report_id=${reportId}`);
  }

  postComment(commentData: any) {
    return this.http.post(`${this.apiUrl}/post_comment.php`, commentData);
  }

  users = [
    {
      fullname: "Era Prima S",
      photoURL: "https://fastly.4sqi.net/img/general/600x600/ON050DZEKFLOAZXUM5IVV3QO1B5CBNKNLRF2FN1DEW5ZPMRT.jpg",
      username: "eraps",
      password: "123456",
    },
    {
      fullname: "Mr. Ahmad Miftah",
      photoURL: "https://www.pizzahut.co.id/assets/images/digital_menu/phr/menu/pasta-rice/salmon-aglio-olio.png",
      username: "ahmdmfth",
      password: "123456",
    }
  ]
  posts = [
    {
      imageUrl: 'https://cdn0-production-images-kly.akamaized.net/8vjiy9okikf9mJNpoeLSHmgjahQ=/1200x900/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4445096/original/069469700_1685341577-HL_rieztz.jpg',
      username: 'eraps',
      index: '0',
      like: [],
      title: 'asd',
      createdOn: '24 APR 2024 22:00',
      dateOfIncident: '23 APR 2024 22:00',
      instance: 'Polisi',
      comment: [{ username: 'eraps', comment: 'asd' }],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      imageUrl: 'https://stickerly.pstatic.net/sticker_pack/bkqed0koo6bKEgtGdsYlRg/LP6Y4H/31/db4ffd3b-ad01-427e-bcee-f5ac2076ca04.png',
      username: 'eraps',
      index: '1',
      like: ['eraps'],
      title: 'asd',
      createdOn: '24 APR 2024 15:20',
      dateOfIncident: '22 APR 2024 22:00',
      instance: 'Polisi',
      comment: [{ username: 'eraps', comment: 'asd' }],
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
  ];

  formatDateToString(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthIndex = date.getMonth();
    const month = monthNames[monthIndex];
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${day} ${month} ${year} ${hours}:${minutes}`;
  }

  selectedUser: any;

  userPosts: any[] = [];

  logout() {
    this.selectedUser = null;
    this.router.navigate(['/login']);
  }

  getPostsByUsername(username: string) {
    this.userPosts = this.posts.filter(post => post.username === username);
    return this.userPosts;
  }

  getUserAvatar(username: string): string {
    const user = this.users.find(user => user.username === username);
    return user ? user.photoURL : '';
  }

  toggleLike(postIndex: number, username: string) {
    if (postIndex >= 0 && postIndex < this.posts.length) {
      const post = this.posts[postIndex];
      const likedIndex = post.like.indexOf(username);
      if (likedIndex === -1) {
        post.like.push(username);
      } else {
        post.like.splice(likedIndex, 1);
      }
    } else {
      console.error(`Invalid post index: ${postIndex}`);
    }
  }

  // async login(username: string, password: string): Promise<boolean> {
  //   const user = this.users.find(user => user.username === username && user.password === password);
  //   if (user) {
  //     this.selectedUser = user;
  //     const toast = await this.toastController.create({
  //       message: 'Berhasil Login',
  //       duration: 3000
  //     });
  //     toast.present();
  //     this.router.navigate(['/dashboard']);
  //     return true;
  //   } else {
  //     const toast = await this.toastController.create({
  //       message: 'Username/Password tidak ditemukan',
  //       duration: 3000
  //     });
  //     toast.present();
  //     return false;
  //   }
  // }

  // async addUser(fullname: string, photoURL: string, password: string, username: string) {

  //   const existingUser = this.users.find(user => user.username === username);
  //   if (existingUser) {
  //     const toast = await this.toastController.create({
  //       message: 'Username sudah ada',
  //       duration: 3000
  //     });
  //     toast.present();
  //     return false;
  //   }

  //   this.users.push({ fullname: fullname, username: username, photoURL: photoURL, password: password });
  //   const toast = await this.toastController.create({
  //     message: 'User berhasil di register silahkan login',
  //     duration: 3000
  //   });
  //   toast.present();
  //   this.router.navigate(['/login']);
  //   return true;
  // }
}
