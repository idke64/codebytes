"use client";

import React from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import defaultprofile from "@/assets/pictures/defaultprofile.png";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

function Team() {
  const { user, userData } = useAuth();

  const [teamMembers, setTeamMembers] = useState([]);

  const handleAddMember = () => {
    console.log("Add member");
  };

  useEffect(() => {
    if (userData) {
      setTeamMembers(userData.team_members);
    }
  }, [userData]);
  return (
    <>
      <div className="dashboard-container" data-aos="fade-in-up">
        <div className="flex flex-col gap-y-6 w-full">
          <div className="flex flex-col gap-y-3">
            <h3>Team</h3>
            <hr />
          </div>
          <div className="flex flex-col gap-y-8">
            <div className="p-2 border rounded">
              <h6>Joe Biden</h6>
              <p></p>
            </div>
          </div>
          <button
            onSubmit={handleAddMember}
            className="btn primary-btn h-9 self-start"
          >
            Add Member
          </button>
        </div>
      </div>
    </>
  );
}

export default Team;
