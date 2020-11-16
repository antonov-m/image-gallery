import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { Image } from '../../services/images.types';
import { Router } from '@angular/router';
import { MatGridList } from '@angular/material/grid-list';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.scss']
})
export class ImagesGridComponent implements OnInit {
  isLoading: boolean = true;
  isLoadingMore: boolean = false;
  images: Image[] = [];
  colsNumber: number = 5;

  @ViewChild('grid', { static: true }) grid: MatGridList | undefined;
  cols: Subject<any> = new Subject();

  constructor(
    private imagesService: ImagesService,
    private router: Router,
    private observableMedia: MediaObserver,
  ) { }

  ngOnInit(): void {
    this.imagesService.imagesObservable.subscribe(images => {
      this.images = images;
      this.resetColsNumber();
    })
    this.imagesService.getImages().subscribe(() => this.isLoading = false);
    window.addEventListener("resize", this.resetColsNumber);
    document.body.style.backgroundColor = '#ffffff';
  }

  loadMore() {
    this.isLoadingMore = true;
    this.imagesService.getNextPageImages().subscribe(() => this.isLoadingMore = false);
  }

  resetColsNumber() {
    let grid = document.getElementById("gridView");
    if (grid && grid.clientWidth) {
      this.colsNumber = Math.floor(grid.clientWidth / 250);
      return;
    }
    this.colsNumber = 5;
  }

  openImage(index: any) {
    this.imagesService.currentIndex = index;
    this.router.navigate([`/images/${this.images[index].id}`]);
  }
}
