import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit {
  news: any;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews(): void {
    this.newsService.getAll().subscribe(
      (data) => {
        this.news = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.getAllNews();
  }
}
