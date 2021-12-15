import getAppDataPath from "appdata-path";
import path from "path";

const APP_DATA_DIRECTORY = path.join(getAppDataPath(), "Twilio-SMS-App"); 
// the cross platform app data directory
export default APP_DATA_DIRECTORY;