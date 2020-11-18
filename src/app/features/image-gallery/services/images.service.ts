import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { GetImageDetailsResponseData, GetImagesResponseData, ImagePreview, ImageDetails } from './images.types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private imagePreviews = new BehaviorSubject<ImagePreview[]>([]);
  public imagePreviewsObservable = this.imagePreviews.asObservable();

  private imagePreviewsHasMore = new BehaviorSubject<boolean>(false);
  public imagePreviewsHasMoreObservable = this.imagePreviewsHasMore.asObservable();

  private imageDetails = new BehaviorSubject<ImageDetails | null>(null);
  public imageDetailsObservable = this.imageDetails.asObservable();

  imagesUrl = `${environment.apiUrl}/images`;

  page: number = 1;

  private _currentIndex: number = -1;

  constructor(private http: HttpClient) { }

  private getImageDetailsUrl(id: string) {
    return `${environment.apiUrl}/images/${id}`
  }

  set currentIndex(index) {
    if (index < 0) {
      index += this.imagePreviews.value.length;
    }
    this._currentIndex = index % this.imagePreviews.value.length;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  get currentImage() {
    if (this._currentIndex >= 0) {
      return this.imagePreviews.value[this._currentIndex];
    } else {
      return null;
    }
  }

  getImages() {
    if (this.imagePreviews.value.length) return from([]);
    // add error handler
    return this.http.get<GetImagesResponseData>(this.imagesUrl, {
      params: {
        page: '1'
      }
    }).pipe(map(response => this.processNewImages(response)));
  }

  getNextPageImages() {
    this.page++;
    return this.http.get<GetImagesResponseData>(this.imagesUrl, {
      params: {
        page: String(this.page)
      }
    }).pipe(map(response => this.processNewImages(response)));
  }

  private processNewImages({ pictures: images, hasMore }: GetImagesResponseData) {
    const newImages = images.map((image) => ({
      ...image,
      croppedPicture: image['cropped_picture']
    }))
    this.imagePreviews.value.length
      ? this.imagePreviews.next([...this.imagePreviews.value, ...newImages])
      : this.imagePreviews.next([...newImages])

    this.imagePreviewsHasMore.next(hasMore)
  }

  getImageDetails(id: string) {
    return this.http.get<GetImageDetailsResponseData>(this.getImageDetailsUrl(id)).pipe(map(response => {
      const data: ImageDetails = {
        ...response,
        croppedPicture: response['cropped_picture'],
        fullPicture: response['full_picture']
      }
      this.imageDetails.next(data)
      return data
    }))
  }
}
