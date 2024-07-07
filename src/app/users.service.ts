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


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
