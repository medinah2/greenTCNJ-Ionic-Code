import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  data: any;
  
  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.data = {
        'heading': 'Article Title',
        'para1': 'Lorem ipsum dolor sit amet, consectetur',
        'para2': 'date uploaded.'
      };
    }, 5000);
  }

}
