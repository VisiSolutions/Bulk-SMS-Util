import * as dotenv from 'dotenv';
import twilio from 'twilio';
import readline from 'readline';

// Load environment variables
dotenv.config();

// Parse phone numbers from environment variable
const phoneNumbers = process.env.RECIPIENTS?.split(',');

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const client = twilio(apiKey, apiSecret, { accountSid });

// Create readline interface
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Ask user for message
rl.question('Please enter the message to send: ', (message) => {
	// Check if phoneNumbers is not undefined
	if(phoneNumbers) {
		// Send a message to each phone number
		phoneNumbers.forEach(async (number) => {
			try {
				await client.messages.create({
					body: message,
					messagingServiceSid: process.env.TWILIO_SENDER, 
					to: number
				});
				console.log(`Message sent to ${number}`);
			} catch (error: any) {
				console.error(`Failed to send message to ${number}: ${error.message}`);
				console.error(error);
			}
		});
	} else {
		console.error('No phone numbers provided');
	}

	// Close readline interface
	rl.close();
});