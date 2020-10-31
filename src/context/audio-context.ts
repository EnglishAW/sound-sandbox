import { useState } from 'react'
import constate from 'constate'
import { v4 as uuid } from 'uuid'
import { forRange } from 'utility/helpers'

const useAudioContext = () => {
    const [audioContext, setAudioContext] = useState(
        new window.AudioContext(/*|| window.webkitAudioContext*/)
    )

    const resetAudioContext = () =>{
        audioContext.close().then(()=>{
            setAudioContext(new window.AudioContext())
        })
    }

    const [masterGainNode] = useState(() => {
        const mgn = audioContext.createGain()
        mgn.gain.value = 0.5
        mgn.connect(audioContext.destination)
        return mgn
    })
    const [oscillators, setOscillators] = useState<
        Array<{ id: string; node: OscillatorNode; gainNode: GainNode }>
    >([])

    function addOscillator(
        frequency_hz,
        waveform: OscillatorType = 'sine',
        gainValue: number | undefined = undefined
    ) {
        var osc = audioContext.createOscillator() // instantiate an oscillator
        osc.type = waveform // this is the default - also square, sawtooth, triangle
        osc.frequency.value = frequency_hz // Hz
        const oscGainNode =
            gainValue !== undefined ? audioContext.createGain() : masterGainNode
        if (!!gainValue) {
            // var volume = audioContext.createGain();
            osc.connect(oscGainNode)
            oscGainNode.connect(masterGainNode) // connect it to the destination
            oscGainNode.gain.value = gainValue
        } else {
            // Oscillator to Master Gain Node
            osc.connect(oscGainNode)
        }

        osc.start() // start the oscillator
        const newOscillator = { id: uuid(), node: osc, gainNode: oscGainNode }
        // console.log(newOscillator)
        // decay(newOscillator, volume)

        setOscillators((prev) => [...prev, newOscillator])

        return newOscillator
    }

    function removeOscillator(osc) {
        // osc.node.stop()
        const gainNode: GainNode = osc.gainNode
        var now = audioContext.currentTime
        var releaseDuration = now + 0.4
        gainNode.gain.cancelScheduledValues(now)

        // Anchor beginning of ramp at current value.
        gainNode.gain.setValueAtTime(gainNode.gain.value, now)
        gainNode.gain.linearRampToValueAtTime(0.0, releaseDuration)
        osc.node.stop(releaseDuration)
        setOscillators((state) => {
            // console.log(osc)
            // console.log(state.filter((o) => osc.id !== o.id))
            return state.filter((o) => osc.id !== o.id)
        })
    }

    function stopAllOscillators() {
        oscillators.forEach((osc) => {
            osc.node.stop()
            osc.node.disconnect()
        })
        setOscillators([])
    }

    function addBufferSource(
        arrayBuffers: Array<Float32Array>,
        loop: boolean = false
    ) {
        // Get an AudioBufferSourceNode.
        // This is the AudioNode to use when we want to play an AudioBuffer

        const sourceBuffer = audioContext.createBuffer(
            arrayBuffers.length,
            arrayBuffers[0].length,
            audioContext.sampleRate
        )

        forRange([0, sourceBuffer.numberOfChannels], (channel) => {
            sourceBuffer.copyToChannel(arrayBuffers[channel], channel)
        })

        var source = audioContext.createBufferSource()
        // set the buffer in the AudioBufferSourceNode
        source.buffer = sourceBuffer
        source.loop = loop
        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        source.connect(audioContext.destination)

        // start the source playing
        source.start()

        return source
    }

    return {
        audioContextState: {
            audioContext,
            masterGainNode,
            oscillators,
        },
        audioContextActions: {
            addOscillator,
            addBufferSource,
            stopAllOscillators,
            removeOscillator,
            resetAudioContext
        },
    }
}

const [
    AudioContextProvider,
    useAudioContextState,
    useAudioContextActions,
] = constate(
    useAudioContext,
    (value) => value.audioContextState,
    (value) => value.audioContextActions
)

export { AudioContextProvider, useAudioContextState, useAudioContextActions }
