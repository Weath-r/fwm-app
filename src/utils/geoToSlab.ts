export type SlabPoint = {
    x: number;
    y: number;
};

const GEO_TO_SLAB = {
    x: [0.548068, -0.01439, -11.361634],
    y: [0.008425, -1.194164, 46.745155],
} as const;

const SLAB_WIDTH = 1480;
const SLAB_HEIGHT = 980;
const SNAP_MARGIN_PIXELS = 18;

export const SLAB_OUTLINE: [number, number][] = [
    [0.973, 0.9254],
    [0.8839, 0.9541],
    [0.8251, 0.894],
    [0.8232, 0.8539],
    [0.7834, 0.8625],
    [0.7644, 0.9111],
    [0.7152, 0.8796],
    [0.6678, 0.8968],
    [0.6564, 0.8481],
    [0.6242, 0.8424],
    [0.5218, 0.9426],
    [0.482, 0.8768],
    [0.463, 0.7565],
    [0.4384, 0.7737],
    [0.3929, 0.6792],
    [0.319, 0.6964],
    [0.3133, 0.5933],
    [0.2147, 0.705],
    [0.0991, 0.622],
    [0.0574, 0.5275],
    [0.063, 0.4702],
    [0.027, 0.4244],
    [0.0839, 0.2928],
    [0.1029, 0.3357],
    [0.137, 0.33],
    [0.1806, 0.2383],
    [0.2337, 0.2183],
    [0.2261, 0.1725],
    [0.2962, 0.0408],
    [0.3133, 0.0866],
    [0.3701, 0.0923],
    [0.4043, 0.1983],
    [0.4403, 0.2097],
    [0.4365, 0.3099],
    [0.5408, 0.3013],
    [0.5976, 0.3672],
    [0.664, 0.3614],
    [0.7, 0.4015],
    [0.7531, 0.3614],
    [0.7379, 0.4302],
    [0.6564, 0.4502],
    [0.6412, 0.496],
    [0.5957, 0.5189],
    [0.5028, 0.4702],
    [0.4649, 0.5103],
    [0.4611, 0.5361],
    [0.4877, 0.5246],
    [0.4725, 0.5647],
    [0.5578, 0.5418],
    [0.6052, 0.6306],
    [0.7626, 0.6535],
    [0.7948, 0.788],
    [0.8175, 0.7852],
    [0.8061, 0.8081],
    [0.8573, 0.7823],
    [0.8573, 0.7451],
    [0.9332, 0.788],
    [0.9502, 0.8338],
    [0.918, 0.8768],
];

export const geoToSlab = ([longitude, latitude]: [number, number]): SlabPoint => ({
    x: GEO_TO_SLAB.x[0] * longitude + GEO_TO_SLAB.x[1] * latitude + GEO_TO_SLAB.x[2],
    y: GEO_TO_SLAB.y[0] * longitude + GEO_TO_SLAB.y[1] * latitude + GEO_TO_SLAB.y[2],
});

export const nudgeSlabPoint = (
    point: SlabPoint,
    nudge?: { right: number; down: number }
): SlabPoint =>
    nudge
        ? { x: point.x + nudge.right / SLAB_WIDTH, y: point.y + nudge.down / SLAB_HEIGHT }
        : point;

const toPixels = ([x, y]: [number, number]): [number, number] => [x * SLAB_WIDTH, y * SLAB_HEIGHT];

const OUTLINE_PIXELS = SLAB_OUTLINE.map(toPixels);

export const isInsideOutline = (point: SlabPoint): boolean => {
    const [x, y] = toPixels([point.x, point.y]);
    let inside = false;
    OUTLINE_PIXELS.forEach(([startX, startY], index) => {
        const [endX, endY] = OUTLINE_PIXELS[(index + 1) % OUTLINE_PIXELS.length];
        if (
            startY > y !== endY > y &&
            x < ((endX - startX) * (y - startY)) / (endY - startY) + startX
        ) {
            inside = !inside;
        }
    });
    return inside;
};

const nearestOnOutline = ([x, y]: [number, number]): [number, number] => {
    let nearest: [number, number] = OUTLINE_PIXELS[0];
    let nearestDistance = Number.POSITIVE_INFINITY;
    OUTLINE_PIXELS.forEach(([startX, startY], index) => {
        const [endX, endY] = OUTLINE_PIXELS[(index + 1) % OUTLINE_PIXELS.length];
        const edgeX = endX - startX;
        const edgeY = endY - startY;
        const along = Math.max(
            0,
            Math.min(
                1,
                ((x - startX) * edgeX + (y - startY) * edgeY) / (edgeX * edgeX + edgeY * edgeY)
            )
        );
        const candidate: [number, number] = [startX + along * edgeX, startY + along * edgeY];
        const distance = Math.hypot(candidate[0] - x, candidate[1] - y);
        if (distance < nearestDistance) {
            nearest = candidate;
            nearestDistance = distance;
        }
    });
    return nearest;
};

export const snapInsideOutline = (point: SlabPoint): SlabPoint => {
    if (isInsideOutline(point)) {
        return point;
    }
    const [x, y] = toPixels([point.x, point.y]);
    const [edgeX, edgeY] = nearestOnOutline([x, y]);
    const length = Math.hypot(edgeX - x, edgeY - y) || 1;
    for (
        let margin = SNAP_MARGIN_PIXELS;
        margin <= SNAP_MARGIN_PIXELS * 4;
        margin += SNAP_MARGIN_PIXELS
    ) {
        const candidate = {
            x: (edgeX + ((edgeX - x) / length) * margin) / SLAB_WIDTH,
            y: (edgeY + ((edgeY - y) / length) * margin) / SLAB_HEIGHT,
        };
        if (isInsideOutline(candidate)) {
            return candidate;
        }
    }
    return { x: edgeX / SLAB_WIDTH, y: edgeY / SLAB_HEIGHT };
};
