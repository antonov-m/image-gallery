import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { GetImagesResponseData, Image } from './images.types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private images = new BehaviorSubject<Image[]>([]);
  public imagesObservable = this.images.asObservable();
  imagesUrl = `${environment.apiUrl}/images`;
  page: number = 1;
  private _currentIndex: number = -1;

  constructor(private http: HttpClient) { }

  set currentIndex(index) {
    if (index < 0) {
      index += this.images.value.length;
    }
    this._currentIndex = index % this.images.value.length;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  get currentImage() {
    if (this._currentIndex >= 0) {
      return this.images.value[this._currentIndex];
    } else {
      return null;
    }
  }

  getImages() {
    // add error handler
    return this.http.get<GetImagesResponseData>(this.imagesUrl, {
      params: {
        _page: '1'
      }
    }).pipe(
      map(
        newImages => {
          if (this.images.value.length > 0) {
            this.images.next([...this.images.value]);
          } else {
            this.images.next([...this.images.value, ...newImages])
          }
        }
      )
    );
  }

  getNextPageImages() {
    this.page++;
    return this.http.get<GetImagesResponseData>(this.imagesUrl, {
      params: {
        _page: String(this.page)
      }
    }).pipe(
      map(
        newImages =>
          this.images.next([...this.images.value, ...newImages])
      )
    );
  }
}
