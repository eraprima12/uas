import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';;

@Component({
  selector: 'app-searchposts',
  templateUrl: './searchposts.page.html',
  styleUrls: ['./searchposts.page.scss'],
})
export class SearchpostsPage implements OnInit {
  searchTerm: string = '';
  filteredPosts: any[] = [];

  constructor(private userService: UsersService) { }
  ngOnInit(): void {
    this.loadUserPosts();
  }

  loadUserPosts() {
    this.userService.getReports(this.searchTerm).subscribe(
      (response) => {
        this.filteredPosts = response;
      },
      (error) => {
        console.error('Error fetching user posts', error);
      }
    );
  }


}
