import React, { useContext } from 'react'
import Device from './Device'
import { apiClient } from '../../services/axios'
import { AppContext } from '../../context/ContextProvider'

const Devices = ({ deviceData: devices, updateList }) => {
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

    if (devices?.length > 0) {
        return (
            devices.map((device, i) => {
                return (
                    <Device {...device} key={i} i={i} deleteDevice={(id) => deleteDevice(id)} />
                )
            })
        )
    } else return null
}

export default Devices
