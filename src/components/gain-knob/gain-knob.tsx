import React from 'react'
import styled from '@emotion/styled'


type Props = {
    gain: number
    label?: string
    onIncreaseGain: any
    onDecreaseGain: any
}

export function GainKnob({ label, gain, onIncreaseGain, onDecreaseGain }: Props) {
    return (
        <NodeContainer>
            <Label>{label || 'Gain'}</Label>
            <Control>
                <div>{gain}</div>
                <button onClick={onIncreaseGain}>▲</button>
                <button onClick={onDecreaseGain}>▼</button>
            </Control>
        </NodeContainer>
    )
}
const Control = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`

const NodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 75px;
    height: 150px;
    background-color: #a0a0a0;
    user-select: none;
    border: 1px solid black;
    border-radius: 5px;
    margin: 2px;
`
const Label = styled.p`
    text-align: center;
    width: 100%;
    height: 50px;
    margin: 0;
    background-color: rgba(50, 50, 50, 0.5)
`

