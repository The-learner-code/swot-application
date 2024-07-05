import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import '../styles/Contact.css';

const ContactUsForm = () => {
    const navigate = useNavigate();

    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "add web 3 forms api key");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

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
             <div className="c-back">
                <button onClick={() => navigate('/')} className="c-button-back">Back to Home</button>
            </div>
            <div className="container">
                <div className="content">
                    <div className="left-side">
                        <div className="address details">
                            <LocationOnIcon style={{ fontSize: 30, color: '#3e2093', marginBottom: 10 }} />
                            <div className="topic">Address</div>
                            <div className="text-one">Surkhet, NP12</div>
                            <div className="text-two">Birendranagar 06</div>
                        </div>
                        <div className="phone details">
                            <PhoneIcon style={{ fontSize: 30, color: '#3e2093', marginBottom: 10 }} />
                            <div className="topic">Phone</div>
                            <div className="text-one">+0098 9893 5647</div>
                            <div className="text-two">+0096 3434 5678</div>
                        </div>
                        <div className="email details">
                            <EmailIcon style={{ fontSize: 30, color: '#3e2093', marginBottom: 10 }} />
                            <div className="topic">Email</div>
                            <div className="text-one">codinglab@gmail.com</div>
                            <div className="text-two">info.codinglab@gmail.com</div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="topic-text">Send us a message</div>
                        <p>If you have any work from me or any types of queries related to my tutorial, you can send me a message from here. It's my pleasure to help you.</p>
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
                        <span>{result}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUsForm;
