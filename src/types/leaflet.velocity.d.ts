interface VelocityLayerOptions {
    displayValues: boolean;
    displayOptions?: {
      velocityType?: string;
      displayPosition?: string;
      displayEmptyString?: string;
      speedUnit?: string;
      showCardinal?: boolean;
      angleConvention?: string;
    };
    data: any;
    maxVelocity?: number;
    minVelocity?: number;
    velocityScale?: number;
    opacity?: number;
    colorScale?: string[];
    lineWidth?: number;
    paneName?: string;
}

interface VelocityLayerMethods extends L.Layer {
    setData: (data) => void;
}

declare namespace L {
    export function velocityLayer(options: VelocityLayerOptions): VelocityLayerMethods;
}