import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public profilename: string;

  constructor(private router: Router) { }

  public routepage;

  ngOnInit() {

    this.routepage = this.router.url;

    // redirect to dashboard if home page
    if (this.routepage === '/') {
        this.router.navigate(['/dashboard']);
    }
    // set profile detail
    this.profilename = localStorage.getItem('profilename');

  }

}
