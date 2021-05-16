import React from 'react'

const Devices = ({ deviceData: devices }) => {
    if (devices?.length > 0) {
        return (
            devices.map(({ deviceId, deviceName, deviceType, healthy, createdAt }, i) => {
                return (
                    <tr key={deviceId} className="text-center">
                        <td>{i + 1}</td>
                        <td>{deviceName}</td>
                        <td>{deviceType}</td>
                        <td>{healthy.toString()}</td>
                        <td>{new Date(createdAt).toDateString()}</td>
                    </tr>
                )
            })
        )
    } else return null
}

export default Devices
