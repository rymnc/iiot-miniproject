import { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AppContext } from '../context/ContextProvider'

export function PrivateRoute({ children, ...rest }) {
    const { validateToken } = useContext(AppContext)
    const [loggedIn, setLoggedIn] = useState(null)

    useEffect(() => {
        const validate = async () => {
            const valid = await validateToken(true)
            setLoggedIn(valid)
        }
        validate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        loggedIn !== null && <Route {...rest} render={({ location }) => {
            return (loggedIn === true)
                ? children
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: location }
                }}
                />
        }} />
    )
}