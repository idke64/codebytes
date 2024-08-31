"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "@/components/LoadingSpinner";
import Selector from "@/components/Selector";

function SignUp() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      redirect("/dashboard");
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const teamNameRef = useRef();
  const teamEmailRef = useRef();
  const passwordRef = useRef();
  const [schoolIndex, setSchoolIndex] = useState(0);
  const { signup } = useAuth();

  const schools = [
    "None",
    "Neuqua Valley",
    "Naperville Central",
    "Naperville North",
    "Waubonsie Valley",
    "Benet Academy",
    "Other",
  ];

  const [passwordShow, setPasswordShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      const school = schools[schoolIndex];
      await signup(
        teamNameRef.current.value,
        teamEmailRef.current.value,
        passwordRef.current.value,
        school
      );
      redirect("/dashboard");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setErrorMsg("Invalid Email");
      } else if (err.code === "auth/weak-password") {
        setErrorMsg("Password needs to be at least 6 characters long");
      } else if (err.code === "auth/email-already-in-use") {
        setErrorMsg("There is already an account with this email");
      } else {
        setErrorMsg("An unknown error has occured :(");
        console.error(err);
      }
    }
    setLoading(false);
  };
  return (
    <>
      <div className="min-h-[calc(100vh-68px)] page-margins flex justify-center items-center">
        <div className="w-96 my-20 py-10 bg-white rounded flex items-center flex-col p-10 shadow relative">
          <div
            className={`w-[90%] bg-red-500 text-white flex gap-x-3 px-3 pt-1 rounded text-start absolute pb-4 -z-10 duration-200  ${
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
            <h2>Sign Up</h2>
          </div>

          <form
            className="flex flex-col gap-y-8 w-full py-8"
            onSubmit={handleSubmit}
          >
            <div className="relative flex flex-col w-full h-10">
              <input
                className="peer input"
                placeholder="Team Name"
                id="team-name"
                type="name"
                ref={teamNameRef}
              />
              <span className="input-underline"></span>
              <label htmlFor="team-name" className="input-label">
                Team Name
              </label>
            </div>

            <div className="relative flex flex-col w-full h-10">
              <input
                className="peer input"
                placeholder="Team Email"
                id="team-email"
                type="email"
                ref={teamEmailRef}
              />
              <span className="input-underline" />
              <label htmlFor="team-email" className="input-label">
                Team Email
              </label>
            </div>
            {/* <div className="relative flex flex-col w-full h-10">
              <input
                className="peer input"
                placeholder="School"
                id="school"
                ref={schoolRef}
              />
              <span className="input-underline" />
              <label htmlFor="school" className="input-label">
                School
              </label>
            </div> */}
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
                className={`peer-focus:text-palette-5 text-neutral-300 absolute right-2 bottom-2 h-4 w-4 flex justify-center items-start pb-[19px]  `}
                type="button"
                onClick={() => setPasswordShow(!passwordShow)}
              >
                <FontAwesomeIcon
                  className={`${passwordShow ? "h-4 w-4" : "h-4 w-4"}}`}
                  icon={passwordShow ? faEyeSlash : faEye}
                />
              </button>
            </div>
            <div className="relative flex flex-col w-full h-10">
              <Selector
                label="School"
                options={schools}
                setOption={setSchoolIndex}
              />
            </div>

            <button
              className="btn primary-btn h-9"
              disabled={loading}
              type="submit"
            >
              Submit{loading && <div className="loading-spinner-small"></div>}
            </button>
          </form>
          <hr className="w-full" />
          <div className="mt-8">
            <p>
              Already have an account? Login{" "}
              <Link className="link" href={"/login"}>
                here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
