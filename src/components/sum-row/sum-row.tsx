import React, { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type Props = {}

type AmountDetails = { key: string; value: number }
type AmountsList = AmountDetails[]

const initialAmounts = [
    { key: 'amount1', value: 5 },
    { key: 'amount2', value: 2 },
    { key: 'amount3', value: 3 },
]

function SumRow(porps: Props) {
    const [amountsList, setAmountsList] = useState(initialAmounts)

    const handleAmountChange = (event: any, key: string) => {
        const newValue = event.target.value

        setAmountsList((prevAmountList) => {
            return prevAmountList.map((amountDetails) => {
                return amountDetails.key !== key
                    ? amountDetails
                    : { ...amountDetails, value: newValue }
            })
        })
    }

    const totalAmount = calculateTotalAmount(amountsList)

    return (
        <Row className="align-items-end">
            {amountsList.map((amountDetails) => (
                <Col key={amountDetails.key} md={3}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                $
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="0.00"
                            value={amountDetails.value}
                            onChange={(e) =>
                                handleAmountChange(e, amountDetails.key)
                            }
                        />
                    </InputGroup>
                </Col>
            ))}
            <Col md={2}>
                <label htmlFor="amount-total">Amount Total</label>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        id="amount-total"
                        disabled
                        value={totalAmount}
                    />
                </InputGroup>
            </Col>
        </Row>
    )
}

const isNumber = (value: any) => !isNaN(value)

const asNumberOr = (defaultValue: number, value: any) =>
    isNumber(value) ? +value : defaultValue

const calculateTotalAmount = (amountsList: AmountsList) => {
    return amountsList.reduce((totalAmount, amountDetails) => {
        return totalAmount + asNumberOr(0, amountDetails.value)
    }, 0)
}

export default SumRow
