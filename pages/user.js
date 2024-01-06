import style from "../styles/About.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";

const User = () => {
    const [userName, setUserName] = useState("");
    const [item, setItem] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setItem(token);
            fetchContent(token);
        }
    }, []);

    async function fetchContent(token) {
        try {
            const res = await fetch('http://localhost:8080/secured/user', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });
            if (res.ok) {
                const json = await res.text();
                setUserName(json);
            } else {
                setUserName(""); // Reset userName if the request fails or is unauthorized
            }
        } catch (error) {
            console.error("Error occurred: ", error);
            setUserName(""); // Reset userName in case of an error
        }
    }

    return (
        <>
            <Head>
                <title>USER</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={style.containerSign}>
                <div className={style.form}>
                    {item !== null ?
                        (userName ? <p>Signed in as: {userName}</p> : <p>UNAUTHORIZED</p>)
                        :
                        <p>UNAUTHORIZED</p>
                    }
                </div>
            </div>
        </>
    );
}

export default User;
