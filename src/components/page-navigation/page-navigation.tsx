import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'

// import RandomFrequency from './pages/random-frequency'
// import Intervals from 'pages/intervals'
// import WhiteNoise from 'components/white-noise/white-noise'


// type Props = {}

const PageNavigation = () => {
    return <NavigationWrapper>
        <Link to='/relative-intervals'>Relative Intervals</Link>
        <Link to='/whitenoise'>White Noise</Link>
        <Link to='/random'>Random Frequency</Link>
    </NavigationWrapper>
}
const NavigationWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 5px;
    > * {
        margin: 0 10px;
    }
    border-bottom: 2px solid black;
`
export default PageNavigation
