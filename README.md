# twilio-sms-app

## Introduction

This desktop app was built using the framework [electron](https://www.electronjs.org/) and allows users to send SMS messages to
contacts using Twilio's API. Similar to what [Remind](https://www.remind.com/) does, this app allows one to create contacts, organize contact groups, and send messages using a virtual Twilio phone number. Below I will give you a brief demo of how to use the app.

## Setup

First, you will need a Twilio account. You can get a trial account for free with ease. Head [here](https://www.twilio.com/try-twilio) to sign for a free account. It will ask you to put in your credentials like so:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-signup.JPG" width="1000"/>

Once you have signed up, Twilio will prompt you to verify your email before you are able to continue. Head to the email address you specified and verify your Twilio account. Once your email is verified, you will need to give Twilio your phone number for verification purposes. The prompt will look like this:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-verify-phone.JPG" width="1000"/>

Then, you will need to enter the verification code sent via SMS to your phone. Once verfied, you'll see a screen that will briefly ask you a few inputs concerning how you plan to use Twilio. For example, you could fill it  out like this:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-specify-use.JPG" />

These preferences can be changed later, but it's best to fill it out as I have shown to be optimally configured for `twilio-sms-app`. After this step, you'll be taken to the Twilio dashboard where you will need to go through several tooltips before seeing everything clearly. Subsequently, you should see something like this:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-dashboard.JPG" width="1200"/>

Notice in the top left you start with $15.50 of credits, more than enough to test the API with this app. You'll also notice that you can obtain one free north american phone number (`twilio-sms-app` only works with north american numbers anyway). Click "Get a Twilio phone number" to get a virtual phone number to use for sending SMS messages. After a few seconds, Twilio will have created your very own virtual phone number. Yay!

## Installation

If you have a Windows PC, head over to the releases tab and download the zip folder for Windows x64. Otherwise, if you have a Mac or Linux machine, then you will need to clone this repository and run the following build commands in the command line:

For Mac:
```
/twilio-sms-app (main) cd react-app
/twilio-sms-app/react-app (main) npm run build
/twilio-sms-app/react-app (main) cd ../electron-app
/twilio-sms-app/electron-app (main) npm run build-electron-mac
```

For Linux:
```
/twilio-sms-app (main) cd react-app
/twilio-sms-app/react-app (main) npm run build
/twilio-sms-app/react-app (main) cd ../electron-app
/twilio-sms-app/electron-app (main) npm run build-electron-lin
```

## Authenticating with Twilio

Once you have installed and built `twilio-sms-app`, head to the "application/dist/win-unpacked/" folder on Windows and "electron-app/dist/mac-unpacked" on Mac and "electron-app/dist/lin-unpacked" on Linux respectively. The last thing before launch is to create a `.env` file with the following variables in the unpacked folder:

```
APP_NAME=Twilio SMS App
NODE_ENV=production
```

Then, launch on the "Twilio SMS App" application (it usually takes 15-20 seconds to load the login screen). The login screen will look like this:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-login.JPG" width="1200"/>

Notice that I toggled the theme in the top left corner. If you get tired of blinding white screens, feel free to toggle it to dark since the default is light. The form requires that you enter your Account SID and Auth Token in order to use the app. This is because every message you send will use Twilio to deliver it to your recipients.

Upon authenticating for the first time, `twilio-sms-app` will create a directory with the name of your Account SID, or username, on your computer. All contact data you create with the app is saved locally in your PC's application data directory. However, the Auth Token is NEVER saved to disk. This is a private token that you must keep hidden from anyone else, as if someone gains access to it, it could compromise your account. When you login, the Auth Token is loaded into session memory but once you logout or close the app, the memory is cleared.

To enter your credentials, go to your Twilio dashboard and copy both the SID and token and paste them into their respective fields. See below:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-account-creds.JPG" width="1200"/>

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-account-creds-entered.JPG" width="1200"/>

Once you have done this, click login!

## Creating Contacts and Contact Groups

Before you can send any messages, you are going to need to create some contacts. Here is the main screen you will see upon authenticating:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-main-screen.JPG" width="1200"/>

Enter in your name and phone number and click create. The newly created entry will appear in the contacts list upon searching for it:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-create-contact.JPG" width="1200"/>

As you create more and more contacts, it will become harder to keep track of them all, which is where searching for first and/or last name becomes useful. In addition, partitioning contacts becomes necessary, which is where contact groups come in handy. To create a contact group, simply type the name you want and click create:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-create-contact-group.JPG" />

To add contacts to a contact group, click on the pencil icon. Then, you can select/search for preexisting contacts to add to the group. When you are satisfied, click "Save Changes". Finally, click the "X" to close the modal.

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-edit-contact-group.JPG" />

To delete a contact group, simply tap the trash can icon and confirm the deletion in the popup. You may also modify/delete contacts in the same way. Contact groups hold references to contacts, so when you modify/delete a contact, those changes propogate to all contact groups that reference it.

## Sending a Message

Now it's time to send a message. Before continuing, create a new contact group called "Message Test" and add yourself as a contact. Subsequently, under Message Management, click "Create New Message". You will then be greeted with this popup:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-create-message.JPG" />

The first time you send a message you will need to provide your Twilio virtual phone number your created earlier and your display name on the message. After this, the app will autofill those credentials for you. To get your Twilio phone number, head to your dashboard and it will be listed under your SID and token. Copy and paste the number into the field and specify your display name. Next, you will need to specify at least one contact group. Add the "Message Test" contact group you created and specify a message. Your form should look something like this:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-message-form-filled.JPG" />

Make sure you only specified youself under the contact group, because with a Twilio trial account, there is one extra step involved to send messages to those other than yourself. If you click on "Send Message", you will see the sent message show up on your phone!

Suppose you tried to send a message to one of your friends. In doing so, you would get this error message:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-message-error.JPG" />

With a Twilio trial account, you can only send messages to verified numbers, i.e. numbers that have given Twilio consent to receive messages. If you purchase a Twilio phone number, then you can send messages to unverified numbers. However, to stick to the free tier, go to the url specified in the message to verify a phone number other than your own. In doing so, you will arrive at this page:

<img src="https://caleb-bender.com/images/twilio-sms-app/twilio-verified-numbers.JPG" />

In the top right, click "Add a new Caller ID". Then, specify the person's phone number and have the code be sent over SMS (enabled by default). Once you have filled in the fields, click "Verify number". The individual will receive a verification code that you will need to enter to verify them. Once you submit the verification code, you will be able to send them messages!

## Logging Out

To log out of `twilio-sms-app`, either close the app or click the top right exit icon and confirm.

## Conclusion

I hope you have a good overview on how to use `twilio-sms-app` and thank you for taking the time to read!
















