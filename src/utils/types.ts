export interface IBoundary {
    type: "MultiPolygon";
    coordinates: number[][][][];
  }
  
  export interface IDisplayUploadItem {
    id: number;
    boundary: IBoundary;
    meta: [];
    created_at: string;
    updated_at: string;
  }