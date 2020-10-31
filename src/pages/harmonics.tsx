import {
    useAudioContextActions,
    useAudioContextState,
} from 'context/audio-context'
import React, { FC, useCallback, useState, useMemo } from 'react'
import { GainKnob } from 'components/gain-knob/gain-knob'
import styled from '@emotion/styled'
import { adjust } from 'rambda'
import { inRange, roundNum } from 'utility/numbers'
import { intervalKeyboard } from 'utility/key-maps'
import { useKeyboardMap } from 'hooks/keyboard-map/use-keyboard-map'
import {
    bufferToCoordinates,
    getHarmonicSineWaveBufferArray,
} from 'lib/audio-buffer'
import {
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis,
    LineSeries,
} from 'react-vis'

const Harmonics: FC<any> = () => {
    const { audioContext, masterGainNode } = useAudioContextState()
    const { addBufferSource } = useAudioContextActions()

    const [masterHarmonicValues, setMasterHarmonicValues] = useState([
        0.5,
        0.1,
        0.1,
        0.1,
        0.1,
        0.1,
        0.1,
    ])
    const [masterVolume, setMasterVolume] = useState(
        masterGainNode.gain.value * 100
    )
    const [lastBuffer, setLastBuffer] = useState<any>([])

    masterGainNode.gain.value = masterVolume / 100

    const synthesize = useCallback(
        (fund: number) => {
            const wave = getHarmonicSineWaveBufferArray(
                fund,
                masterHarmonicValues,
                audioContext.sampleRate
            )
            setLastBuffer(wave)
            return addBufferSource([wave], true)
        },
        [addBufferSource, audioContext.sampleRate, masterHarmonicValues]
    )

    // Keyboad Events
    const onKeysPressed = useCallback(
        (k) => {
            return synthesize(k)
        },
        [synthesize]
    )

    const onKeysRelease = useCallback((keyOscs) => {
        keyOscs.stop()
        keyOscs.disconnect()
        setLastBuffer([])
    }, [])

    useKeyboardMap({ keyMap: intervalKeyboard, onKeysPressed, onKeysRelease })

    //=====

    const handleIncreaseGain = (e) => {
        setMasterVolume((gain) => {
            console.log(gain)
            return gain < 100 ? gain + 10 : gain
        })
    }
    const handleDecreaseGain = (e) => {
        setMasterVolume((gain) => (gain > 0 ? gain - 10 : gain))
    }

    // @ts-ignore
    const scopeDataFromBuffer = useMemo(
        () => bufferToCoordinates(lastBuffer, 600, 300),
        [lastBuffer]
    )
    const scopeData =
        scopeDataFromBuffer.length > 0
            ? scopeDataFromBuffer
            : [
                  { x: 0, y: 0 },
                  { x: 1, y: 0 },
              ]

    return (
        <div>
            <h3>Harmonics</h3>
            <Row>
                {masterHarmonicValues.map((hValue, i) => {
                    return (
                        <div>
                            <GainKnob
                                label={`H${i + 1}`}
                                gain={roundNum(hValue * 100)}
                                onIncreaseGain={() =>
                                    setMasterHarmonicValues(
                                        makeGainChangeInArray(i, 1)
                                    )
                                }
                                onDecreaseGain={() =>
                                    setMasterHarmonicValues(
                                        makeGainChangeInArray(i, -1)
                                    )
                                }
                            />
                        </div>
                    )
                })}
                <div key="master-gain">
                    <GainKnob
                        label="Master Gain"
                        gain={masterVolume}
                        onIncreaseGain={handleIncreaseGain}
                        onDecreaseGain={handleDecreaseGain}
                    />
                </div>
            </Row>
            <Column>
                <XYPlot
                    width={400}
                    height={300}
                    xDomain={[0, 600]}
                    yDomain={[-1.25, 1.25]}
                >
                    <XAxis />
                    <YAxis />
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <LineSeries data={scopeData} color="#FF00FF" />
                </XYPlot>
                <h4>From buffer of the last note played</h4>
            </Column>
        </div>
    )
}

const makeGainChangeInArray = (index, direction) => (pState) =>
    adjust(index, (v: number) => inRange(0, 1, v + 0.05 * direction), pState)

const Row = styled.div`
    display: flex;
`
const Column = styled.div`
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
export default Harmonics
