/**
 * LoginPage.tsx
 * Description: The first page the user sees that asks them to sign in to their Twilio account.
 */
import React from "react";
import TwilioLoginForm from "../components/auth/TwilioLoginForm";
import WizrdsFooter from "../components/footer/WizrdsFooter";

interface LoginPageProps {
    darkTheme: boolean;
}

export default function LoginPage(props: LoginPageProps) {
    return <>
        <TwilioLoginForm />
        <WizrdsFooter darkTheme={props.darkTheme}/>
    </>;
}