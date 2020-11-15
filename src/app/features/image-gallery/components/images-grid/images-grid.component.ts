import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { Image } from '../../services/images.types';

@Component({
  selector: 'app-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.scss']
})
export class ImagesGridComponent implements OnInit {
  imgData: any;
  isLoading: boolean = true;
  isLoadingMore: boolean = false;
  images: Image[] = [];

  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.imagesService.imagesObservable.subscribe(images => {
      this.images = images;
    })
    this.imagesService.getImages().subscribe(() => this.isLoading = false);
  }

  loadMore() {
    this.isLoadingMore = true;
    this.imagesService.getNextPageImages().subscribe(() => this.isLoadingMore = false);
  }

  ngOnDestroy() {
    console.log(this.images);
  }

  openImage(img:string) {

  }
}
