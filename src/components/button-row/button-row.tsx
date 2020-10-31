import React, { useState } from 'react'
import './button-row.css'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CapsHeading } from 'assets/shared-styles'

type Props = {
    color?: 'blue' | 'green'
    size?: string
    anything?: any
}

function ButtonRow({ color, ...rest }: Props) {
    const [toggle] = useState(true)
    const buttonVarient =
        color === 'blue' ? 'primary' : color === 'green' ? 'success' : 'warning'

    const handleClick = (event: any) => {
        console.log(event)
    }

    const label = toggle ? 'true' : 'false'

    return (
        <Row>
            <Col lg={3}>
                <CapsHeading>{label}</CapsHeading>
            </Col>
            <Col lg={3}>
                <Button size="lg" variant={buttonVarient} onClick={handleClick}>
                    My Button One
                </Button>
            </Col>
            <Col lg={3}>
                <Button size="lg" variant={buttonVarient}>
                    My Button Two
                </Button>
            </Col>
        </Row>
    )
}

// const CapsHeading = styled.h3`
//   text-transform: uppercase;
//   color: red;
// `;

export default ButtonRow
