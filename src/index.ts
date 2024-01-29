import * as dotenv from 'dotenv';
import twilio from 'twilio';

// Load environment variables
dotenv.config();

// Parse phone numbers from environment variable
const phoneNumbers = process.env.PHONE_NUMBERS?.split(',');

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Check if phoneNumbers is not undefined
if(phoneNumbers) {
	// Send a message to each phone number
	phoneNumbers.forEach(async (number) => {
		try {
			await client.messages.create({
				body: 'Your message here',
				from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
				to: number
			});
			console.log(`Message sent to ${number}`);
		} catch (error: any) {
			console.error(`Failed to send message to ${number}: ${error.message}`);
		}
	});
} else {
	console.error('No phone numbers provided');
}