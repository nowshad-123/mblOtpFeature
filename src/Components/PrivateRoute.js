import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedToken = localStorage.getItem("userData");
                const parsedToken = JSON.parse(storedToken);

                if (!parsedToken || !parsedToken.token) {
                    setOk(false);
                } else {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${parsedToken.token}`;
                    const response = await axios.get('https://otp-back-iymp.onrender.com/userAuth');

                    if (response.data.success) {
                        setOk(true);

                    } else {
                        setOk(false);
                    }
                }
            } catch (error) {
                console.error('Error while fetching data:', error);
                setOk(false);
            }
        };

        fetchData();
    }, []);

    return ok ? <Outlet /> : "This page is only accessible to logged-in users. Please log in and try again.";
}
