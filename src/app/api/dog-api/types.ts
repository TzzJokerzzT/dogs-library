export interface BreedListResponse {
  status: 'success' | 'error';
  message: {
    [breed: string]: string[];
  };
}

export interface BreedImageResponse {
  status: 'success' | 'error';
  message: string[];
}

export interface RandomImageResponse {
  status: 'success' | 'error';
  message: string;
}

export interface RandomImageResponseByQuantity {
  status: 'success' | 'error';
  message: string[];
}

export interface ApiErrorResponse {
  status: 'error';
  message: string;
  code: number;
}

export interface BreedWithSubbreeds {
  status: 'success' | 'error';
  message: string[];
}

export type SearchParams = {
  breed?: string;
  subbreed?: string;
  number?: number;
};
