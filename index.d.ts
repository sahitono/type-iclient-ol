declare module "@supermap/iclient-ol" {
  import type TileGrid from "ol/tilegrid";
  import Observable from "ol/Observable";
  import TileImage from "ol/source/TileImage";
  import type olFeature from "ol/Feature";
  import type {
    LineString as olLineString,
    Point as olPoint,
    Polygon as olPolygon,
  } from "ol/geom";
  import type { Extent } from "ol/extent";
  import olGeoJSON from "ol/format/GeoJSON";
  import type { Options as TileImageOptions } from "ol/source/TileImage";
  import type * as State from "ol/source/State";
  import ImageCanvasSource from "ol/source/ImageCanvas";
  import type { Map } from "ol";
  import type { ProjectionLike } from "ol/proj";

  export class SecurityManager {
    static registerKey(serviceUrl: string, key: string): void;
  }

  export class LonLat {
    constructor(lon?: number, lat?: number, location?: number[]);
    lon: number;
    lat: number;
    static fromArray(array: number[]): LonLat;
    static fromString(str: string): LonLat;
    add(lon: number, lat: number): LonLat;
    clone(): LonLat;
    destroy(): void;
    equals(ll: LonLat): boolean;
    toShortString(): string;
    toString(): string;
    wrapDateLine(maxExtent: Bounds): LonLat;
  }

  export class Size {
    constructor(w: number, h: number);
    w: number;
    h: number;
    clone(): Size;
    destroy(): void;
    equals(s: Size): boolean;
    toString(): string;
  }
  enum PixelMode {
    LeftTop = "lefttop",
    RightTop = "righttop",
    RightBottom = "rightbottom",
    LeftBottom = "leftbottom",
  }

  export namespace Pixel {
    export enum Mode {
      LeftTop = "lefttop",
      RightTop = "righttop",
      RightBottom = "rightbottom",
      LeftBottom = "leftbottom",
    }
  }

  export class Pixel {
    constructor(x: number, y: number, mode: Pixel.Mode);
    // static Mode: PixelMode;
    x: number;
    y: number;
    add(x: number, y: number): Pixel;
    clone(): Pixel;
    destroy(): void;
    distanceTo(px: Pixel): number;
    equals(p: Pixel): boolean;
    toString(): string;
  }

  export class Bounds {
    constructor(
      left?: number,
      bottom?: number,
      right?: number,
      top?: number,
      array?: number[]
    );
    left: number;
    bottom: number;
    right: number;
    top: number;
    array: number[];
    centerLonlat: LonLat;
    name: string;
    value: string;
    static fromArray(bbox: number[], reverseAxisOrder: boolean): Bounds;
    static fromSize(size: Size): Bounds;
    static fromString(str: string, reverseAxisOrder: boolean): Bounds;
    static oppositeQuadrant(quadrant: string): string;
    add(x: number, y: number): Bounds;
    clone(): Bounds;
    contains(x: number, y: number, inclusive: boolean): boolean;
    containsBounds(
      bounds: Bounds,
      partial: boolean,
      inclusive: boolean
    ): boolean;
    containsLonLat(
      ll: LonLat,
      options?: { inclusive?: boolean; woldBounds?: Bounds }
    ): boolean;
    containsPixel(p: Pixel): boolean;
    destroy(): void;
    determineQuadrant(lonlat: LonLat): string;
    equals(bounds: Bounds): boolean;
    extend(object: LonLat | Bounds): void;
  }

  class Geometry {
    bounds: Bounds;
    id: string;
    // eslint-disable-next-line no-use-before-define
    parent: Geometry;
    SRID: number;
    calculateBounds(): void;
    clearBounds(): void;
    clone(): Geometry;
    destroy(): void;
    extendBounds(newBounds: Bounds): Bounds;
    getArea(): number;
    getBounds(): Bounds;
    getVertices(nodes: boolean): number[];
    setBounds(bounds: Bounds): void;
  }
  export namespace Geometry {
    export class Point extends Geometry {
      constructor(x: number, y: number, id: string);
      x: number;
      y: number;
      tag: string;
      toShortString(): string;
    }
    export class Collection extends Geometry {
      constructor(components: Array<Geometry>);
      components: Array<Geometry>;
      componentTypes: string[];
      addComponent(component: Geometry, index: number): boolean;
      addComponents(components: Array<Geometry>): boolean;
      getComponentsString(): string;
      removeComponent(component: Geometry): boolean;
      removeComponents(components: Array<Geometry>): boolean;
    }

    export class MultiPoint extends Collection {
      constructor(components: Array<Point>);
      addPoint(point: Point, index: number): void;
      removePoint(point: Point): void;
    }

    export class Curve extends MultiPoint {
      constructor(components: Array<Point>);
    }

    export class LineString extends Curve {
      constructor(points: number[], id: string);
      static calculateCircle(points: Array<Point>): Array<Point>;
      static createLineEPS(points: Array<Point>): Array<Point>;
      getSortedSegments(): Array<Record<string, any>>;
    }

    export class LinearRing extends LineString {
      constructor(points: Array<Point>);
    }
    export class Polygon extends Collection {
      constructor(components: LinearRing);
    }

    export class GeoText extends Geometry {
      constructor(x: number, y: number, text: string);
      x: number;
      y: number;
      text: string;
      getCentroid(): Point;
      getLabelPxBoundsByLabel(
        locationPixel: Record<string, number>,
        labelWidth: string,
        labelHeight: string,
        style: Record<string, any>
      ): Bounds;

      getLabelPxBoundsByText(
        locationPixel: Record<string, number>,
        style: Record<string, any>
      ): Bounds;
      getLabelPxSize(style: Record<string, any>): Record<string, any>;
      getTextCount(text: string): Record<string, any>;
    }
    export class MultiLineString extends Collection {
      constructor(components: Array<LineString>);
    }
    export class MultiPolygon extends Collection {
      constructor(components: Array<Polygon>);
    }
    export class Rectangle extends Geometry {
      constructor(x: number, y: number, width: number, height: number);
      x: number;
      y: number;
      width: number;
      height: number;
    }
  }

  export class Layer {
    constructor(name: string, options: Record<string, any>);
  }

  class Feature {
    constructor(layer: Layer, lonlat: LonLat, data: Record<string, any>);
    data: Record<string, any>;
    id: string;
    layer: Layer;
    lonlat: LonLat;
  }
  export namespace Feature {
    export class Vector {
      constructor(
        geometry: Geometry,
        attributes: Record<string, any>,
        style: Record<string, any>
      );
      geometry: Geometry;
      attributesObject: Record<string, any>;
      style: Record<string, any>;
      fid: string;
      bounds: Bounds;
      id: string;
      lonlat: LonLat;
      state: string;
      url: string;
      toState(state: string): void;
    }
  }

  export enum JoinType {
    INNERJOIN = "INNERJOIN",
    LEFTJOIN = "LEFTJOIN",
  }

  interface JoinItemOptions {
    foreignTableName: string;
    joinFilter: string;
    JoinType: JoinType;
  }

  export enum EngineType {
    IMAGEPLUGINS = "IMAGEPLUGINS",
    OGC = "OGC",
    ORACLEPLUS = "ORACLEPLUS",
    SDBPLUS = "SDBPLUS",
    SQLPLUS = "SQLPLUS",
    UDB = "UDB",
  }

  interface DatasourceConnectionInfoOptions {
    alias: string;
    dataBase: string;
    connect?: boolean;
    driver?: string;
    engineType?: EngineType | string;
    exclusive?: string;
    OpenLinkTable?: boolean;
    password?: string;
    readOnly?: boolean;
    user?: string;
  }
  export class DatasourceConnectionInfo
    implements DatasourceConnectionInfoOptions
  {
    alias: string;
    dataBase: string;
    connect?: boolean;
    driver?: string;
    engineType?: EngineType | string;
    exclusive?: string;
    OpenLinkTable?: boolean;
    password?: string;
    readOnly?: boolean;
    user?: string;
    constructor(options: DatasourceConnectionInfoOptions);

    destroy(): void;
  }

  export class JoinItem {
    constructor(options: JoinItemOptions);
  }

  interface LinkItemOptions {
    datasourceConnectionInfo: DatasourceConnectionInfo;
    foreignKeys: string[];
    foreignTable: string[];
    linkFields: string[];
    linkFilter: string;
    name: string;
    primaryKeys: string[];
  }

  export class LinkItem implements LinkItemOptions {
    datasourceConnectionInfo: DatasourceConnectionInfo;
    foreignKeys: string[];
    foreignTable: string[];
    linkFields: string[];
    linkFilter: string;
    name: string;
    primaryKeys: string[];
    constructor(options: LinkItemOptions);
    destroy(): void;
  }

  interface FilterParameterOptions {
    attributeFilter?: string;
    name: string;
    joinItems?: JoinItem[];
    linkItems?: LinkItem[];
    ids?: Array<string>;
    orderBy?: string;
    groupBy?: string;
    fields?: Array<string>;
  }

  export class FilterParameter implements FilterParameterOptions {
    attributeFilter: string;
    name: string;
    joinItems?: JoinItem[];
    linkItems?: LinkItem[];
    ids?: Array<string>;
    orderBy?: string;
    groupBy?: string;
    fields?: Array<string>;
    constructor(options: FilterParameterOptions);
    destroy(): void;
  }

  interface TileSuperMapRestOptions extends TileImageOptions {
    url: string;
    serverType?: any;
    redirect?: boolean;
    transparent?: boolean;
    cacheEnabled?: boolean;
    prjCoordSys?: Record<string, number>;
    layersID?: string;
    clipRegionEnabled?: boolean;
    clipRegion?: Geometry;
    overlapDisplayedOptions?: any;
    tileversion?: string;
    tileProxy?: string;
    format?: string;
  }

  export class TileSuperMapRest extends TileImage {
    constructor(options: TileSuperMapRestOptions);
    static createTileGrid(
      extent: number,
      maxZoom: number,
      minZoom: number,
      tileSize: number,
      origin: number
    ): void;

    static optionsFromMapJSON(
      url: string,
      mapJSONObj: Record<string, any>
    ): void;
    changeTilesVersion(): void;
    createLayerUrl(): void;
    getALlRequestParams(): void;
    getFullRequestUrl(): void;
  }

  export enum QueryOption {
    ATTRIBUTE = "ATTRIBUTE",
    ATTRIBUTEANDGEOMETRY = "ATTRIBUTEANDGEOMETRY",
    GEOMETRY = "GEOMETRY",
  }
  export enum GeometryType {
    LINE = "LINE",
    LINEM = "LINEM",
    POINT = "POINT",
    REGION = "REGION",
    POINTEPS = "POINTEPS",
    LINEEPS = "LINEEPS",
    REGIONEPS = "REGIONEPS",
    ELLIPSE = "ELLIPSE",
    CIRCLE = "CIRCLE",
    TEXT = "TEXT",
    RECTANGLE = "RECTANGLE",
    UNKNOWN = "UNKNOWN",
  }

  export enum SpatialQueryMode {
    CONTAIN = "CONTAIN",
    CROSS = "CROSS",
    DISJOINT = "DISJOINT",
    INTERSECT = "INTERSECT",
    NONE = "NONE",
    OVERLAP = "OVERLAP",
    TOUCH = "TOUCH",
    WITHIN = "WITHIN",
  }

  export enum ServerType {
    ISERVER = "ISERVER",
    IPORTAL = "IPORTAL",
    ONLINE = "ONLINE",
  }

  interface ServiceBaseOptions {
    proxy?: string;
    serverType?: ServerType;
    withCredentials?: boolean;
    crossOrigin?: boolean;
    headers?: Record<string, any>;
  }

  export class ServiceBase extends Observable {
    constructor(url: string, options?: ServiceBaseOptions);
  }

  interface QueryParametersOption {
    queryParams: Array<FilterParameter>;
    customParams?: string;
    queryOption?: QueryOption;
    prjCoordSys?: Record<string, any>;
    expectCount?: number;
    networkType?: GeometryType;
    returnCustomResult?: boolean;
    startRecord?: number;
    holdTime?: number;
    returnFeatureWithFieldCaption?: boolean;
  }

  export class QueryParameters {
    constructor(options: QueryParametersOption);
    queryParams: Array<FilterParameter>;
    customParams?: string;
    queryOption?: QueryOption;
    prjCoordSys?: Record<string, any>;
    expectCount?: number;
    networkType?: GeometryType;
    returnCustomResult?: boolean;
    startRecord?: number;
    holdTime?: number;
    returnFeatureWithFieldCaption?: boolean;
    destroy(): void;
  }

  interface QueryByGeometryParametersOptions extends QueryParametersOption {
    geometry: Record<string, any>;
    returnContent?: boolean;
  }
  export class QueryByGeometryParameters extends QueryParameters {
    constructor(
      options: QueryByGeometryParametersOptions,
      spatialQueryMode?: SpatialQueryMode
    );
    geometry: Record<string, any>;
    returnContent?: boolean;
    SpatialQueryMode?: SpatialQueryMode;
  }

  interface QueryByBoundsParametersOptions extends QueryParametersOption {
    bounds: Bounds | Extent;
    returnContent?: boolean;
  }

  export class QueryByBoundsParameters extends QueryParameters {
    constructor(options: QueryByBoundsParametersOptions);
    bounds: Bounds | Extent;
    returnContent?: boolean;
  }

  export interface QueryByDistanceParametersOptions
    extends QueryParametersOption {
    geometry: Record<string, any>;
    distance?: number;
    isNearest?: boolean;
  }
  export class QueryByDistanceParameters extends QueryParameters {
    constructor(options: QueryByDistanceParametersOptions);
    geometry: Record<string, any>;
    distance?: number;
    isNearest?: boolean;
  }

  export interface QueryBySQLParametersOptions extends QueryParametersOption {
    queryParams: Array<FilterParameter>;
  }
  export class QueryBySQLParameters extends QueryParameters {
    constructor(options: QueryBySQLParametersOptions);
    queryParams: Array<FilterParameter>;
  }

  export enum DataFormat {
    GEOJSON = "GEOJSON",
    ISERVER = "ISERVER",
  }

  export interface serviceResult {
    result?: {
      featureCount: number;
      featureUriList: string[];
      features: GeoJSON.FeatureCollection;
      succeed: boolean;
      totalCount: number;
    };
    object: Record<string, any>;
    error?: Record<string, any>;
    type: string;
    element: Record<string, any>;
  }
  export function RequestCallback(serviceResult: serviceResult): void;

  export interface queryServiceResult {
    type: string;
    element?: any;
    error?: {
      code: number;
      errorMsg: string;
    };
    object?: Record<string, any>;
    result?: {
      currentCount: number;
      customResponse?: Record<string, any>;
      recordsets: Array<{
        datasetName: string;
        features: GeoJSON.FeatureCollection;
        fieldCaptions: string[];
        fieldTypers: string[];
        fields: string[];
      }>;
      succeed: boolean;
      totalCount?: number;
    };
  }

  type QueryServiceCallback = (result: queryServiceResult) => void;
  export class QueryService extends ServiceBase {
    queryByBounds(
      params: QueryByBoundsParameters,
      callback: QueryServiceCallback,
      resultFormat?: DataFormat
    ): void;

    queryByDistance(
      params: QueryByDistanceParameters,
      callback: QueryServiceCallback,
      resultFormat?: DataFormat
    ): void;

    queryByGeometry(
      params: QueryByGeometryParameters,
      callback: QueryServiceCallback,
      resultFormat?: DataFormat
    ): void;

    queryBySQL(
      params: QueryBySQLParameters,
      callback: QueryServiceCallback,
      resultFormat?: DataFormat
    ): void;

    destroy(): void;
  }

  export interface GetFeaturesParametersBaseOptions {
    datasetNames: string[];
    hasGeometry?: boolean;
    returnContent?: boolean;
    fromIndex?: number;
    toIndex?: number;
    maxFeatures?: number;
  }
  export class GetFeaturesParametersBase {
    constructor(options: GetFeaturesParametersBaseOptions);
    datasetNames: string[];
    returnContent: boolean;
    fromIndex: number;
    toIndex: number;
    aggregations: Record<string, any>;
    returnCountOnly: boolean;
    maxFeatures: number;
    destroy(): void;
  }

  export interface GetFeaturesBySQLParametersOptions
    extends GetFeaturesParametersBaseOptions {
    queryParameter: FilterParameter;
  }
  export class GetFeaturesBySQLParameters {
    constructor(options: GetFeaturesBySQLParametersOptions);
  }

  export enum EditType {
    ADD = "ADD",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
  }
  export interface EditFeaturesParametersOptions {
    features:
      | Array<Record<string, any>>
      | Array<olFeature<any>>
      | Array<Feature.Vector>;
    dataSetName: string;
    dataSourceName: string;
    returnContent?: boolean;
    editType?: EditType;
    IDs?: Array<string | number>;
  }
  export class EditFeaturesParameters {
    constructor(options: EditFeaturesParametersOptions);
    dataSetName: string;
    dataSourceName: string;
    editType: EditType;
    features:
      | Array<Record<string, any>>
      | Array<olFeature<any>>
      | Array<Feature.Vector>;
    IDs: Array<string | number>;
    isUseBatch: boolean;
    returnContent: boolean;
    destroy(): void;
    toJsonParameters(params: EditFeaturesParameters): Record<string, any>;
  }

  export class FeatureService extends ServiceBase {
    getFeaturesBySQL(
      params: GetFeaturesBySQLParameters,
      callback: typeof RequestCallback,
      resultFormat?: DataFormat
    ): void;

    editFeatures(
      params: EditFeaturesParameters,
      callback: typeof RequestCallback
    ): void;
  }

  export class Util {
    static toGeoJSON(smObj: Record<string, any>): GeoJSON.FeatureCollection;
  }

  export enum DataReturnMode {
    DATASET_AND_RECORDSET = "DATASET_AND_RECORDSET",
    DATASET_ONLY = "DATASET_ONLY",
    RECORDSET_ONLY = "RECORDSET_ONLY",
  }
  export interface DataReturnOptionOptions {
    expectCount?: number;
    dataset?: string;
    dataReturnMode?: DataReturnMode;
    deleteExistResultDataset?: boolean;
  }
  export class DataReturnOption {
    constructor(options: DataReturnOptionOptions);
    destroy(): void;
  }

  export enum OverlayOperationType {
    CLIP = "CLIP",
    ERASE = "ERASE",
    INTERSECT = "INTERSECT",
    UNION = "UNION",
    IDENTITY = "IDENTITY",
    UPDATE = "UPDATE",
    XOR = "XOR",
  }
  export interface DatasetOverlayAnalystParametersOptions {
    operateDataset?: string;
    sourceDataset: string;
    operateDatasetFields?: string[];
    operateDatasetFilter?: FilterParameter;
    operateRegions?: Array<Geometry.Polygon | olPolygon>;
    sourceDatasetFields?: string[];
    sourceDatasetFilter?: FilterParameter;
    tolerance?: number;
    operation?: OverlayOperationType;
    resultSetting?: DataReturnOption;
    toIndex?: number;
    fromIndex?: number;
    expectCount?: number;
  }
  export class DatasetOverlayAnalystParameters extends GetFeaturesParametersBase {
    constructor(options: DatasetOverlayAnalystParametersOptions);
    toObject(
      datasetOverlayAnalystParameters: DatasetOverlayAnalystParameters,
      tempObj: DatasetOverlayAnalystParameters
    ): void;
  }

  export class OverlayAnalystParameters {
    constructor(options: Record<string, any>);
    operation: OverlayOperationType;
  }

  export interface GeometryOverlayAnalystParametersOptions {
    operateGeometry:
      | Geometry.Point
      | Geometry.LineString
      | Geometry.Polygon
      | olPoint
      | olLineString
      | olPolygon;

    sourceGeometry:
      | Geometry.Point
      | Geometry.LineString
      | Geometry.Polygon
      | olPoint
      | olLineString
      | olPolygon;

    operateGeometries?: Array<
      | Geometry.Point
      | Geometry.LineString
      | Geometry.Polygon
      | olPoint
      | olLineString
      | olPolygon
    >;

    sourceGeometries?: Array<
      | Geometry.Point
      | Geometry.LineString
      | Geometry.Polygon
      | olPoint
      | olLineString
      | olPolygon
    >;

    operation?: OverlayOperationType;
  }
  export class GeometryOverlayAnalystParameters extends OverlayAnalystParameters {
    constructor(options: GeometryOverlayAnalystParametersOptions);
    toObject(
      datasetOverlayAnalystParameters: DatasetOverlayAnalystParameters,
      tempObj: DatasetOverlayAnalystParameters
    ): void;
  }

  export interface spatialAnalystResult {
    result?: {
      dataset?: string;
      image?: any;
      message?: string;
      recordset?: {
        datasetName?: string;
        features: GeoJSON.FeatureCollection;
        fieldTypes: string[];
        fields: string[];
        fieldCaptions: string[];
      };
      resultGeometry?: GeoJSON.Feature<GeoJSON.MultiPolygon>;
      succeed: boolean;
    };
    object: Record<string, any>;
    error?: Record<string, any>;
    type: string;
    element?: any;
  }
  export function SpatialAnalystCallback(
    serviceResult: spatialAnalystResult
  ): void;

  export enum BufferEndType {
    FLAT = "FLAT",
    ROUND = "ROUND",
  }

  export interface BufferDistanceOptions {
    exp?: string;
    value?: number;
  }

  export class BufferDistance implements BufferDistanceOptions {
    constructor(options: BufferDistanceOptions);
    exp?: string;
    value?: number;
  }

  export enum BufferRadiusUnit {
    CENTIMETER = "CENTIMETER",
    DECIMETER = "DECIMETER",
    FOOT = "FOOT",
    INCH = "INCH",
    KILOMETER = "KILOMETER",
    METER = "METER",
    MILE = "MILE",
    MILLIMETER = "MILLIMETER",
    YARD = "YARD",
  }

  export interface BufferSettingOptions {
    endType?: BufferEndType;
    leftDistance?: BufferDistance;
    rightDistance?: BufferDistance;
    semicircleLineSegment?: number;
    radiusUnit?: BufferRadiusUnit;
  }
  export class BufferSetting implements BufferSettingOptions {
    constructor(options: Record<string, any>);
    endType: BufferEndType;
    leftDistance: BufferDistance;
    rightDistance: BufferDistance;
    radiusUnit: BufferRadiusUnit;
    semicircleLineSegment: number;
  }
  export class BufferAnalystParameters {
    constructor(options: { bufferSetting: BufferSetting });
    bufferSetting: BufferSetting;
  }
  export interface DatasetBufferAnalystParametersOptions {
    dataset: string;
    filterQueryParameter?: FilterParameter;
    resultSetting?: DataReturnOption;
    isAttributeRetained?: boolean;
    isUnion?: boolean;
    bufferSetting?: BufferSetting;
  }
  export class DatasetBufferAnalystParameters extends BufferAnalystParameters {
    constructor(options: DatasetBufferAnalystParametersOptions);
    dataset: string;
    filterQueryParameter?: FilterParameter;
    resultSetting?: DataReturnOption;
    isAttributeRetained: boolean;
    isUnion: boolean;
    bufferSetting: BufferSetting;
    toObject(
      datasetBufferAnalystParameters: DatasetBufferAnalystParameters,
      tempObj: DatasetBufferAnalystParameters
    ): Record<string, any>;
  }

  export class GeometryBufferAnalystParameters extends BufferAnalystParameters {
    constructor(options: {
      sourceGeometry: Geometry | olPolygon | olPoint | olLineString | olGeoJSON;
      bufferSetting: BufferSetting;
    });
    sourceGeometry: Geometry | olPolygon | olPoint | olLineString | olGeoJSON;
    bufferSetting: BufferSetting;
    sourceGeometrySRID: number;
    toObject(
      geometryBufferAnalystParameters: GeometryBufferAnalystParameters,
      tempObj: GeometryBufferAnalystParameters
    ): Record<string, any>;
  }

  export enum PixelFormat {
    BIT16 = "BIT16",
    BIT32 = "BIT32",
    BIT64 = "BIT64",
    SINGLE = "SINGLE",
    DOUBLE = "DOUBLE",
    UBIT1 = "UBIT1",
    UBIT4 = "UBIT4",
    UBIT8 = "UBIT8",
    UBIT24 = "UBIT24",
    UBIT32 = "UBIT32",
  }

  export enum SearchMode {
    KDTREE_FIXED_COUNT = "KDTREE_FIXED_COUNT",
    KDTREE_FIXED_RADIUS = "KDTREE_FIXED_RADIUS",
    NONE = "NONE",
    QUADTREE = "QUADTREE",
  }

  export interface interpolationRBFAnalystParametersOptions {
    bounds: Bounds | Extent;
    searchMode: SearchMode;
    outputDatasetName: string;
    outputDatasourceName: string;
    zValueFieldName?: string;
    smooth?: number;
    tension?: number;
    expectedCount?: number;
    searchRadius?: number;
    maxPointCountForInterpolation?: number;
    maxPointCountInNode?: number;
    zValueScale?: number;
    resolution?: number;
    filterQueryParameter?: FilterParameter;
    pixelFormat?: PixelFormat;
    dataset?: string;
    inputPoints?: Array<Geometry.Point | olPoint>;
  }

  export class interpolationRBFAnalystParameters {
    constructor(options: interpolationRBFAnalystParametersOptions);

    bounds: Bounds | Extent;
    clipParam: Record<string, any>;
    dataset?: string;
    expectedCount: number;
    filterQueryParameter?: FilterParameter;
    interpolationAnalystType: string;
    maxPointCountForInterpolationnumber: number;
    maxPointCountInNode: number;
    outputDatasetName?: string;
    outputDatasourceName?: string;
    pixelFormat: PixelFormat;
    resolution: number;
    searchMode: SearchMode;
    searchRadius: number;
    smooth: number;
    tension: number;
    zValueFieldName: string;
    zValueScale: number;
  }

  export enum SmoothMethod {
    BSPLINE = "BSPLINE",
    POLISH = "POLISH",
  }

  export interface SurfaceAnalystParametersSettingOptions {
    clipRegion?: Geometry.Polygon | olPolygon;
    datumValue?: number;
    expectedZValues: number[];
    interval?: number;
    resampleTOlerance?: number;
    smoothMethod?: SmoothMethod;
    smoothness?: number;
  }
  export class SurfaceAnalystParametersSetting {
    constructor(options: SurfaceAnalystParametersSettingOptions);
    clipRegion?: Geometry.Polygon | olPolygon;
    datumValue?: number;
    expectedZValues: number[];
    interval?: number;
    resampleTOlerance?: number;
    smoothMethod?: SmoothMethod;
    smoothness?: number;
  }
  export enum SurfaceAnalystMethod {
    ISOLINE = "ISOLINE",
    ISOREGION = "ISOREGION",
  }

  export interface SurfaceAnalystParametersOptions {
    extractParameter: SurfaceAnalystParametersSetting;
    resolution: number;
    resultSetting: DataReturnOption;
    surfaceAnalystMethod?: SurfaceAnalystMethod;
  }

  export class SurfaceAnalystParameters {
    constructor(options: SurfaceAnalystParametersOptions);
    extractParameter: SurfaceAnalystParametersSetting;
    resolution: number;
    resultSetting: DataReturnOption;
    surfaceAnalystMethod?: SurfaceAnalystMethod;
  }

  export interface DensityKernelAnalystParametersOptions {
    dataset: string;
    fieldName: string;
    resultGridName: string;
    bounds?: Bounds | Extent;
    searchRadius?: number;
    resultGridDatasetResolution?: number;
    targetDatasource?: string;
    deleteExistResultDataset?: boolean;
  }
  export class DensityKernelAnalystParameters {
    constructor(options: DensityKernelAnalystParametersOptions);
    dataset: string;
    fieldName: string;
    resultGridName: string;
    bounds?: Bounds | Extent;
    searchRadius?: number;
    resultGridDatasetResolution?: number;
    targetDatasource?: string;
    deleteExistResultDataset?: boolean;
  }

  export interface GenerateSpatialDataParametersOptions {
    routeTable: string;
    routeIDField: string;
    dataReturnOption: DataReturnMode;
    attributeFilter?: string;
    eventTable: string;
    eventRouteIDField: string;
    measureField?: string;
    measureStartField?: string;
    measureEndField?: string;
    errorInfoField?: string;
    retained?: string[];
  }
  export class GenerateSpatialDataParameters {
    constructor(options: GenerateSpatialDataParametersOptions);
    routeTable: string;
    routeIDField: string;
    dataReturnOption: DataReturnMode;
    attributeFilter?: string;
    eventTable: string;
    eventRouteIDField: string;
    measureField?: string;
    measureStartField?: string;
    measureEndField?: string;
    errorInfoField?: string;
    retained?: string[];
  }

  export enum SpatialRelationType {
    CONTAIN = "CONTAIN",
    INTERSECT = "INTERSECT",
    WITHIN = "WITHIN",
  }

  export interface GeoRelationAnalystParametersOptions {
    sourceFilter: FilterParameter;
    referenceFilter: FilterParameter;
    spatialRelationType: SpatialRelationType;
    isBorderInside?: boolean;
    returnFeature?: boolean;
    returnGeoRelatedOnly?: boolean;
    startRecord?: number;
    expectCount?: number;
  }
  export class GeoRelationAnalystParameters {
    constructor(options: GeoRelationAnalystParametersOptions);
    sourceFilter: FilterParameter;
    referenceFilter: FilterParameter;
    spatialRelationType: SpatialRelationType;
    isBorderInside?: boolean;
    returnFeature?: boolean;
    returnGeoRelatedOnly?: boolean;
    startRecord?: number;
    expectCount?: number;
  }

  export class SpatialAnalystService extends ServiceBase {
    overlayAnalysis(
      params:
        | DatasetOverlayAnalystParameters
        | GeometryOverlayAnalystParameters,
      callback: typeof SpatialAnalystCallback,
      resultFormat?: DataFormat
    ): void;

    bufferAnalysis(
      params: DatasetBufferAnalystParameters | GeometryBufferAnalystParameters,
      callback: typeof SpatialAnalystCallback,
      resultFormat?: DataFormat
    ): void;

    densityAnalysis(
      params: DensityKernelAnalystParameters,
      callback: typeof SpatialAnalystCallback,
      resultFormat?: DataFormat
    ): void;

    generateSpatialData(
      params: GenerateSpatialDataParameters,
      callback: typeof SpatialAnalystCallback,
      resultFormat?: DataFormat
    ): void;

    geometrybatchAnalysis(
      params: Array<{
        analystName: string;
        param:
          | GeometryOverlayAnalystParameters
          | GeometryBufferAnalystParameters
          | interpolationRBFAnalystParameters;
      }>,
      callback: typeof RequestCallback,
      resultFormat?: DataFormat
    ): void;

    geoRelationAnalysis(
      params: GeoRelationAnalystParameters,
      callback: typeof RequestCallback,
      resultFormat?: DataFormat
    ): void;

    interpolationAnalysis(
      params: interpolationRBFAnalystParameters,
      callback: typeof RequestCallback,
      resultFormat?: DataFormat
    ): void;

    surfaceAnalysis(
      params: SurfaceAnalystParameters,
      callback: typeof RequestCallback,
      resultFormat?: DataFormat
    ): void;
  }

  export interface MapvOptions {
    map: Map;
    dataSet: any;
    mapvOptions: Record<string, any>;
    attributions?: string;
    state?: string | any;
    projection?: ProjectionLike;
    resolutions?: number[];
  }

  export class Mapv extends ImageCanvasSource {
    constructor(options: MapvOptions);

    addData(data: Record<string, any>, options: Record<string, any>): void;
    clearData(): void;
    getData(): Record<string, any>;
    removeData(filter: (data: Record<string, any>) => boolean): void;
    setData(): void;
    update(options: Record<string, any>): void;
  }
}
