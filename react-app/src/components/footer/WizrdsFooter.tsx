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
// Icons for the footer
import WizrdsIcon from "./icons/wizrds_icon.png";
import FacebookIcon from "./icons/facebook-icon.svg";
import TwitterIcon from "./icons/twitter-icon.svg";
import LinkedInIcon from "./icons/linkedin-icon.svg";


export default function WizrdsFooter(props: WizrdsFooterProps) {

    const socialIconStyle: React.CSSProperties = {
        width: "32px",
        margin: "0.3rem",
        filter: props.darkTheme ? "invert(1.0)" : "none"
    };
    
    return <FlexboxGrid justify="space-between" align="middle" className="wizrds-footer" style={{ position: "fixed", backgroundColor: props.darkTheme ? "black" : "#eee" }}>
        <FlexboxGrid.Item as={Col}>
            <FlexboxGrid as={Col} justify="center" align="middle">
                <FlexboxGrid.Item as={Col}>
                    <a href="https://webwizrds.com/" target="_blank">
                        <img src={WizrdsIcon} alt="company logo" style={{ width: "80px", height: "auto", filter: props.darkTheme ? "invert(1.0)" : "none" }} />
                    </a>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col}>
                    <p>&copy; {new Date().getFullYear()} Copyright Wizrds LLC.</p>
                    <p>A Mister Waverly Company</p>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item as={Col}>
            <p>Dream Developers.</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item as={Col}>
            <FlexboxGrid as={Col} justify="center" align="middle">
                <FlexboxGrid.Item as={Col}>
                    FOLLOW US
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col}>
                    {/* Icons by icon king1 on https://freeicons.io/profile/3 */}
                    <a href="https://www.facebook.com/webwizrds" target="_blank">
                        <img src={FacebookIcon} alt="facebook link" style={socialIconStyle}/>
                    </a>
                    <a href="https://twitter.com/WebWizrds" target="_blank">
                        <img src={TwitterIcon} alt="twitter link" style={socialIconStyle}/>
                    </a>
                    <a href="https://www.linkedin.com/company/wizrds-llc" target="_blank">
                        <img src={LinkedInIcon} alt="linkedin link" style={socialIconStyle}/>
                    </a>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </FlexboxGrid.Item>
    </FlexboxGrid>;
}