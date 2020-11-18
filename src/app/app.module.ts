import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ImagesGridComponent } from './features/image-gallery/components/images-grid/images-grid.component';
import { ImagesViewComponent } from './features/image-gallery/components/images-view/images-view.component';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/interceptors';

const routes: Routes = [
  { path: 'images', component: ImagesGridComponent},
  { path: 'images/:id', component: ImagesViewComponent},
  { path: '**', redirectTo: '/images'},
];

@NgModule({
  declarations: [
    AppComponent,
    ImagesGridComponent,
    ImagesViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
