"use client";
import React from "react";
import { getCollection, getDocument } from "@/config/firestore";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { where, limit, orderBy } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

function Submissions() {
  const params = useParams();
  const contestId = params.contest;

  const [submissions, setSubmissions] = useState();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchSubmissions = async () => {
        const submissionsData = await getCollection(
          ["submissions"],
          [
            orderBy("created_at", "desc"),
            where("user_id", "==", user.uid),
            where("contest_id", "==", contestId),
            limit(10),
          ]
        );
        setSubmissions(submissionsData);
      };
      fetchSubmissions();
    }
  }, [user]);

  const [participant, setParticipant] = useState();
  useEffect(() => {
    if (user) {
      const fetchParticipant = async () => {
        const participantData = await getDocument(
          ["contests", contestId, "participants"],
          user.uid
        );
        setParticipant(participantData);
      };
      fetchParticipant();
    }
  }, [user]);

  fetch;

  return (
    <section
      className="contest-container min-h-[calc(100vh-292px)]"
      data-aos="fade-in-up"
    >
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex flex-col gap-y-3">
          <h3>Submissions</h3>
          <hr />
        </div>
        {submissions && participant && submissions.length != 0 ? (
          <>
            <div className="flex flex-col gap-y-3">
              <div className="rounded border overflow-hidden flex flex-col gap-y-3 px-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Submitted</th>
                      <th>Problem</th>
                      <th>Language</th>
                      <th>Score</th>
                      <th>Time</th>
                      <th>Memory</th>
                      <th className="w-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission, index) => (
                      <tr key={index}>
                        <td>
                          {submission.created_at
                            .toDate()
                            .toLocaleString("en-US", {
                              year: "2-digit",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: false, // Use 24-hour format
                            })}
                        </td>
                        <td>
                          <Link
                            className="link"
                            href={`problems/${submission.problem_id}`}
                          >
                            {submission.problem_name}
                          </Link>
                        </td>
                        <td>{submission.language}</td>
                        <td>
                          {
                            submission.status.filter(
                              (element) => element === "Accepted"
                            ).length
                          }{" "}
                          / {submission.status.length}
                        </td>
                        <td>{submission.avg_time + "ms"}</td>
                        <td>{submission.avg_memory + "MB"}</td>
                        <td>
                          <Link
                            href={`/submissions/${submission.id}`}
                            className="link"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm">
                *Time and memory represent the average time and memory it takes
                for all your testcases to run
              </p>
            </div>
          </>
        ) : !participant || submissions.length == 0 ? (
          <p>No submissions available</p>
        ) : (
          <div className="flex justify-center items-center w-full h-24">
            <div className="loading-spinner-large"></div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Submissions;
