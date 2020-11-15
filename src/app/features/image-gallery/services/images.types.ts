export interface Image {
  id: number;
  url: string;
  author: {
      name: string;
  }
  camera: {
      model: string;
  }
  hashtags: string[];
}

export type GetImagesResponseData = Image[]
