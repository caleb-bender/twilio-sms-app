/**
 * TwilioLoginForm.tsx
 * Description: The initial form that the user sees when opening the app. This component will send data to Twilio to authenticate
 * the user.
 */
import React, { useState } from "react";
import { InputGroup, Button, Message, Input } from "rsuite";
import { Visible, Unvisible } from "@rsuite/icons";
import "./TwilioLoginForm.css";

export default function TwilioLoginForm() {

    const [authTokenVisible, setAuthTokenVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const toggleVisibility = () => {
        setAuthTokenVisible(!authTokenVisible);
    };

    return <div className="twilio-login-form">
        <h3 style={{ textAlign: "center" }}>Login with your Twilio credentials</h3>
        <div className="twilio-login-form-body">
            <InputGroup className="form-element">
                <Input name="twilio-account-sid" id="twilio-account-sid" placeholder="Account SID" />
            </InputGroup>
            <InputGroup className="form-element">
                <Input name="twilio-auth-token" id="twilio-auth-token" placeholder="Auth Token" type={authTokenVisible ? "text" : "password"}/>
                <InputGroup.Button onClick={toggleVisibility}>
                    {authTokenVisible ? <Visible/> : <Unvisible/>}
                </InputGroup.Button>
            </InputGroup>
            <Button appearance="primary" className="form-element">Login</Button>
            <Message showIcon type="error" header="Error" hidden={errorMsg ? false : true} className="form-element">
                {errorMsg}
            </Message>
        </div>
    </div>;
}