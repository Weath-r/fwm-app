export type ScreenBox = {
    left: number;
    top: number;
    right: number;
    bottom: number;
};

export type PlacementRequest = {
    centreX: number;
    centreY: number;
    scale: number;
    width: number;
    height: number;
};

export type Placement = {
    centreX: number;
    centreY: number;
    box: ScreenBox;
};

export const WIND_PILL_OFFSETS: [number, number][] = [
    [0, 22],
    [0, -22],
    [72, 0],
    [-72, 0],
    [72, 28],
    [-72, 28],
    [0, 52],
    [72, -28],
    [-72, -28],
    [112, 0],
    [-112, 0],
    [0, 82],
];

export const BILLBOARD_OFFSETS: [number, number][] = [
    [0, 0],
    [0, -14],
    [20, 0],
    [-20, 0],
    [20, -14],
    [-20, -14],
    [0, -28],
    [36, 0],
    [-36, 0],
    [36, -24],
    [-36, -24],
    [0, -44],
    [56, 0],
    [-56, 0],
    [56, -36],
    [-56, -36],
    [0, -64],
    [80, -20],
    [-80, -20],
];

const GAP = 4;

const boxAround = (centreX: number, centreY: number, width: number, height: number): ScreenBox => ({
    left: centreX - width / 2,
    top: centreY - height / 2,
    right: centreX + width / 2,
    bottom: centreY + height / 2,
});

const overlapArea = (first: ScreenBox, second: ScreenBox): number => {
    const width =
        Math.min(first.right, second.right + GAP) - Math.max(first.left, second.left - GAP);
    const height =
        Math.min(first.bottom, second.bottom + GAP) - Math.max(first.top, second.top - GAP);
    return width > 0 && height > 0 ? width * height : 0;
};

const isInside = (box: ScreenBox, bounds: ScreenBox): boolean =>
    box.left >= bounds.left &&
    box.right <= bounds.right &&
    box.top >= bounds.top &&
    box.bottom <= bounds.bottom;

export const placeBoxes = (
    requests: PlacementRequest[],
    obstacles: ScreenBox[],
    bounds: ScreenBox,
    offsets: [number, number][]
): Placement[] => {
    const placed: ScreenBox[] = [];
    return requests.map((request) => {
        const blockers = [...obstacles, ...placed];
        const cost = (box: ScreenBox) =>
            (isInside(box, bounds) ? 0 : Number.MAX_SAFE_INTEGER / 2) +
            blockers.reduce((total, blocker) => total + overlapArea(box, blocker), 0);
        const candidates = offsets.map(([offsetX, offsetY]) => {
            const centreX = request.centreX + offsetX * request.scale;
            const centreY = request.centreY + offsetY * request.scale;
            return {
                centreX,
                centreY,
                box: boxAround(
                    centreX,
                    centreY,
                    request.width * request.scale,
                    request.height * request.scale
                ),
            };
        });
        const best =
            candidates.find((candidate) => cost(candidate.box) === 0) ??
            candidates.reduce((current, candidate) =>
                cost(candidate.box) < cost(current.box) ? candidate : current
            );
        placed.push(best.box);
        return best;
    });
};
