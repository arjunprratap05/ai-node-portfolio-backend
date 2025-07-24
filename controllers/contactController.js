const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

async function sendContactEmail(req, res) {
    const { name, email, mobile, subject, message } = req.body;
    
    const contactRecipientEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL || 'arjun.pratap05@gmail.com';

    if (!name || !email || !mobile || !message) {
        return res.status(400).json({ success: false, message: 'Name, Email, Mobile Number, and Message are required fields.' });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: contactRecipientEmail,   
            subject: `Portfolio Contact: ${subject || 'No Subject'} from ${name}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mobile Number:</strong> ${mobile}</p>
                <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <p>This message was sent from your portfolio contact form.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Contact form email sent successfully to ${contactRecipientEmail}!`);
        res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });

    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.', error: error.message });
    }
}

module.exports = {
    sendContactEmail
};