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

  selectImage(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.currentNews.image = file;
    }
  }

  updateNews(): void {
    this.newsService.update(this.currentNews.id, this.currentNews).subscribe(
      (response) => {
        console.log(response);
        this.message = 'Update news berhasil';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteNews(): void {
    this.newsService.delete(this.currentNews.id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
