import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Container, Form, Button, Col } from 'react-bootstrap'
import { AppContext } from '../../context/ContextProvider'
import { apiClient } from '../../services/axios'

const Login = () => {
    const history = useHistory();
    const { toggleLogin, setNewToken, success, error } = useContext(AppContext)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const { data } = await apiClient.post('/auth/login', {
                email,
                password
            })
            console.log(data)
            setNewToken(data.token)
            toggleLogin(true)
            success('Successfully Logged in')
            history.push('/user')
        } catch (e) {
            error(e.message)
        }
    }

    const center = {
        textAlign: '-webkit-center',
        margin: '0',
        position: 'absolute',
        top: '50%',
        msTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)'
    }

    return (
        <Container fluid className="align-center" style={center}>
            <Col md="auto" xs={12} lg={4} xl={4} sm={12}>
                <Card className="p-2 justify-content-center" border="info">
                    <h2>
                        Login
                    </h2>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={onEmailChange} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={onPasswordChange} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="outline-primary" onClick={login} type="submit" className="my-2">
                            Login
                        </Button>
                    </Form>
                </Card>
            </Col>

        </Container>
    )
}

export default Login
