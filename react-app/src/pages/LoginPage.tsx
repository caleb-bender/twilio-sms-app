/**
 * LoginPage.tsx
 * Description: The first page the user sees that asks them to sign in to their Twilio account.
 */
import React from "react";
import TwilioLoginForm from "../components/auth/TwilioLoginForm";

interface LoginPageProps {
    darkTheme: boolean;
}

export default function LoginPage(props: LoginPageProps) {
    return <TwilioLoginForm />;
}