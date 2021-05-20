import React, { useState } from 'react'
import { Button, Col } from 'react-bootstrap'

const Device = ({ deviceId, deviceName, deviceType, healthy, createdAt, i, deleteDevice }) => {
    const [show, setShow] = useState(false)
    return (
        <tr key={deviceId} className="text-center" onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <td>{i + 1}</td>
            <td>{deviceName}</td>
            <td>{deviceType}</td>
            <td>{healthy === true ? 'YES' : 'NO'}</td>
            <td>
                <div className="flex" style={{ position: 'relative', display: "flex", justifyContent: "space-between" }}>
                    <Col md={1} />
                    {new Date(createdAt).toDateString()}
                    {<Button className="btn-close" onClick={() => deleteDevice(deviceId)} variant="outline-danger" style={{ visibility: show ? 'visible' : 'hidden' }} />}
                </div>
            </td >
        </tr >
    )
}

export default Device
