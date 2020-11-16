import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { Image } from '../../services/images.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images-view',
  templateUrl: './images-view.component.html',
  styleUrls: ['./images-view.component.scss']
})
export class ImagesViewComponent implements OnInit {

  image: Image | null = null;
  hashtags: string[] = [];

  constructor(
    private imageService: ImagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.image = this.imageService.currentImage;
    if (!this.image) {
      this.closeImage();
    } else {
      this.createHashtags(this.image);
      document.body.style.backgroundColor = '#000000';
      document.body.style.backgroundImage = this.image.url;
    }
  }

  closeImage() {
    this.router.navigate([`/images`]);
  }

  goToNextImage() {
    this.imageService.currentIndex++;
    this.image = this.imageService.currentImage;
    if (this.image) {
      this.router.navigate([`/images/${this.image.id}`]);
    }
  }

  goToPreviousImage() {
    this.imageService.currentIndex--;
    this.image = this.imageService.currentImage;
    if (this.image) {
      this.router.navigate([`/images/${this.image.id}`]);
    }
  }

  createHashtags(image: Image | null) {
    if (image) {
      this.hashtags = image.hashtags.map(tag => {
        let words = tag.split(" ");
        let hTag = "";
        for (let word of words) {
          hTag += (hTag === "" ? "#" : "_") + word;
        }
        return hTag;
      })
    }
  }

}
