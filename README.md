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
