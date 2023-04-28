import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
export const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [SignedIn, setSignedIn] = useState('')
    const checkSignedIn = () => {
        const isSignedIn = localStorage.getItem("SignedIn")
        console.log(isSignedIn);
        if (!isSignedIn || isSignedIn === 'false') {
            navigate('/auth');
            setSignedIn('false')
        }
        setSignedIn('true');
    }
    useEffect(() => {
        checkSignedIn();
    }, [SignedIn]);
    return (
        <React.Fragment>
            {SignedIn ? props.children : null}
        </React.Fragment>
    );
}
