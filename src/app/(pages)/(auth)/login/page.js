"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "@/components/LoadingSpinner";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

function Login() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const teamEmailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const [passwordShow, setPasswordShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      await login(teamEmailRef.current.value, passwordRef.current.value);
      router.push("/dashboard");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setErrorMsg("Your email is invalid");
      } else if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setErrorMsg("Your email or password is incorrect");
      } else if (err.code === "auth/too-many-requests") {
        setErrorMsg("Too many requests");
      } else {
        setErrorMsg("An unknown error has occured :(");
      }
    }
    setLoading(false);
  };

  return (
    <section className="min-h-[calc(100vh-68px)] page-margins flex justify-center items-center">
      <div className="w-96 my-20 bg-white rounded flex items-center flex-col p-10 shadow relative">
        <div
          className={`w-[90%] bg-red-500 text-white flex gap-x-3 px-3 pt-1 rounded text-start absolute pb-4 -z-10 duration-200 ${
            errorMsg ? "bottom-[calc(100%-12px)]" : "bottom-0"
          }`}
        >
          <FontAwesomeIcon
            className="text-white h-4 mt-1"
            icon={faTriangleExclamation}
          />
          {errorMsg}
        </div>

        <div className="w-full flex justify-center items-center text-center gap-y-4 flex-col">
          <h2>Login</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-8 w-full py-8"
        >
          <div className="relative flex flex-col w-full h-10">
            <input
              className="input peer"
              placeholder="Team Email"
              id="team-email"
              type="email"
              ref={teamEmailRef}
            />
            <span className="input-underline"></span>
            <label htmlFor="team-email" className="input-label">
              Team Email
            </label>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="relative flex flex-col w-full h-10">
              <input
                className="peer input pr-8"
                placeholder="Password"
                id="password"
                type={passwordShow ? "text" : "password"}
                ref={passwordRef}
              />
              <span className="input-underline" />
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <button
                className=" peer-focus:text-palette-5 text-neutral-300 absolute right-2 bottom-2 h-4 w-4 flex justify-center items-start pb-[19px]"
                type="button"
                onClick={() => setPasswordShow(!passwordShow)}
              >
                <FontAwesomeIcon
                  className={`${passwordShow ? "h-4 w-4" : "h-4 w-4"}}`}
                  icon={passwordShow ? faEyeSlash : faEye}
                />
              </button>
            </div>
            <Link
              href={"/forgot-password"}
              className="w-full flex justify-end link"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="btn primary-btn h-10"
            type="submit"
            disabled={loading}
          >
            Submit{loading && <div className="loading-spinner-small"></div>}
          </button>
        </form>
        <hr className="w-full" />
        <div className="mt-8">
          <p>
            Don&apos;t have an account? Sign up{" "}
            <Link className="link" href={"/signup"}>
              here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
