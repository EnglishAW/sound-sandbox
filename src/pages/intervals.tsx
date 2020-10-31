import { useAudioContextActions, useAudioContextState } from 'context/audio-context';
import React, { FC, useState } from 'react'
import { GainKnob } from 'components/gain-knob/gain-knob'
import { Oscillator } from 'components/oscillator/oscillator';
import styled from '@emotion/styled';
import { SpectrumPlane } from 'components/spectrum-plane/spectrum-plane';

const Intervals: FC<any> = () => {
    const { masterGainNode, oscillators } = useAudioContextState()
    const { addOscillator } = useAudioContextActions()

    const [masterVolume, setMasterVolume] = useState(masterGainNode.gain.value * 100)

    masterGainNode.gain.value = masterVolume / 100

    // document.body.onkeyup = function (e) {

    //     const keyCode = e.code

    //     if (pressedKeys[keyCode]) {
    //         removeOscillator(pressedKeys[keyCode])
    //         pressedKeys[keyCode] = undefined
    //     }

    //     if (keyCode === 'Escape') {
    //         stopAllOscillators()
    //     }
    // }

    document.body.onkeypress = function (e) {

        const keyCode = e.code
        if (!pressedKeys[keyCode]) {
            if (!!keyMap[keyCode]) {
                const osc = addOscillator(keyMap[keyCode])
                pressedKeys[keyCode] = osc
            }
        }
    }

    const handleIncreaseGain = (e) => {
        setMasterVolume((gain) => {
            console.log(gain)
            return gain < 100 ? gain + 10 : gain
        })
    }
    const handleDecreaseGain = (e) => {
        setMasterVolume((gain) => gain > 0 ? gain - 10 : gain)
    }

    return (
        <div>
            <h3>Random Frequency</h3>
            {oscillators.map((o, i) => {
                return (
                    <div>
                        <Oscillator
                            frequency={o.node.frequency.value}
                            onFrequencyChange={
                                (e) => {
                                    console.log(e.target.value)
                                    o.node.frequency.value = +e.target.value
                                }
                            } />
                        <GainKnob
                            gain={o.gainNode.gain.value * 100}
                            onIncreaseGain={() => { o.gainNode.gain.value += .1 }}
                            onDecreaseGain={() => { o.gainNode.gain.value -= .1 }} />
                    </div>)
                // <pre key={i}>{o.node.frequency.value} Hz</pre>
            })}
            <Wrapper>
                <SpectrumPlane />
                <GainKnob
                    gain={masterVolume}
                    onIncreaseGain={handleIncreaseGain}
                    onDecreaseGain={handleDecreaseGain} />
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
 display: flex;
 justify-content: center;
`

let pressedKeys = {}
const FUNDAMENTAL = 440
// const J_tuning = pureIntervals
// const L5_tuning = limit5Intervals

const harmonic = (fund, degree) => {
    const harmonicNote = harmonicSum(fund, degree)
    console.log(harmonicNote)
    // const normalizedNote = fund + (harmonicNote % fund)
    return harmonicNote
}
const harmonicSum = (fund, degree) => {
    let val = fund
    while (degree > 0) {
        val = val * 1.5
        degree = degree - 1
    }
    return val
}
console.log(harmonic(440, 6))
/**
 * key = e.code from keyevent
 * value = frequency in Hz
 */
const keyMap = {
    // Digit1: 440,
    // Digit2: FUNDAMENTAL * L5_tuning.MAJOR_SECOND,
    // Digit3: FUNDAMENTAL * L5_tuning.MAJOR_THIRD,
    // Digit4: FUNDAMENTAL * L5_tuning.PERFECT_FOURTH,
    // Digit5: FUNDAMENTAL * L5_tuning.PERFECT_FIFTH,
    // Digit6: FUNDAMENTAL * L5_tuning.MAJOR_SIXTH,
    // Digit7: FUNDAMENTAL * L5_tuning.MAJOR_SEVENTH,
    // Digit8: FUNDAMENTAL * 2,
    // Digit9: FUNDAMENTAL * 3,

    KeyQ: 440,
    KeyW: harmonic(FUNDAMENTAL, 2) / 2,//harmonic(FUNDAMENTAL, 3) - 990,// FUNDAMENTAL * (10 / 9), //(((FUNDAMENTAL * (5 / 4)) + FUNDAMENTAL) / 2),//FUNDAMENTAL * (16 / 15), // 2
    KeyE: FUNDAMENTAL * (5 / 4), // 3
    KeyR: FUNDAMENTAL * (4 / 3), // 4
    KeyT: harmonic(FUNDAMENTAL, 1), // 5
    KeyY: harmonic(FUNDAMENTAL, 3) / 2,
    KeyU: 825,
    KeyI: FUNDAMENTAL * 2,
    KeyO: FUNDAMENTAL * 3,
}

export default Intervals
