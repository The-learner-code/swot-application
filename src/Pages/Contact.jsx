// Importing necessary modules from React and React Router
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importing icons from Material UI
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

// Importing the CSS file for styling the Contact component
import '../styles/Contact.css';

// Defining the ContactUsForm functional component
const ContactUsForm = () => {
    // Using useNavigate hook to programmatically navigate to different routes
    const navigate = useNavigate();
    
    // Defining a state variable to store the result of form submission
    const [result, setResult] = React.useState("");

    // Function to handle form submission
    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        // Adding access key to the form data
        formData.append("access_key", "add web 3 forms api key");

        // Sending form data to the API
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        // Handling the response from the API
        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div className="cbody">
            {/* Button to navigate back to the Home page */}
            <div className="c-back">
                <button onClick={() => navigate('/')} className="c-button-back">Back to Home</button>
            </div>
            {/* Main container for the contact form */}
            <div className="container">
                <div className="content">
                    {/* Left side containing contact details */}
                    <div className="left-side">
                        {/* Address details */}
                        <div className="address details">
                            <LocationOnIcon style={{ fontSize: 30, color: '#3e2093', marginBottom: 10 }} />
                            <div className="topic">Address</div>
                            <div className="text-one">Surkhet, NP12</div>
                            <div className="text-two">Birendranagar 06</div>
                        </div>
                        {/* Phone details */}
                        <div className="phone details">
                            <PhoneIcon style={{ fontSize: 30, color: '#3e2093', marginBottom: 10 }} />
                            <div className="topic">Phone</div>
                            <div className="text-one">+0098 9893 5647</div>
                            <div className="text-two">+0096 3434 5678</div>
                        </div>
                        {/* Email details */}
                        <div className="email details">
                            <EmailIcon style={{ fontSize: 30, color: '#3e2093', marginBottom: 10 }} />
                            <div className="topic">Email</div>
                            <div className="text-one">codinglab@gmail.com</div>
                            <div className="text-two">info.codinglab@gmail.com</div>
                        </div>
                    </div>
                    {/* Right side containing the contact form */}
                    <div className="right-side">
                        <div className="topic-text">Send us a message</div>
                        <p>If you have any work from me or any types of queries related to my tutorial, you can send me a message from here. It's my pleasure to help you.</p>
                        {/* Contact form */}
                        <form onSubmit={onSubmit} autoComplete='off'>
                            <div className="input-box">
                                <input type="text" name='user_name' placeholder="Enter your name" />
                            </div>
                            <div className="input-box">
                                <input type="text" name='user_phone_no' placeholder="Enter your Phone Number" />
                            </div>
                            <div className="input-box message-box">
                                <textarea name="user_message" placeholder="Enter your message"></textarea>
                            </div>
                            <div className="button">
                                <input type="submit" value="Send Now" />
                            </div>
                        </form>
                        {/* Displaying the result of form submission */}
                        <span>{result}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Exporting the ContactUsForm component to be used in other parts of the application
export default ContactUsForm;
