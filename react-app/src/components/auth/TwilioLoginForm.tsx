/**
 * TwilioLoginForm.tsx
 * Description: The initial form that the user sees when opening the app. This component will send data to Twilio to authenticate
 * the user.
 */
import React, { useEffect, useState } from "react";
import { InputGroup, Button, Message, Input, Whisper, Tooltip } from "rsuite";
import { Visible, Unvisible } from "@rsuite/icons";
import "./TwilioLoginForm.css";
import { useNavigate } from "react-router-dom";
const { ipcRenderer } = window.require("electron");

export default function TwilioLoginForm() {

    const [authTokenVisible, setAuthTokenVisible] = useState(false);
    // use the react router nagivate function to go to the home screen once authenticated
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleVisibility = () => {
        setAuthTokenVisible(!authTokenVisible);
    };
    
    const clearErrorMsg = () => {
        setErrorMsg("");
    };

    const loginWithCredentials = () => {
        setLoading(true);
        clearErrorMsg();
        const accountSid = (document.getElementById("twilio-account-sid") as HTMLInputElement).value;
        const authToken = (document.getElementById("twilio-auth-token") as HTMLInputElement).value;
        ipcRenderer.send("login-to-twilio", { accountSid, authToken });
    };

    useEffect(() => {
        ipcRenderer.on("login-success", (event: any) => {
            setLoading(false);
            clearErrorMsg();
            navigate("/home");
            ipcRenderer.removeAllListeners(["login-success"]);
        });
        ipcRenderer.on("login-error", (event: any, errorMsg: string) => {
            setLoading(false);
            setErrorMsg(errorMsg);
            ipcRenderer.removeAllListeners(["login-error"]);
        });
        return () => ipcRenderer.removeAllListeners(["login-success", "login-error"]);
    });


    return <div className="twilio-login-form">
        <h3 style={{ textAlign: "center" }}>Login with your Twilio credentials</h3>
        <div className="twilio-login-form-body">
            <InputGroup className="form-element">
                <Whisper trigger="focus" speaker={<Tooltip>Use Ctrl/Cmd + C to copy the Account SID and use Ctrl/Cmd + V to paste</Tooltip>}>
                    <Input name="twilio-account-sid" id="twilio-account-sid" placeholder="Account SID" onFocus={clearErrorMsg}/>
                </Whisper>
            </InputGroup>
            <InputGroup className="form-element">
                <Whisper trigger="focus" speaker={<Tooltip>Use Ctrl/Cmd + C to copy the Auth Token and use Ctrl/Cmd + V to paste</Tooltip>}>
                    <Input name="twilio-auth-token" id="twilio-auth-token" placeholder="Auth Token" type={authTokenVisible ? "text" : "password"} onFocus={clearErrorMsg}/>
                </Whisper>
                <InputGroup.Button onClick={toggleVisibility}>
                    {authTokenVisible ? <Visible/> : <Unvisible/>}
                </InputGroup.Button>
            </InputGroup>
            <Message showIcon type="error" header="Error" hidden={errorMsg ? false : true} className="form-element">
                {errorMsg}
            </Message>
            <Button appearance="primary" className="form-element" onClick={loginWithCredentials} loading={loading}>Login</Button>
        </div>
    </div>;
}