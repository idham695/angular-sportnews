import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css'],
})
export class UpdateNewsComponent implements OnInit {
  newsForm: FormGroup;
  image: File = null;
  title = '';
  slug = '';
  description = '';
  currentNews = null;
  submitted = false;
  message = '';
  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

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

  ngOnInit(): void {
    this.newsForm = this.formBuilder.group({
      image: [null, Validators.required],
      title: [null, Validators.required],
      slug: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.getNews(this.route.snapshot.paramMap.get('id'));
  }
  updateNews(): void {
    this.newsService
      .update(
        this.currentNews.id,
        this.newsForm.value,
        this.newsForm.get('image').value._files[0]
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['news']);
          this.submitted = true;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
