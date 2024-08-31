"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCollection, getDocument } from "@/config/firestore";
import { getDoc } from "firebase/firestore";
import Image from "next/image";
import loading from "@/assets/loading.svg";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircle,
  faMinus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";

const pulseRow = (count) => {
  const cells = [];
  for (let i = 0; i < count; i++) {
    cells.push(
      <td>
        <div className="h-6 animate-pulse bg-gray-200 rounded-sm"></div>
      </td>
    );
  }
  return cells;
};

function ProblemPage() {
  const params = useParams();
  const contestId = params.contest;

  const [contest, setContest] = useState();

  const [problemList, setProblemList] = useState();

  const [participant, setParticipant] = useState();

  const { user } = useAuth();

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

  useEffect(() => {
    const fetchContest = async () => {
      const contestData = await getDocument(["contests"], contestId);
      setProblemList(contestData.problems);
      setContest(contestData);
    };
    fetchContest();
  }, []);

  const { userData } = useAuth();

  return (
    <section
      className="contest-container min-h-[calc(100vh-292px)]"
      data-aos="fade-in-up"
    >
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex flex-col gap-y-3">
          <h3>Problems</h3>
          <hr />
        </div>
        {(contest && userData && userData.admin) ||
        (contest &&
          problemList &&
          participant &&
          Date.now() > contest.start_time.toDate()) ||
        (contest && problemList && Date.now() > contest.end_time.toDate()) ? (
          <>
            <div className="flex flex-col gap-y-3">
              <div className="rounded border overflow-hidden flex flex-col gap-y-3 px-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-10"></th>
                      <th>Points</th>
                      <th>Name</th>
                      <th>Time Limit</th>
                      <th>Memory Limit</th>
                      <th className="w-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {problemList?.map((problem, index) => (
                      <tr key={index}>
                        <td>
                          <div className="w-full flex justify-center">
                            {participant?.cp_scores[problem.id] == 100 ? (
                              <FontAwesomeIcon
                                className="text-green-500 h-5 font-bold"
                                icon={faCheck}
                              />
                            ) : (
                              <div className="text-orange-300 font-bold">
                                {participant?.cp_scores[problem.id]}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div>{problem.points}</div>
                        </td>

                        <td>{problem.name}</td>
                        <td>{problem.time_limit}</td>
                        <td>{problem.memory_limit}</td>
                        <td>
                          <Link
                            href={`problems/${problem.id}`}
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
                *Only submissions made within the allotted contest period are
                accepted.
              </p>
            </div>
          </>
        ) : contest && !participant ? (
          <p>Register first to access contest problems</p>
        ) : contest && Date.now() < contest.start_time.toDate() ? (
          <p>The contest has not started</p>
        ) : (
          <div className="flex justify-center items-center w-full h-24">
            <div className="loading-spinner-large"></div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProblemPage;
