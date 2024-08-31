"use client";
import { getCollection, getDocument } from "@/config/firestore";
import { useAuth } from "@/context/AuthContext";
import { documentId, limit, orderBy, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

function Dashboard() {
  const { user, userData } = useAuth();

  const [submissions, setSubmissions] = useState();
  const [contests, setContests] = useState([]);

  useEffect(() => {
    if ((user, userData)) {
      const fetchSubmissions = async () => {
        const submissionsData = await getCollection(
          ["submissions"],
          [
            orderBy("created_at", "desc"),
            where("user_id", "==", user.uid),
            limit(10),
          ]
        );
        setSubmissions(submissionsData);
      };
      fetchSubmissions();

      const fetchContests = async () => {
        let contestsData = await getCollection(
          ["contests"],
          [where(documentId(), "in", userData.contests), limit(10)]
        );
        contestsData.sort((b, a) => a.end_time - b.end_time);
        for (let i = 0; i < contestsData.length; i++) {
          const participantData = await getDocument(
            ["contests", contestsData[i].id, "participants"],
            user.uid
          );
          contestsData[i].participant = participantData;
        }

        setContests(contestsData);
      };

      if (userData.contests && userData.contests.length > 0) {
        fetchContests();
      }
    }
  }, [user, userData]);

  // useEffect(() => {
  //   const fetchParticipants = async () => {};
  //   fetchParticipants();
  // }, [contest]);

  return (
    <>
      <div className="flex flex-col gap-y-6 w-full">
        <div className="dashboard-container " data-aos="fade-in-up">
          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-col gap-y-3">
              <h3>Contests</h3>
              <hr />
            </div>
            {/* {console.log(contests.length + " sdamoisdma")} */}
            {contests && userData && contests.length != 0 ? (
              <div className="rounded border overflow-hidden flex flex-col gap-y-3 px-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Contest</th>
                      <th>Date</th>
                      <th>Total Points</th>
                      <th>Distribution</th>
                      <th className="w-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {contests.map((contest, index) => (
                      <tr key={index}>
                        <td>{contest.name}</td>
                        <td>
                          {contest.start_time.toDate().toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td>{contest.participant.total_points}</td>
                        <td>{contest.participant.events.join(", ")}</td>
                        <td>
                          <Link
                            className="link"
                            href={`/contests/${contest.id}`}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : contests && (contests.length == 0 || contests == undefined) ? (
              <p className="text-sm">No contests available</p>
            ) : (
              <div className="flex justify-center items-center w-full h-24">
                <div className="loading-spinner-large"></div>
              </div>
            )}
          </div>
        </div>
        <div className="dashboard-container" data-aos="fade-in-up">
          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-col gap-y-3">
              <h3>Submissions</h3>
              <hr />
            </div>
            {submissions && submissions.length != 0 ? (
              <>
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
                              href={`contests/${submission.contest_id}/problems/${submission.problem_id}`}
                            >
                              {submission.problem_name}
                            </Link>
                          </td>

                          <td>{submission.language}</td>
                          <td>
                            <div className="bg-white">
                              {
                                submission.status.filter(
                                  (element) => element === "Accepted"
                                ).length
                              }{" "}
                              / {submission.status.length}
                            </div>
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
                {/* <div className="flex self-end gap-x-2">
                  <div className="rounded px-2 w-7 h-7 flex items-center justify-center hover text-text-2 hover:text-white hover:bg-palette-2 duration-100">
                    <FontAwesomeIcon icon={faChevronLeft} className="h-3" />
                  </div>
                  <div className="rounded px-2 w-7 h-7 flex items-center justify-center text-text-2 hover:bg-palette-2 hover:text-white duration-100 cursor-pointer">
                    1
                  </div>
                  <div className="rounded px-2 w-7 h-7 flex items-center justify-center text-text-2 hover:bg-palette-2 hover:text-white duration-100 cursor-pointer">
                    2
                  </div>
                  <div className="rounded px-2 w-7 h-7 flex items-center justify-center text-text-2 hover:bg-palette-2 hover:text-white duration-100 cursor-pointer">
                    3
                  </div>
                  <div className="rounded px-2 w-7 h-7 flex items-center justify-center text-text-2 hover:bg-palette-2 hover:text-white duration-100 cursor-pointer">
                    4
                  </div>
                  <div className="rounded px-2 w-7 h-7 flex items-center justify-center hover text-text-2 hover:text-white hover:bg-palette-2 duration-100">
                    <FontAwesomeIcon icon={faChevronRight} className="h-3" />
                  </div>
                </div> */}
              </>
            ) : submissions && submissions.length == 0 ? (
              <p>No submissions available</p>
            ) : (
              <div className="flex justify-center items-center w-full h-24">
                <div className="loading-spinner-large"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
