import React, { useContext, useState } from 'react'
import Modal from '../Modal'
import { Button, Container, FormCheck, Row, Col } from 'react-bootstrap'
import { DeviceContext } from './DeviceContext'

const Checkbox = ({ header, onChange, status }) => {
    return (
        <FormCheck type={'checkbox'} id={`check-${header}`} label={header} defaultChecked={status} onClick={() => onChange(header)} />
    )
}

const Checkboxes = ({ headers, onHide, onChange, onSubmit }) => {
    const headings = headers.map(h => h[0])
    const statuses = headers.map(h => h[1])
    return (
        <>
            {headings.map((header, i) => <Checkbox key={header} header={header} onChange={onChange} status={statuses[i]} />)}
            <Row className="my-2" style={{ textAlign: "-webkit-right" }}>
                <Col>
                    <Button className="mx-2" variant="outline-primary" onClick={onSubmit}>
                        Apply Filter
                    </Button>
                    <Button variant="outline-secondary" onClick={onHide}>
                        Close
                    </Button>
                </Col>
            </Row>
        </>
    )
}

const Filters = () => {
    const { headings, updateHeadings } = useContext(DeviceContext)
    const [showColumnFilter, setShowCF] = useState(false)
    const [localHeadings, setLocalHeadings] = useState(headings)
    const onHide = () => setShowCF(false)

    const onChange = (header) => {
        let lHInstance = localHeadings
        const onlyHeaders = localHeadings.map((lh) => lh[0]);
        const i = onlyHeaders.indexOf(header)
        lHInstance[i][1] = !lHInstance[i][1]
        setLocalHeadings([...lHInstance])
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
                body={<Checkboxes headers={headings} onHide={onHide} onChange={onChange} onSubmit={onSubmit} />}
            />

        </Container>
    )
}

export default Filters
