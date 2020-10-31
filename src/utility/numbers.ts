export const roundNum = (num: number, place?: number) => {
    const sigFig = Math.pow(10, place || 0)
    return Math.round((num + Number.EPSILON) * sigFig) / sigFig
}
export const inRange = (min: number, max: number, value: number) => {
    return value < min ? Math.max(value, min) : Math.min(value, max)
}