import React, { createContext, useState, useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../context/ContextProvider';
import { apiClient } from '../../services/axios'

export const DeviceContext = createContext();

export const DeviceProvider = (props) => {
    const { error } = useContext(AppContext)
    const [deviceData, setDeviceData] = useState([])
    const history = useHistory()
    const updateDeviceData = (array) => setDeviceData([...array])

    const getDeviceData = useCallback(async () => {
        try {
            const { data } = await apiClient.get('/devices/all')
            console.log('setting')
            updateDeviceData(data)
        } catch (e) {
            if (e?.response?.status === 401) {
                history.push('/login')
                error('Session Expired. Please Re-Login')
            } else {
                error('Could not fetch device data!')
            }
        }
    }, [error, history])

    useEffect(() => {
        getDeviceData()
        console.log('got device')
    }, [getDeviceData])

    const getStringModifier = (field) => {
        return (a, b) => {
            let fa = a[field].toLowerCase(),
                fb = b[field].toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        }
    }

    const sortBy = (header, order) => {
        const array = deviceData;
        let modifier;
        switch (header) {
            case 'Id':
                modifier = getStringModifier('deviceId')
                break;
            case 'Device Name':
                modifier = getStringModifier('deviceName')
                break;
            case 'Device Type':
                modifier = getStringModifier('deviceType')
                break;
            case 'Healthy?':
                modifier = (a, b) => a.healthy - b.healthy
                break;
            case 'Added on':
                modifier = (a, b) => a.createdAt - b.createdAt
                break;
            default:
                error('Invalid Field')
                throw new Error();
        }
        array.sort(modifier)
        if (order === 'desc') array.reverse()
        updateDeviceData(array)
    }

    const addNewDevice = (payload) => {
        getDeviceData()
    }


    return (
        <DeviceContext.Provider value={{ deviceData, updateDeviceData, sortBy, addNewDevice }}>
            {props.children}
        </DeviceContext.Provider>
    )
}