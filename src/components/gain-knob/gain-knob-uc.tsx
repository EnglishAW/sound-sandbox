import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { roundNum } from 'utility/numbers'


type Props = {
    gainNode: GainNode
}

export function GainKnobUC({ gainNode }: Props) {
    const [gainValue, setGainValue] = useState(gainNode.gain.value)
    const gainValueInt = roundNum(gainValue * 100)
    const increment = 0.1

    useEffect(() => {
        console.log()
        gainNode.gain.value = gainValue
    }, [gainValue, gainNode.gain])

    const handleIncreaseGain = (e) => {
        if (gainValue < 1) {
            setGainValue((pGain) => Math.min(pGain + increment, 1))
        }
    }
    const handleDecreaseGain = (e) => {
        if (gainValue > 0) {
            setGainValue((pGain) => Math.max(pGain - increment, 0))
        }
    }

    return (
        <NodeContainer>
            <p>Gain</p>
            <div>{gainValueInt}</div>
            <button onClick={handleIncreaseGain}>▲</button>
            <button onClick={handleDecreaseGain}>▼</button>
        </NodeContainer>
    )
}

const NodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75px;
    height: 150px;
    background-color: #a0a0a0;
    user-select: none;
`

