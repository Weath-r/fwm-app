
export type Variogram = {
    n: number;
    model: (arg0: number, arg1: any, arg2: any, arg3: any, arg4: any) => void;
    x: number[];
    y: number[];
    nugget: any;
    range: any;
    sill: any;
    A: any;
    M: number[];
};