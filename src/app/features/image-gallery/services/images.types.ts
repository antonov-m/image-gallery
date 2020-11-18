export interface ImagePreview {
  id: string;
  croppedPicture: string;
}

export interface ImagePreviewResponse {
  id: string;
  cropped_picture: string;
}

export interface GetImagesResponseData {
  hasMore: boolean;
  page: number;
  pageCount: number;
  pictures:ImagePreviewResponse[]
}

export interface GetImageDetailsResponseData {
  author: string;
  camera: string;
  cropped_picture: string;
  full_picture: string;
  id: string;
  tags: string;
}

export interface ImageDetails {
  author: string;
  camera: string;
  croppedPicture: string;
  fullPicture: string;
  id: string;
  tags: string;
}
