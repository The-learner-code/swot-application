// Import necessary modules and components
import { useState, useEffect } from "react"; // React hooks for state management and side effects
import { auth, db } from "../../firebase"; // Firebase authentication and Firestore database
import CallIcon from '@mui/icons-material/Call'; // Icon for contact information
import "./navbar.css"; // Navbar CSS for styling
import { getDoc, doc } from "firebase/firestore"; // Firestore functions to get documents

const Navbar = () => {
    const [name, setName] = useState(""); // State to hold the user's name

    useEffect(() => {
        // Function to fetch the user's name from Firestore
        const fetchUserName = async () => {
            try {
                const user = auth.currentUser; // Get the current authenticated user
                if (user) {
                    try {
                        const docRef = doc(db, `AuthDetails/${user.email}`); // Reference to the user's document in Firestore
                        const docSnap = await getDoc(docRef); // Fetch the document snapshot
                        if (docSnap.exists()) {
                            const userData = docSnap.data(); // Extract user data from the document
                            setName(userData.Name); // Set the user's name
                        } else {
                            setName("No name found"); // Handle case where no document is found
                        }
                    } catch (error) {
                        console.error("Error fetching user data:", error); // Log any error to the console
                        setName("Error fetching user data"); // Set error message
                    }
                } else {
                    setName("VRMS - Admin"); // Default name if no user is authenticated
                }
            } catch (error) {
                console.error("Error fetching user data:", error); // Log any error to the console
                setName("Error fetching name"); // Set error message
            }
        };

        fetchUserName(); // Call the function to fetch the user's name on component mount
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="navbar">
            <div className="wrapper">
                <span>{name}</span> {/* Display the user's name */}
                <div className="item">
                    <CallIcon className="icon" /> Contact : vrms@gmail.com {/* Contact information */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
