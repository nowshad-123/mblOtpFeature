import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './registration.css';

const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [number, setNumber] = useState('');
    const [sentOtp, setSentOtp] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [verifyClicked, setVerifyClicked] = useState(false); // Track whether the Verify button has been clicked
    const navigate = useNavigate();

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    };

    const handleOtp = async () => {
        setSentOtp(true);

        const { data } = await axios.post("https://otp-back-iymp.onrender.com/sendingOtp", {
            "firstName": firstName,
            "phone": number
        });

        alert(data.message);
    }

    const handleVerify = async () => {
        // Disable the button after clicking
        setVerifyClicked(true);

        const { data } = await axios.post('https://otp-back-iymp.onrender.com/verifyingOtp', {
            "firstName": firstName,
            "phone": number,
            "otpCode": otpCode
        });

        if (data.success) {
            // Assuming 'data' contains the token and phone number
            const { token, phone } = data;

            // Create an object to store in localStorage
            const userData = {
                token,
                phone,
            };

            // Convert the object to a JSON string and set it in localStorage
            localStorage.setItem('userData', JSON.stringify(userData));

            // Show an alert and navigate to '/private'
            alert("Verified");
            navigate('/private');
        }
    }

    return (
        <>
            <div className='regi_container_1'>
                <div className="regi_container_2">
                    {sentOtp ? (
                        <div className='details'>
                            <p className='msg'>Enter the OTP received on your registered mobile number</p>
                            <div className="col-3">
                                <input
                                    className={`effect-21 ${otpCode && 'has-content'}`}
                                    type="text"
                                    value={otpCode}
                                    onChange={(e) => setOtpCode(e.target.value)}
                                />
                                <label>Enter OTP</label>
                                <span className="focus-border">
                                    <i />
                                </span>
                            </div>
                            <div className="button">
                                <button onClick={handleVerify} disabled={verifyClicked}>Verify OTP</button>
                            </div>
                        </div>
                    ) : (
                        <div className='details'>
                            <h2>Sign up</h2>
                            <div className="col-3">
                                <input
                                    className={`effect-21 ${firstName && 'has-content'}`}
                                    type="text"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                />
                                <label>First Name</label>
                                <span className="focus-border">
                                    <i />
                                </span>
                            </div>
                            <div className="col-3">
                                <input
                                    className={`effect-21 ${number && 'has-content'}`}
                                    type="text"
                                    placeholder
                                    value={number}
                                    onChange={handleNumberChange}
                                />
                                <label>Number</label>
                                <span className="focus-border">
                                    <i />
                                </span>
                            </div>
                            <div className="alreadyUser">
                                <p className='alreadyUser_p'>Already User! <Link to="/login">Login</Link></p>
                            </div>
                            <div className="button">
                                <button onClick={handleOtp} disabled={verifyClicked}>Send OTP</button>
                            </div>
                        </div>
                    )}

                    <div className="info">
                        <h3>Glad to see You !!</h3>
                        <p className='greeting_p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint hic voluptatem exercitationem amet, voluptatibus cum magni molestiae delectus impedit, earum quis aperiam veniam. Nam error architecto corporis ipsum molestiae ad.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;
