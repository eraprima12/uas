import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username = ''
  password = ''

  constructor(private usersService: UsersService, private router: Router, private toastController: ToastController) { }
  ngOnInit(): void {
    this.router.navigate(['/login']);
  }
}
