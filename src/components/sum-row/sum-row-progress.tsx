import React, { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type Props = {}

type AmountDetails = { key: string; value: string; isValid: boolean }
type AmountsList = AmountDetails[]

const initialAmounts = [
    { key: 'amount1', label: 'Stupid Budget', value: '5', isValid: true },
    { key: 'amount2', label: "Matt's Allowance", value: '2', isValid: true },
    {
        key: 'amount3',
        label: "Andrew's Bank Account",
        value: '3',
        isValid: true,
    },
]

function SumRowProg(porps: Props) {
    const [amountsList, setAmountsList] = useState(initialAmounts)

    const handleAmountChange = (event: any, key: string) => {
        const newValue = event.target.value as string

        setAmountsList((prevAmountList) => {
            return prevAmountList.map((amountDetails) => {
                return amountDetails.key === key
                    ? {
                          ...amountDetails,
                          value: newValue,
                          isValid: isNumber(newValue),
                      }
                    : amountDetails
            })
        })
    }

    const totalAmount = calculateTotalAmount(amountsList)

    const invalidCls = 'is-invalid'

    return (
        <Row className="align-items-end">
            {amountsList.map((amountDetails) => {
                return (
                    <Col key={amountDetails.key} md={3}>
                        <label htmlFor={amountDetails.key}>
                            {amountDetails.label}
                        </label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    $
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id={amountDetails.key}
                                className={
                                    !amountDetails.isValid ? invalidCls : ''
                                }
                                placeholder="0.00"
                                value={amountDetails.value}
                                onChange={(e) =>
                                    handleAmountChange(e, amountDetails.key)
                                }
                            />
                        </InputGroup>
                    </Col>
                )
            })}

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
            {/* <pre>{JSON.stringify(amountsList)}</pre> */}
        </Row>
    )
}

const isNumber = (value: any) => !isNaN(value)

// const asNumberOr = (defaultValue: number, value: any) =>
//     isNumber(value) ? +value : defaultValue

const calculateTotalAmount = (amountsList: AmountsList) => {
    return amountsList.reduce((total, amountDetails) => {
        return total + (amountDetails.isValid ? +amountDetails.value : 0)
    }, 0)
}

export default SumRowProg
