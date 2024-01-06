import { useRouter } from "next/router";
import style from "../styles/About.module.css";
import Head from "next/head";
import { useState } from "react";

export default function SignUp() {
    const router = useRouter();

    const [state, setState] = useState({
        username: "",
        email: "",
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
            const res = await fetch('http://localhost:8080/auth/signup', {
                method: "POST",
                body: JSON.stringify(state),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                alert("Success, baby!");
                router.push("/signin");
            }
        } catch (error) {
            console.error("Error occurred: ", error);
            // Handle error, e.g., show an error message to the user
        }
    }

    return (
        <>
            <Head>
                <title>Sign up</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={style.containerSign}>
                <div className={style.form}>
                    <h1>Sign up</h1>
                    <div>
                        <input type="text" name="username" placeholder="username" value={state.username} onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="text" name="email" placeholder="email" value={state.email} onChange={handleChange}/>
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
