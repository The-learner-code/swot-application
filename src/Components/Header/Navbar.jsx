import { useState, useEffect } from "react";
import { auth, db } from "../../firebase"; // Assuming db is Firestore
import CallIcon from '@mui/icons-material/Call';
import "./navbar.css";
import { getDoc, doc } from "firebase/firestore";

const Navbar = () => {

    const [name, setName] = useState("");

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    try {
                        const docRef = doc(db, `AuthDetails/${user.email}`);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            setName(userData.Name);
                        } else {
                            setName("No name found");
                        }
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                        setName("Error fetching user data");
                    }
                } else {
                    setName("VRMS - Admin");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setName("Error fetching name");
            }
        };

        fetchUserName();
    }, []);

    return (
        <div className="navbar">
            <div className="wrapper">
                <span>{name}</span>
                <div className="item">
                    <CallIcon className="icon" /> Contact : vrms@gmail.com</div>
            </div>
        </div>
    );
};

export default Navbar;
