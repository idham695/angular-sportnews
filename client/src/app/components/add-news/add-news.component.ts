import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CategoriesService } from 'src/app/services/categories.service';

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
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent implements OnInit {
  categories: any;
  newsForm: FormGroup;
  image: File = null;
  title = '';
  slug = '';
  description = '';
  categoryId = '';

  submitted = false;
  constructor(
    private newsService: NewsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.newsForm = this.formBuilder.group({
      image: [null, Validators.required],
      title: [null, Validators.required],
      slug: [null, Validators.required],
      description: [null, Validators.required],
      categoryId: [null, Validators.required],
    });
    this.getAllCategrories();
  }

  getAllCategrories(): void {
    this.categoriesService.getAll().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveNews(): void {
    this.newsService
      .create(this.newsForm.value, this.newsForm.get('image').value._files[0])
      .subscribe(
        (response) => {
          this.submitted = true;
          this.router.navigate(['news']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
