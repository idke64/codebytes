"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { redirect } from 'next/navigation'


function ForgotPassword() {
  const { user } = useAuth();
  const emailRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      redirect("/dashboard");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      await resetPassword(emailRef.current.value);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      if (
        err.code === "auth/invalid-email" ||
        err.code === "auth/user-not-found"
      ) {
        setErrorMsg("Your email is invalid");
      } else {
        setErrorMsg("An unknown error has occured :(");
      }
    }
    setLoading(false);
  };

  return (
    <section className="min-h-[calc(100vh-68px)] page-margins flex justify-center items-center">
      {!success ? (
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
          <div className="flex flex-col items-center gap-y-5">
            <h2 className="text-center">Reset Password</h2>
            <p className="text-sm text-center">
              Enter the email associated with your account and we&apos;ll send
              you a link to reset your password
            </p>
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
                ref={emailRef}
              />
              <span className="input-underline"></span>
              <label htmlFor="team-email" className="input-label">
                Team Email
              </label>
            </div>
            <button
              className="btn primary-btn h-9"
              type="submit"
              disabled={loading}
            >
              Submit{loading && <div className="loading-spinner-small"></div>}
            </button>
          </form>
        </div>
      ) : (
        <div className="w-96 my-20 bg-white rounded flex items-center flex-col p-10 shadow relative">
          <div className="flex flex-col items-center gap-y-5">
            <h2 className="text-center">Success!</h2>
            <p className="text-center">
              You should receive an email with instructions to reset your
              password.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ForgotPassword;
