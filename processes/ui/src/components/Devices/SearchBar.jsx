import React, { useState } from 'react'
import { Button, Col, Container } from 'react-bootstrap'
import Modal from '../Modal'
import AddDevice from './AddDevice'

const SearchBar = ({ addNewDevice }) => {
    const [show, setShow] = useState(false)


    const addStyle = {
        textAlign: '-webkit-right'
    }

    return (
        <Container className="mb-3">
            <Col style={addStyle} className="mx-1">
                <Button variant="primary" size="sm" onClick={() => setShow(true)} className="rounded">
                    <img src="https://img.icons8.com/android/24/ffffff/plus.png" alt="Plus Symbol" />
                </Button>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    title={"Add a Device"}
                    body={
                        <AddDevice
                            onHide={() => setShow(false)}
                            addNewDevice={addNewDevice}
                        />
                    }
                />
            </Col>
        </Container >


    )
}

export default SearchBar
