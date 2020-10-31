type Range = [number, number]

export const forRange = (range:Range, cb) => {
    for(var i = range[0]; i < range[1]; i++) {
        cb(i)
    }
}
