import { useRouter } from "next/router"
import style from "../styles/About.module.css";
import Head from "next/head";
import { useState } from "react"


export default function SignUp() {

    const router = useRouter()


    const[state, setState] = useState({
        username: "",
        email: "",
        password: ""
      })

    async function handle() {
        const res = await fetch('http://localhost:8080/auth/signup', {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.ok) {
            alert("success, baby!")
            router.push("/signin")
        }
    }

    function extract(e) {
        const copy = { ...state }
        copy[e.target.name] = e.target.value
        setState(copy)
    } 




    return(
        <>
            <Head>
                <title>Sign in</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={style.containerSign}>
                <div className={style.form}>
                    <h1>Sign ip</h1>
                    <div>
                        <input type="text" name="username" placeholder="username" value={state.username} onChange={handle} autoComplete="off"/>
                    </div>
                    <div>
                        <input type="text" name="email" placeholder="email" value={state.email} onChange={handle} autoComplete="off"/>
                    </div>
                    <div>
                        <input type="text" name="password" placeholder="password" value={state.password} onChange={handle}/>
                    </div>
                    <button onClick={handle}>Submit</button>
                </div>
            </div>
        </>
    );
}