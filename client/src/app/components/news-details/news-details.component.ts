import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
})
export class NewsDetailsComponent implements OnInit {
  currentNews = null;
  message = '';

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getNews(this.route.snapshot.paramMap.get('id'));
  }

  getNews(id): void {
    this.newsService.get(id).subscribe(
      (data) => {
        this.currentNews = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateNews(): void {
    this.router.navigate(['update/', this.currentNews.id]);
  }

  deleteNews(): void {
    this.newsService.delete(this.currentNews.id).subscribe(
      (response) => {
        this.router.navigate(['news']);
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
