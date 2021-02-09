import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  data: any;
  

  ngOnInit() {
  }

  news: {articleID: any, title: any, author: any, text: any}[] = [];

  type: string; // used to initialize tab to the view all page 

  constructor(private router: Router, public http: HttpClient) {

      this.getAllnews();
      this.type = 'all';
  }

  getAllnews() {
          
    var obj = {func: "get_all_articles"};

    this.http.post("http://recycle.hpc.tcnj.edu/php/news-handler.php", JSON.stringify(obj)).subscribe(data => {

        var result = data as any[];

        for(var i = 0; i < result.length; i++){
          // $articleID, $title, $author, $text
            this.news.push({articleID: result[i]["article_id"], title: result[i]["article_title"], author: result[i]["article_author"], text: result[i]["article_text"]});
        }

        // this.searchResults = this.news;
    });

  }

  ionViewWillEnter() {
    setTimeout(() => {
      // this.data = {
      //   'heading': 'Article Title',
      //   'para1': 'Lorem ipsum dolor sit amet, consectetur',
      //   'para2': 'date uploaded.'
      // };
      this.news;
      console.log(this.news);
    }, 5000);
  }

}
