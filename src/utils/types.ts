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
  
  export interface IStagePolygonResponse{
    "odata.count":number,
    value:IDisplayUploadItem[]

  }
  export interface IRoute{
    geometry:{
      coordinates:number[][]
      type:"LineString"
      properties:{}
    }
  }

  export interface IRouteDataResponse{
    routes:IRoute[]
  }
 