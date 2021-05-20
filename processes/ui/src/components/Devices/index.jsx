import React, { useContext, useEffect } from 'react'
import { Container, Col, Card, Table } from 'react-bootstrap'
import { AppContext } from '../../context/ContextProvider'
import useDeviceData from '../../hooks/useDeviceData'
import { apiClient } from '../../services/axios'
import SearchBar from './SearchBar'
import AllDevices from './AllDevices'
import Headings from './Headings'
import { useHistory } from 'react-router-dom'

const Devices = () => {
    const { error } = useContext(AppContext)
    const { deviceData, setDeviceData } = useDeviceData()
    const history = useHistory()

    const center = {
        textAlign: "-webkit-center",
        margin: "0",
        position: "absolute",
        top: "50%",
        msTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
    };

    const getDeviceData = async () => {
        try {
            const { data } = await apiClient.get('/devices/all')
            setDeviceData(data)
        } catch (e) {
            if (e?.response?.status === 401) {
                history.push('/login')
                error('Session Expired. Please Re-Login')
            } else {
                error('Could not fetch device data!')
            }
        }

    }
    useEffect(() => {

        getDeviceData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addNewDevice = async () => {
        await getDeviceData()
    }


    return (
        <Container fluid className="align-center" style={center}>
            <Col md={8} xs={12} lg={8} xl={6} sm={12}>
                <Card className="p-2 justify-content-center shadow-lg mx-3" border="info">
                    {deviceData.length === 0 ? <p>Looks like you have no devices! Press the "+" button to add one!</p> : null}
                    <SearchBar addNewDevice={addNewDevice} />
                    <Table striped bordered hover responsive="sm" className="rounded" size="sm">
                        <thead>
                            <tr>
                                {deviceData.length > 0 ? <Headings /> : null}
                            </tr>
                        </thead>
                        <tbody>
                            <AllDevices deviceData={deviceData} updateList={addNewDevice} />
                        </tbody>
                    </Table>
                </Card>
            </Col>
        </Container>
    )
}

export default Devices
