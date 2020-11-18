import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { ImageDetails } from '../../services/images.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images-view',
  templateUrl: './images-view.component.html',
  styleUrls: ['./images-view.component.scss'],
})
export class ImagesViewComponent implements OnInit {

  image: ImageDetails | null = null;

  hashtags: string[] = [];
  isLoadingImage: boolean = true;

  constructor(
    private imageService: ImagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoadingImage = true;
    this.imageService.imageDetailsObservable.subscribe(image => {
      if (!image) return;
      this.isLoadingImage = false;
      this.image = image;
      this.hashtags = image.tags.split(' ')
    });
    if (this.imageService.currentIndex === -1) {
      this.closeImage();
    }
  }

  closeImage() {
    this.image = null;

    this.router.navigate([`/images`]);
  }

  goToNextImage() {
    this.imageService.currentIndex++;
    this.goToImage(this.imageService.currentIndex);
  }

  goToImage(index: number) {
    this.image = null;
    if (!this.imageService.currentImage) return;
    this.isLoadingImage = true;
    this.imageService.getImageDetails(this.imageService.currentImage.id).subscribe((data) => {
      this.imageService.currentIndex = index;
      this.isLoadingImage = false;
      this.router.navigate([`/images/${data.id}`]);
    })
  }

  goToPreviousImage() {
    this.imageService.currentIndex--;
    this.goToImage(this.imageService.currentIndex);
  }
}
