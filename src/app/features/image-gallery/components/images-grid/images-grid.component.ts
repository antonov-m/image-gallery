import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { ImagePreview } from '../../services/images.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.scss']
})
export class ImagesGridComponent implements OnInit {
  isLoading: boolean = true;
  isLoadingMore: boolean = false;
  hasMore: boolean = false;
  images: ImagePreview[] = [];

  constructor(
    private imagesService: ImagesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    document.body.style.backgroundColor = '#ffffff';
    this.imagesService.imagePreviewsObservable.subscribe(images => {
      this.images = images;
    })
    this.imagesService.getImages().subscribe(() => this.isLoading = false);
    this.imagesService.imagePreviewsHasMoreObservable.subscribe(hasMore => {
      this.hasMore = hasMore
    })
  }

  loadMore() {
    this.isLoadingMore = true;
    this.imagesService.getNextPageImages().subscribe(() => this.isLoadingMore = false);
  }

  openImage(id: string, index: number) {
    this.imagesService.getImageDetails(id).subscribe(() => {
      this.imagesService.currentIndex = index;
    })

    this.router.navigate([`/images/${this.images[index].id}`]);
  }
}
