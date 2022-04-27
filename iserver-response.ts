export interface MapServiceInfo {
  viewBounds: ViewBounds;
  viewer: Viewer;
  distanceUnit: any;
  minVisibleTextSize: number;
  coordUnit: string;
  scale: number;
  description: string;
  paintBackground: boolean;
  maxVisibleTextSize: number;
  maxVisibleVertex: number;
  clipRegionEnabled: boolean;
  antialias: boolean;
  textOrientationFixed: boolean;
  angle: number;
  prjCoordSys: PrjCoordSys;
  minScale: number;
  markerAngleFixed: boolean;
  overlapDisplayedOptions: any;
  visibleScales: number[];
  dpi: number;
  visibleScalesEnabled: boolean;
  customEntireBoundsEnabled: boolean;
  clipRegion: any;
  maxScale: number;
  customParams: string;
  center: Center;
  dynamicPrjCoordSyses: DynamicPrjCoordSyse[];
  colorMode: any;
  textAngleFixed: boolean;
  overlapDisplayed: boolean;
  userToken: UserToken;
  cacheEnabled: boolean;
  dynamicProjection: boolean;
  autoAvoidEffectEnabled: boolean;
  customEntireBounds: any;
  name: string;
  bounds: Bounds;
  backgroundStyle: BackgroundStyle;
}

export interface ViewBounds {
  top: number;
  left: number;
  bottom: number;
  leftBottom: LeftBottom;
  right: number;
  rightTop: RightTop;
}

export interface LeftBottom {
  x: number;
  y: number;
}

export interface RightTop {
  x: number;
  y: number;
}

export interface Viewer {
  leftTop: LeftTop;
  top: number;
  left: number;
  bottom: number;
  rightBottom: RightBottom;
  width: number;
  right: number;
  height: number;
}

export interface LeftTop {
  x: number;
  y: number;
}

export interface RightBottom {
  x: number;
  y: number;
}

export interface PrjCoordSys {
  distanceUnit: string;
  projectionParam: any;
  epsgCode: number;
  coordUnit: string;
  name: string;
  projection: any;
  type: string;
  coordSystem: CoordSystem;
}

export interface CoordSystem {
  datum: Datum;
  unit: string;
  spatialRefType: string;
  name: string;
  type: string;
  primeMeridian: PrimeMeridian;
}

export interface Datum {
  name: string;
  type: string;
  spheroid: Spheroid;
}

export interface Spheroid {
  flatten: number;
  name: string;
  axis: number;
  type: string;
}

export interface PrimeMeridian {
  longitudeValue: number;
  name: string;
  type: string;
}

export interface Center {
  x: number;
  y: number;
}

export interface DynamicPrjCoordSyse {
  distanceUnit: string;
  projectionParam: any;
  epsgCode: number;
  coordUnit: string;
  name: string;
  projection: any;
  type: string;
  coordSystem: CoordSystem2;
}

export interface CoordSystem2 {
  datum: Datum2;
  unit: string;
  spatialRefType: string;
  name: string;
  type: string;
  primeMeridian: PrimeMeridian2;
}

export interface Datum2 {
  name: string;
  type: string;
  spheroid: Spheroid2;
}

export interface Spheroid2 {
  flatten: number;
  name: string;
  axis: number;
  type: string;
}

export interface PrimeMeridian2 {
  longitudeValue: number;
  name: string;
  type: string;
}

export interface UserToken {
  userID: string;
}

export interface Bounds {
  top: number;
  left: number;
  bottom: number;
  leftBottom: LeftBottom2;
  right: number;
  rightTop: RightTop2;
}

export interface LeftBottom2 {
  x: number;
  y: number;
}

export interface RightTop2 {
  x: number;
  y: number;
}

export interface BackgroundStyle {
  fillGradientOffsetRatioX: number;
  markerSize: number;
  fillForeColor: FillForeColor;
  fillGradientOffsetRatioY: number;
  markerWidth: number;
  markerAngle: number;
  fillSymbolID: number;
  lineColor: LineColor;
  markerSymbolID: number;
  lineWidth: number;
  markerHeight: number;
  fillOpaqueRate: number;
  fillBackOpaque: boolean;
  fillBackColor: FillBackColor;
  fillGradientMode: string;
  lineSymbolID: number;
  fillGradientAngle: number;
}

export interface FillForeColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface LineColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface FillBackColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}
