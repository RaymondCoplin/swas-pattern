import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  vm$ = this.user.vm$;
  constructor(private user: UserService) {}

  ngOnInit() {}

  setLimit(limit: number) {
    this.user.setLimit(limit);
  }
}
