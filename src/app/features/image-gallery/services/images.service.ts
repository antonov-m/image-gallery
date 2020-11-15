import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
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

  constructor(private http: HttpClient) {}



  getImages() {
    // if (this.images.) return
    // add error handler
    return this.http.get<GetImagesResponseData>(this.imagesUrl, {
      params: {
        _page: '1'
      }
    }).pipe(
      map(
        newImages =>
          this.images.next([...this.images.value, ...newImages])
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
