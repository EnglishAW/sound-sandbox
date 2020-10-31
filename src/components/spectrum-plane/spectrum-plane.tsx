import React from 'react'
import styled from '@emotion/styled'

export function SpectrumPlane() {
    return (
        <Plane onMouseMove={(e: any) => console.log(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop)} />

    )
}

const Plane = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 150px;
    background-color: #50a0ff;
    user-select: none;
`
