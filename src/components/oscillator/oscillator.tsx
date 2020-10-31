import React, { useState } from 'react'
import styled from '@emotion/styled'


type Props = {
    frequency: number
    onFrequencyChange: any
}

export function Oscillator({ frequency, onFrequencyChange }: Props) {
    const [inputValue, setInputValue] = useState<number>(frequency)

    // const handleIncreaseGain = (e) => {
    //     setGainValue((gain) => gain < 100 ? gain + 1 : gain)
    //     onIncreaseGain()
    // }
    // const handleDecreaseGain = (e) => {
    //     setGainValue((gain) => gain > 0 ? gain - 1 : gain)
    //     onDecreaseGain()
    // }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }
    return (
        <NodeContainer>
            <p>Oscillator</p>
            <StyledInput value={inputValue} onChange={handleInputChange} onBlur={onFrequencyChange} />Hz
        </NodeContainer>
    )
}

const NodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75px;
    height: 100px;
    background-color: #50a0ff;
    user-select: none;
`
const StyledInput = styled.input`
width: 50px;
`
