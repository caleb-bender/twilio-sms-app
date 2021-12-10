/**
 * WizrdsFooter.tsx
 * Description: The footer visible all throughout the application with the copyright notice and socials.
 */

import React from "react";
import { Col, FlexboxGrid } from "rsuite";
import "./WizrdsFooter.css";

interface WizrdsFooterProps {
    darkTheme: boolean;
}


export default function WizrdsFooter(props: WizrdsFooterProps) {

    return <FlexboxGrid justify="space-between" align="middle" className="wizrds-footer" style={{ backgroundColor: props.darkTheme ? "black" : "#ccc" }}>
        <FlexboxGrid.Item as={Col}>
            <img src={`/wizrds_icon_${props.darkTheme ? "night" : "light"}_theme.png`} alt="company logo" style={{ width: "80px", height: "auto" }}/>
        </FlexboxGrid.Item>
    </FlexboxGrid>;
}