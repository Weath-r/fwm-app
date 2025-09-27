export const randomIndexFromArray = (arr: any[]) => {
    return Math.floor(Math.random() * arr.length);
}; 

export const timer = (ms: number) => new Promise(res => setTimeout(res, ms));
