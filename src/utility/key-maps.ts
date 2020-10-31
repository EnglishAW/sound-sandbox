import { pureIntervals, pureIntervalCoordinate, harmonicInterval } from "./intervals"

// const normalizeOctave = (value, fund) => {
//     const ratio = (value / fund)
//     // (frequency / fundamental) = 2^(n:number of octaves above fundamental)
//     // n = log(frequency / fundamental) / log(2)
//     const octavesAbove = Math.floor((Math.log(ratio) / Math.log(2)))
//     const transposedValue = value / Math.pow(2, octavesAbove)

//     return transposedValue
// }

const FUNDAMENTAL = 440

const {
    MAJOR_SECOND,
    MAJOR_THIRD,
    PERFECT_FOURTH,
    PERFECT_FIFTH,
    MAJOR_SIXTH,
    MAJOR_SEVETH
} = pureIntervals

export const secondRowJustIntonation = {
    KeyA: 440, // 1
    KeyS: harmonicInterval(MAJOR_SECOND, 440), // 2
    KeyD: harmonicInterval(MAJOR_THIRD, 440), // 3
    KeyF: harmonicInterval(PERFECT_FOURTH, 440), // 4
    KeyG: harmonicInterval(PERFECT_FIFTH, 440), // 5
    KeyH: harmonicInterval(MAJOR_SIXTH, 440), // 6
    KeyJ: harmonicInterval(MAJOR_SEVETH, 440), // 7
    KeyK: harmonicInterval(FUNDAMENTAL * 2, 440), // 1+
}

const getNoteAt = (perfectFifthDegree, minorThirdDegree) => {
    return pureIntervalCoordinate(perfectFifthDegree, minorThirdDegree, FUNDAMENTAL)
}
export const intervalKeyboard = {

    KeyQ: getNoteAt(-5, 1),
    KeyW: getNoteAt(-4, 1),
    KeyE: getNoteAt(-3, 1),
    KeyR: getNoteAt(-2, 1),
    KeyT: getNoteAt(-1, 1),
    KeyY: getNoteAt(0, 1),
    KeyU: getNoteAt(1, 1),
    KeyI: getNoteAt(2, 1),
    KeyO: getNoteAt(3, 1),
    KeyP: getNoteAt(4, 1),

    KeyA: getNoteAt(-4, 0),
    KeyS: getNoteAt(-3, 0),
    KeyD: getNoteAt(-2, 0),
    KeyF: getNoteAt(-1, 0),
    KeyG: getNoteAt(0, 0),
    KeyH: getNoteAt(1, 0),
    KeyJ: getNoteAt(2, 0),
    KeyK: getNoteAt(3, 0),
    KeyL: getNoteAt(4, 0),
    Semicolon: getNoteAt(5, 0),

    KeyZ: getNoteAt(-3, -1),
    KeyX: getNoteAt(-2, -1),
    KeyC: getNoteAt(-1, -1),
    KeyV: getNoteAt(0, -1),
    KeyB: getNoteAt(1, -1),
    KeyN: getNoteAt(2, -1),
    KeyM: getNoteAt(3, -1),
    Comma: getNoteAt(4, -1),
    Period: getNoteAt(5, -1),

}