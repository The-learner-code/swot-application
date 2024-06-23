import React from 'react'
import '../Styles/Home.css'
import msg_icon from '../Assets/msg-icon.png'
import mail_icon from '../Assets/mail-icon.png'
import phone_icon from '../Assets/phone-icon.png'
import location_icon from '../Assets/location-icon.png'
import white_arrow from '../Assets/white-arrow.png'

const ContactUs = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "19e7e5e9-bf96-4ba4-bb6f-d2c6e79704a3");

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
    <div className='contactlp'>
      <div className="contact-col">
      <h3>Send us a message<img src={msg_icon} alt="" /></h3>
        <p>Feel free to reach out through our contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional vehicle rental services. We're here to assist you with all your rental needs.</p>
        <ul>
          <li><img src={mail_icon} alt="" />Contact@vrms.dev</li>
          <li><img src={phone_icon} alt="" />+1 123-456-7890</li>
          <li><img src={location_icon} alt="" />88 Seven block, T Nagar<br /> MA 02139, TamilNadu</li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your name</label>
          <input type="text" name='user_name' placeholder='Enter your name' required />
          <label>Phone Number</label>
          <input type="tel" name='user_phone_no' placeholder='Phone Number' required />
          <label>Write your message here</label>
          <textarea name="user_message" rows="6" placeholder='Enter your message' required></textarea>
          <button type='submit' className='btn dark-btn'>Submit now <img src={white_arrow} alt="" /></button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  )
}

export default ContactUs