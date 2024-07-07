import { Component } from '@angular/core';

import { UsersService } from './users.service';;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private userService: UsersService) { }
  logout() {
    this.userService.logout()
  }
}
