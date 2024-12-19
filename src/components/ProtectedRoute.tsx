import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuthChecked, getUser} from "../services/user.slice.ts";
import AppLoadingIndicator from "./AppLoadingIndicator/AppLoadingIndicator.tsx";
import React, {FC} from "react";

type TProtectedProps = {
    onlyUnAuth?: boolean;
    component: React.JSX.Element;
}

const ProtectedRoute: FC<TProtectedProps> = ({onlyUnAuth = false, component}): React.JSX.Element => {
    const isAuthChecked: boolean = useSelector(getIsAuthChecked);
    const user = useSelector(getUser);
    const location = useLocation();

    if (!isAuthChecked) {
        return <div className="m-10">
            <AppLoadingIndicator/>
        </div>;
    }

    if (onlyUnAuth && user) {
        const {from} = location.state ?? {from: {pathname: "/ "}};
        return <Navigate to={from}/>;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return component;
}

export default ProtectedRoute;

export const UnAuthRoute = ({component}: { component: React.JSX.Element }): React.JSX.Element => (
    <ProtectedRoute onlyUnAuth={true} component={component}/>
);