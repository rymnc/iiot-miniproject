import React, { useContext, useState } from 'react'
import Modal from '../Modal'
import { Button, Container, FormCheck, Row, Col } from 'react-bootstrap'
import { DeviceContext } from './DeviceContext'
import DownloadList from './DownloadList'
import { TYPES } from './AddDevice'

const Checkbox = ({ header, onChange, status, onNestedChange, currentNested }) => {
    return (
        <>
            <FormCheck type={'checkbox'} id={`check-${header}`} label={header} defaultChecked={status} onClick={() => onChange(header)} />
            {header === 'Device Type' && status &&
                <>
                    {/* 
                        This is a temporary nested drop down. Ideally we would have a generic implementation,
                        but for the sake of a demo, it has been hardcoded
                     */}
                    {TYPES.map((deviceType) => <FormCheck checked={deviceType === currentNested} inline type={'radio'} label={deviceType} key={`nested-${deviceType}`} onChange={() => onNestedChange('deviceType', deviceType)} />)}
                </>
            }
        </>
    )
}

const Checkboxes = ({ headers, onHide, onChange, onSubmit, where, onNestedChange, currentNested }) => {
    const headings = headers.map(h => h[0])
    const statuses = headers.map(h => h[1])
    return (
        <>
            {headings.map((header, i) => <Checkbox key={header} header={header} onChange={onChange} status={statuses[i]} onNestedChange={onNestedChange} currentNested={currentNested} />)}
            <Row className="my-2" style={{ textAlign: "-webkit-right" }}>
                <Col>
                    <Button className="mx-2" variant="outline-primary" onClick={onSubmit}>
                        Apply Filter
                    </Button>
                    <Button variant="outline-secondary" onClick={onHide}>
                        Close
                    </Button>
                    <DownloadList headings={headers} where={where} />
                </Col>
            </Row>
        </>
    )
}

const Filters = () => {
    const { headings, updateHeadings } = useContext(DeviceContext)
    const [showColumnFilter, setShowCF] = useState(false)
    const [localHeadings, setLocalHeadings] = useState(headings)
    const [nestedChange, setNestedChange] = useState()
    const [currentNested, setCurrentNested] = useState('SENSOR')
    const onHide = () => setShowCF(false)

    const onChange = (header) => {
        let lHInstance = localHeadings
        const onlyHeaders = localHeadings.map((lh) => lh[0]);
        const i = onlyHeaders.indexOf(header)
        lHInstance[i][1] = !lHInstance[i][1]
        setLocalHeadings([...lHInstance])
    }

    const onNestedChange = (header, key) => {
        setNestedChange(`"${header}"='${key}'`)
        setCurrentNested(key)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateHeadings(localHeadings)
        onHide()
    }

    return (
        <Container>
            <Button
                variant="primary"
                size="md"
                onClick={() => setShowCF(true)}
                className="rounded"
            >
                Filter Columns
            </Button>
            <Modal
                show={showColumnFilter}
                onHide={onHide}
                size="sm"
                title={"Choose the Columns"}
                body={
                    <>
                        <Checkboxes headers={headings} onHide={onHide} onChange={onChange} onSubmit={onSubmit} onNestedChange={onNestedChange} where={nestedChange} currentNested={currentNested} />

                    </>
                }
            />

        </Container>
    )
}

export default Filters
