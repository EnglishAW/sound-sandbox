import { useAudioContextState } from 'context/audio-context'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { GainKnob } from 'components/gain-knob/gain-knob'
import styled from '@emotion/styled'
import { getWhiteNoiseBuffer } from 'lib/audio-buffer'
import { lowPassFilter } from 'lib/filters'
import { useKeyboardMap } from 'hooks/keyboard-map/use-keyboard-map'

const keyMap = {
    KeyM: 'MUTE',
}

const WhiteNoise: FC<any> = () => {
    const { masterGainNode, audioContext } = useAudioContextState()

    const [masterVolume, setMasterVolume] = useState(
        masterGainNode.gain.value * 100
    )

    masterGainNode.gain.value = masterVolume / 100

    useEffect(() => {
        var source = audioContext.createBufferSource()

        // const rawBuffer = getSineWaveBuffer(440, 3, audioContext)
        const whiteNoiseBuffer = getWhiteNoiseBuffer(3, audioContext)
        lowPassFilter(100, whiteNoiseBuffer)
        // set the buffer in the AudioBufferSourceNode
        source.buffer = whiteNoiseBuffer
        source.loop = true

        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        source.connect(masterGainNode)

        // start the source playing
        source.start()
    }, [audioContext, masterGainNode])

    // Keyboad Events
    const onKeysPressed = useCallback(
        (keyMapValue) => {
            if (keyMapValue === 'MUTE') {
                if (masterGainNode.gain.value < 0.1) {
                    console.log('mute off')
                    masterGainNode.gain.value = 0.5
                    return 'MUTE_OFF'
                } else {
                    console.log('mute on')
                    masterGainNode.gain.value = 0
                    return 'MUTE_ON'
                }
            }
        },
        [masterGainNode]
    )

    useKeyboardMap({ keyMap, onKeysPressed })

    const handleIncreaseGain = (e) => {
        setMasterVolume((gain) => {
            console.log(gain)
            return gain < 100 ? gain + 10 : gain
        })
    }
    const handleDecreaseGain = (e) => {
        setMasterVolume((gain) => (gain > 0 ? gain - 10 : gain))
    }

    return (
        <div>
            <h3>White Noise</h3>
            <Wrapper>
                <GainKnob
                    gain={masterVolume}
                    onIncreaseGain={handleIncreaseGain}
                    onDecreaseGain={handleDecreaseGain}
                />
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`

export default WhiteNoise
