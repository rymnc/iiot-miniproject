import React, { useContext } from 'react'
import Device from './Device'
import { apiClient } from '../../services/axios'
import { AppContext } from '../../context/ContextProvider'
import { DeviceContext } from './DeviceContext'

const Devices = () => {
    const { deviceData, addNewDevice: updateList } = useContext(DeviceContext)

    const { success, error } = useContext(AppContext)

    const deleteDevice = async (deviceId) => {
        try {
            const { data } = await apiClient.delete(`/devices/delete?deviceId=${deviceId}`)
            if (data === true) {
                success('Successfully deleted device!')
                await updateList()

            } else throw new Error('Could not delete the device!')
        } catch (e) {
            error(e?.response?.data || e.message)
        }
    }

    return (
        deviceData &&
        deviceData.map((device, i) => {
            console.log(i, device)
            return <Device {...device} key={device.deviceId} deleteDevice={deleteDevice} />

        })
    )

}

export default Devices
