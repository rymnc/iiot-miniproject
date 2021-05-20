import React from 'react'
import Device from './Device'

const Devices = ({ deviceData: devices }) => {
    if (devices?.length > 0) {
        return (
            devices.map((device, i) => {
                return (
                    <Device {...device} key={i} i={i} />
                )
            })
        )
    } else return null
}

export default Devices
