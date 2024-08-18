import React from "react";
import "./Login.css";
import logo from "../../assets/MovieNet_Text.png";
import { login, signup } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function Login() {
  const [signState, setSignState] = React.useState("Sign In");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function user_auth(event) {
    event.preventDefault();
    console.log(email);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  }

  async function handleGoogle(event) {
    event.preventDefault();
    const provider = await new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await addDoc(collection(db, "user"), {
        uid: user.uid,
        authProvider: "google",
        name: user.displayName,
        email: user.email,
        avatar: "../public/imgs/avatar.png",
        createTime: serverTimestamp(),
      });

      console.log("User logged in and stored in Firestore:", user);
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <img src={logo} className="brand" />
      </div>
      <section className="login">
        <div className="form-box">
          <form>
            <h2>{signState}</h2>
            {/* PUT HERE ADDITIONAL INPUT FOR SIGN UP */}

            {signState === "Sign Up" && (
              <div className="inputbox">
                <i class="ri-user-line"></i>
                <input
                  placeholder=""
                  title="username"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  type="text"
                />
                <label htmlFor="">Username</label>
              </div>
            )}

            <div className="inputbox">
              <i className="ri-mail-line"></i>
              <input
                placeholder=""
                title="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <label htmlFor="">Email</label>
            </div>

            <div className="inputbox">
              <i className="ri-lock-line"></i>
              <input
                placeholder=""
                title="pw"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <label htmlFor="">Password</label>
            </div>

            <div className="forget">
              <label htmlFor="">
                <input type="checkbox" /> Remember Me
              </label>
              <a className="switch" href="#">
                Forgot Password?
              </a>
            </div>

            <button onClick={user_auth} type="submit">
              {signState}
            </button>

            <div className="register">
              {signState === "Sign In" ? (
                <p>
                  Don't have an account?{" "}
                  <a
                    className="switch"
                    href="#"
                    onClick={() => {
                      setSignState("Sign Up");
                    }}
                  >
                    Register
                  </a>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <a
                    className="switch"
                    href="#"
                    onClick={() => {
                      setSignState("Sign In");
                    }}
                  >
                    Sign In Now
                  </a>
                </p>
              )}
            </div>

            {/* OR Divider */}

            <div className="or-divider">
              <hr className="line" />
              <span className="or-text">OR</span>
              <hr className="line" />
            </div>

            {/* Sign In with Google */}
            <div className="google-sign-in-box">
              <button onClick={handleGoogle} className="gsi-material-button">
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      style={{ display: "block" }}
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents">
                    Sign in with Google
                  </span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
