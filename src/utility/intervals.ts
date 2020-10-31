export const pureIntervals = {
    MINOR_SECOND: 25 / 24,
    MAJOR_SECOND: 9 / 8,
    MINOR_THIRD: 6 / 5,
    MAJOR_THIRD: 5 / 4,
    PERFECT_FOURTH: 4 / 3,
    DIMINISHED_FIFTH: 45 / 32,
    PERFECT_FIFTH: 3 / 2,
    MINOR_SIXTH: 8 / 5,
    MAJOR_SIXTH: 5 / 3,
    MINOR_SEVENTH: 9 / 5,
    MAJOR_SEVETH: 15 / 8,
}

export const limit5Intervals = {
    MINOR_SECOND: 16 / 15,
    MAJOR_SECOND: 9 / 8,
    MINOR_THIRD: 6 / 5,
    MAJOR_THIRD: 5 / 4,
    PERFECT_FOURTH: 4 / 3,
    AUG_FOURTH: 45 / 32,
    DIM_FIFTH: 25 / 18,
    PERFECT_FIFTH: 3 / 2,
    MINOR_SIXTH: 8 / 5,
    MAJOR_SIXTH: 5 / 3,
    MINOR_SEVENTH: 16 / 9,
    MAJOR_SEVENTH: 15 / 8,
}

export const harmonicInterval = (ratio: number, fund: number) => {
    return (fund * ratio)
}

const accumulateInterval= (interval: number, tonic: number, degree: number = 1) => {
    return Math.pow(interval, degree) * tonic
}

export const pureIntervalCoordinate = (perfectFifthDegree, minorThirdDegree, fundamental) => {
    return accumulateInterval(pureIntervals.MINOR_THIRD, accumulateInterval(pureIntervals.PERFECT_FIFTH, fundamental, perfectFifthDegree), minorThirdDegree)
}