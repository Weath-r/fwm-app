import type { SlabPoint } from "@/utils/geoToSlab";

export type DioramaCamera = {
    width: number;
    height: number;
    perspective: number;
    tiltDegrees: number;
    zoom: number;
    shiftX: number;
    shiftY: number;
};

export type ScreenPoint = {
    left: number;
    top: number;
    scale: number;
};

export const SLAB_ASPECT_RATIO = 980 / 1480;

const PERSPECTIVE_PER_PIXEL = 2600 / 820;
const RESTING_TILT_DEGREES = 32;
const FOCUSED_TILT_DEGREES = 40;
const FOCUSED_ZOOM = 1.55;

export const createCamera = (width: number, focus?: SlabPoint | null): DioramaCamera => {
    const height = width * SLAB_ASPECT_RATIO;
    return {
        width,
        height,
        perspective: width * PERSPECTIVE_PER_PIXEL,
        tiltDegrees: focus ? FOCUSED_TILT_DEGREES : RESTING_TILT_DEGREES,
        zoom: focus ? FOCUSED_ZOOM : 1,
        shiftX: focus ? (0.5 - focus.x) * width : 0,
        shiftY: focus ? (0.5 - focus.y) * height : 0,
    };
};

export const slabTransform = (camera: DioramaCamera): string =>
    `rotateX(${camera.tiltDegrees}deg) scale(${camera.zoom}) translate(${camera.shiftX}px, ${camera.shiftY}px)`;

export const projectToScreen = (point: SlabPoint, camera: DioramaCamera): ScreenPoint => {
    const theta = (camera.tiltDegrees * Math.PI) / 180;
    const planeX = camera.zoom * ((point.x - 0.5) * camera.width + camera.shiftX);
    const planeY = camera.zoom * ((point.y - 0.5) * camera.height + camera.shiftY);
    const depth = planeY * Math.sin(theta);
    const scale = camera.perspective / (camera.perspective - depth);
    return {
        left: camera.width / 2 + planeX * scale,
        top: camera.height / 2 + planeY * Math.cos(theta) * scale,
        scale,
    };
};
