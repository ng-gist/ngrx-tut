import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = '';
  constructor (private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
    });
  }
}
