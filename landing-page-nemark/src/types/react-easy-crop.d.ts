declare module 'react-easy-crop' {
  import * as React from 'react';

  export type Area = {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  export interface CropperProps {
    image: string;
    crop: { x: number; y: number };
    zoom: number;
    aspect?: number;
    onCropChange?: (crop: { x: number; y: number }) => void;
    onZoomChange?: (zoom: number) => void;
    onCropComplete?: (croppedArea: Area, croppedAreaPixels: Area) => void;
    // allow other props passed through
    [key: string]: unknown;
  }

  const Cropper: React.ComponentType<CropperProps>;
  export default Cropper;
}
