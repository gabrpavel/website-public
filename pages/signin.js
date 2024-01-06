import style from "../styles/About.module.css";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import Head from "next/head";

export default function SignIn() {
    const router = useRouter();

    const [state, setState] = useState({
        username: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmit() {
        try {
            const res = await fetch('http://localhost:8080/auth/signin', {
                method: "POST",
                body: JSON.stringify(state),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const json = await res.json();
                localStorage.setItem("token", json.token);
                router.push("/");
            }
        } catch (error) {
            console.error("Error occurred: ", error);
            // Handle error, e.g., show an error message to the user
        }
    }

    return (
        <>
            <Head>
                <title>Sign in</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={style.containerSign}>
                <div className={style.form}>
                    <h1>Sign in</h1>
                    <div>
                        <input type="text" name="username" placeholder="username" value={state.username} onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="password" value={state.password} onChange={handleChange}/>
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
}
