import style from "../styles/About.module.css";
import Head from "next/head";


export default function SignIp() {

    
    const router = useRouter()


    const[state, setState] = useState({
        username: "",
        email: "",
        password: ""
      })

    function fill(e) {
        const copy = { ...state }
        copy[e.target.name] = e.target.value
        setState(copy)
    }

    async function handle() {
        const res = await fetch('http://localhost:8080/auth/signin', {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.ok) {
            const json = await res.text()
            console.log(json)
            localStorage.setItem("token", json)
            router.push("/")
        }
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
                        <input type="text" name="password" placeholder="password" value={state.password} onChange={handle}/>
                    </div>
                    <button onClick={handle}>Submit</button>
                </div>
            </div>
        </>
    );
}