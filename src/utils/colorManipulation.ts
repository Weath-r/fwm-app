export const rgbToRgba = (rgb: string, alpha: number): string => {
    const matches = rgb.match(/\d+/g);
    const ERROR_MSG = "Invalid RGB format";

    if (!matches) {
        throw new Error(ERROR_MSG);
    }

    const rgbValues = matches.map(Number);
    
    if (rgbValues.length !== 3) {
        throw new Error(ERROR_MSG);
    }

    return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${alpha})`;
};

export const hexToRgba = (hex: string, alpha: number): string => {
    hex = hex.replace(/^#/, "");
    let r: number, g: number, b: number;
    
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
    } else {
        throw new Error("Invalid HEX format");
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
