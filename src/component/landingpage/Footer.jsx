// Importing the CSS file for styling the Home component
import '../../styles/Home.css'

// Defining the Footer functional component
const Footer = () => {
    return (
        // Main container for the footer section
        <div className='footer'>
            {/* Footer text */}
            <p>© 2024 Vehicle Rental Management Service. All rights reserved.</p>
            {/* List of footer links */}
            <ul>
                <li>Term of Services</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
    )
}

// Exporting the Footer component to be used in other parts of the application
export default Footer
