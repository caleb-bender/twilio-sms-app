/**
 * MessageCredentialsValidator.ts
 * Description: validates sent credentials used to send a message with Twilio
 */

export default class MessageCredentialsValidator {

    private _phoneNumber: string;
    private _nameOnMessage: string;
    private _contactGroups: string[];
    private _messageBody: string;

    public constructor(phoneNumber: string, nameOnMessage: string, contactGroups: string[], messageBody: string) {
        this._phoneNumber = phoneNumber;
        this._nameOnMessage = nameOnMessage;
        this._contactGroups = contactGroups;
        this._messageBody = messageBody;
    }

    public async validate() {

    }
}