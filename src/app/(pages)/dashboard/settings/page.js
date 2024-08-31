"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Selector from "@/components/Selector";
import { useAuth } from "@/context/AuthContext";
import { addDocument } from "@/config/firestore";

function Setting() {
  const [currentPasswordShow, setCurrentPasswordShow] = useState(false);
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmNewPasswordShow, setConfirmNewPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [profileErrorMsg, setProfileErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState("");

  const teamNameRef = useRef();
  const teamEmailRef = useRef();

  const currPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  const schools = [
    "Neuqua Valley",
    "Naperville Central",
    "Naperville North",
    "Waubonsie Valley",
    "Benet Academy",
    "Other",
  ];

  const { user, userData, setUserData, checkPassword, changePassword } =
    useAuth();

  const [schoolIndex, setSchoolIndex] = useState();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const teamName = teamNameRef.current.value;
      const teamEmail = teamEmailRef.current.value;
      const school = schools[schoolIndex];

      if (
        teamName !== userData.team_name ||
        teamEmail !== userData.email ||
        school !== userData.school
      ) {
        if (teamName === "") {
          setProfileErrorMsg("Team Name cannot be empty");
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teamEmail)) {
          setProfileErrorMsg("Invalid email address");
          return;
        }
        setProfileErrorMsg("");
        setProfileSuccessMsg("Successfully updated profile");
        setLoading(true);

        await addDocument(
          ["users"],
          {
            created_at: userData.created_at,
            contests: userData.contests,
            team_name: teamName,
            school: school,
            email: teamEmail,
          },
          user.uid
        );
        setUserData((prevUserData) => ({
          ...prevUserData,
          team_name: teamName,
          school: school,
          email: teamEmail,
        }));
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const currPassword = currPasswordRef.current.value;
      const newPassword = newPasswordRef.current.value;
      const confirmNewPassword = confirmNewPasswordRef.current.value;

      if (!(await checkPassword(currPassword))) {
        setPasswordErrorMsg("Current password is incorrect");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setPasswordErrorMsg("New passwords do not match");
        return;
      }
      if (newPassword.length < 6) {
        setPasswordErrorMsg(
          "Your new password needs to be at least 6 characters long"
        );
        return;
      }
      setPasswordErrorMsg("");
      setPasswordSuccessMsg("Successfully updated password");
      setLoadingPassword(true);
      await changePassword(newPassword);
      setLoadingPassword(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userData) {
      setSchoolIndex(schools.indexOf(userData.school));
    }
  }, [userData]);

  return (
    <>
      <div className="w-full flex justify-between gap-x-6">
        <div className="dashboard-container w-1/2" data-aos="fade-in-up">
          <div className="flex flex-col gap-y-6 w-full">
            <div className="flex flex-col gap-y-3">
              <h3>Profile</h3>
              <hr />
            </div>
            {user && userData && schoolIndex + 1 ? (
              <div className="flex flex-col gap-y-1">
                <form
                  onSubmit={handleUpdate}
                  className="gap-y-8 pt-2 w-full flex flex-col"
                >
                  <div className="relative flex flex-col w-full h-10">
                    <input
                      className="peer input"
                      placeholder="Team Name"
                      id="team-name"
                      type="name"
                      defaultValue={userData.team_name}
                      ref={teamNameRef}
                    />
                    <span className="input-underline"></span>
                    <label htmlFor="team-name" className="input-label">
                      Team Name
                    </label>
                  </div>
                  <div className="relative flex flex-col w-full h-10">
                    <input
                      className="input peer"
                      placeholder="Team Email"
                      id="team-email"
                      type="email"
                      defaultValue={userData.email}
                      ref={teamEmailRef}
                    />
                    <span className="input-underline"></span>
                    <label htmlFor="team-email" className="input-label">
                      Team Email
                    </label>
                  </div>
                  <div className="relative flex flex-col w-full h-10">
                    <Selector
                      options={schools}
                      label="School"
                      setOption={setSchoolIndex}
                      defaultOption={true}
                      initialIndex={schoolIndex}
                    />
                  </div>
                  <button
                    className="btn primary-btn h-9 self-end"
                    disabled={loading}
                    type="submit"
                  >
                    Update
                    {loading && <div className="loading-spinner-small"></div>}
                  </button>
                </form>
                {profileErrorMsg == "" ? (
                  <div className="justify-end flex text-green-500 text-sm">
                    {profileSuccessMsg}
                  </div>
                ) : (
                  <div className="justify-end flex text-red-500 text-sm">
                    {profileErrorMsg}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-24">
                <div className="loading-spinner-large"></div>
              </div>
            )}
          </div>
        </div>
        <div className="dashboard-container w-1/2" data-aos="fade-in-up">
          <div className="flex flex-col gap-y-6 w-full">
            <div className="flex flex-col gap-y-3">
              <h3>Password</h3>
              <hr />
            </div>

            <div className="flex flex-col gap-y-1">
              <form
                onSubmit={handleChangePassword}
                className="gap-y-8 pt-2 w-full flex flex-col"
              >
                <div className="relative flex flex-col w-full h-10">
                  <input
                    className="peer input pr-8"
                    placeholder="Current Password"
                    id="current-password"
                    type={currentPasswordShow ? "text" : "password"}
                    ref={currPasswordRef}
                  />
                  <span className="input-underline" />
                  <label htmlFor="current-password" className="input-label">
                    Current Password
                  </label>
                  <button
                    className=" peer-focus:text-palette-5 text-neutral-300 absolute right-2 bottom-2 h-4 w-4 flex justify-center items-start pb-[19px]"
                    type="button"
                    onClick={() => setCurrentPasswordShow(!currentPasswordShow)}
                  >
                    <FontAwesomeIcon
                      className={`${
                        currentPasswordShow ? "h-4 w-4" : "h-4 w-4"
                      }}`}
                      icon={currentPasswordShow ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
                <div className="relative flex flex-col w-full h-10">
                  <input
                    className="peer input pr-8"
                    placeholder="New Password"
                    id="new-password"
                    type={newPasswordShow ? "text" : "password"}
                    ref={newPasswordRef}
                  />
                  <span className="input-underline" />
                  <label htmlFor="new-password" className="input-label">
                    New Password
                  </label>
                  <button
                    className=" peer-focus:text-palette-5 text-neutral-300 absolute right-2 bottom-2 h-4 w-4 flex justify-center items-start pb-[19px]"
                    type="button"
                    onClick={() => setNewPasswordShow(!newPasswordShow)}
                  >
                    <FontAwesomeIcon
                      className={`${newPasswordShow ? "h-4 w-4" : "h-4 w-4"}}`}
                      icon={newPasswordShow ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
                <div className="relative flex flex-col w-full h-10">
                  <input
                    className="peer input pr-8"
                    placeholder="Confirm New Password"
                    id="confirm-new-password"
                    type={confirmNewPasswordShow ? "text" : "password"}
                    ref={confirmNewPasswordRef}
                  />
                  <span className="input-underline" />
                  <label
                    htmlFfor="confirm-new-password"
                    className="input-label"
                  >
                    Confirm New Password
                  </label>
                  <button
                    className=" peer-focus:text-palette-5 text-neutral-300 absolute right-2 bottom-2 h-4 w-4 flex justify-center items-start pb-[19px]"
                    type="button"
                    onClick={() =>
                      setConfirmNewPasswordShow(!confirmNewPasswordShow)
                    }
                  >
                    <FontAwesomeIcon
                      className={`${
                        confirmNewPasswordShow ? "h-4 w-4" : "h-4 w-4"
                      }}`}
                      icon={confirmNewPasswordShow ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
                <button
                  className="btn primary-btn h-9 self-end"
                  disabled={loadingPassword}
                  type="submit"
                >
                  Change Password
                  {loadingPassword && (
                    <div className="loading-spinner-small"></div>
                  )}
                </button>
              </form>
              {passwordErrorMsg == "" ? (
                <div className="justify-end flex text-green-500 text-sm">
                  {passwordSuccessMsg}
                </div>
              ) : (
                <div className="justify-end flex text-red-500 text-sm">
                  {passwordErrorMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
