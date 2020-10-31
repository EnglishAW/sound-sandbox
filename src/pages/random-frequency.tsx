import {
    useAudioContextActions,
    useAudioContextState,
} from 'context/audio-context'
import React, { FC } from 'react'

const RandomFrequency: FC<any> = () => {
    const { oscillators } = useAudioContextState()
    const { addOscillator, stopAllOscillators } = useAudioContextActions()

    function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
    }

    document.body.onkeyup = function (e) {
        if (e.code === 'Space') {
            addOscillator(getRandomInt(100, 1000))
        }
        if (e.code === 'Escape') {
            stopAllOscillators()
        }
    }

    return (
        <div>
            <h3>Random Frequency</h3>
            <p>
                Space Bar - Add a random frequency <br /> Escape - Stop all
                sounds
            </p>
            {oscillators.map((o, i) => {
                return <pre key={i}>{o.node.frequency.value} Hz</pre>
            })}
        </div>
    )
}

export default RandomFrequency
