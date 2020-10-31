import React from 'react'
import Routes from './routes'
import styled from '@emotion/styled'

function App() {
    return (
        <AppWrapper>
            <h3>Sound Sandbox</h3>
            <Routes />
        </AppWrapper>
    )
}

const AppWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default App
