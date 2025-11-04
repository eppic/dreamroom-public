export function snapToGrid(x: number, y: number, gridSize: number): [number, number] {
    const snappedX = Math.round(x / gridSize) * gridSize;
    const snappedY = Math.round(y / gridSize) * gridSize;
    return [snappedX, snappedY];
}