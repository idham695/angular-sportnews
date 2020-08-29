import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent implements OnInit {
  news = {
    title: '',
    slug: '',
    description: '',
    image: '',
  };
  uploadImages;

  submitted = false;
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {}

  selectImage(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadImages = file;
    }
  }

  saveNews(): void {
    const formData = new FormData();
    formData.append('file', this.uploadImages);
    const data = {
      title: this.news.title,
      slug: this.news.slug,
      description: this.news.description,
      // image: formData.append('file', this.news.image),
      image: this.uploadImages,
    };

    this.newsService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newNews(): void {
    this.submitted = false;
    this.news = {
      title: '',
      slug: '',
      description: '',
      image: this.uploadImages,
    };
  }
}
