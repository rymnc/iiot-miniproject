import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../context/ContextProvider";

export function PrivateRoute({ children, ...rest }) {
  const { loggedIn } = useContext(AppContext);

  return (
    loggedIn !== null && (
      <Route
        {...rest}
        render={({ location }) => {
          return loggedIn === true ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          );
        }}
      />
    )
  );
}
