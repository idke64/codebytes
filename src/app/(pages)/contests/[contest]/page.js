"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getDocument, addDocument } from "@/config/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";
import contestInfo from "@/markdown/contests.json";

function ContestPage() {
  const params = useParams();
  const contestId = params.contest;

  const [contest, setContest] = useState();
  const [registered, setRegistered] = useState(false);
  const { user, userData } = useAuth();

  useEffect(() => {
    const fetchContest = async () => {
      const contestData = await getDocument(["contests"], contestId);
      setContest(contestData);
    };
    fetchContest();
  }, []);

  useEffect(() => {
    const checkParticipant = async () => {
      const participant = await getDocument(
        ["contests", contestId, "participants"],
        user.uid
      );
      if (participant) {
        setRegistered(true);
      }
    };
    if (user) {
      checkParticipant();
    }
  }, [user]);

  const handleRegistration = async () => {
    setRegistered(true);
    if (Date.now() < contest.end_time.toDate()) {
      await addDocument(
        ["contests", contestId, "participants"],
        {
          cp_scores: contest.problems.reduce((obj, problem) => {
            obj[problem.id] = 0;
            return obj;
          }, {}),
          events: Array(contest.events.length).fill(0),
          team_name: userData.team_name,
          school: userData.school,
          total_points: 0,
        },
        user.uid
      );
      await addDocument(
        ["users"],
        {
          created_at: userData.created_at,
          email: userData.email,
          school: userData.school,
          team_name: userData.team_name,
          contests: [...userData.contests, contestId],
        },
        user.uid
      );
    }
  };

  return (
    <>
      {contest ? (
        <>
          <section className="contest-container min-h-0 " data-aos="fade-in-up">
            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-y-0.5">
                    <h3>Contest Information</h3>

                    <p className="text-sm">
                      Events: {contest.events.length} | Duration:{" "}
                      {Math.round(
                        (contest.end_time.toDate() -
                          contest.start_time.toDate()) /
                          1000 /
                          60
                      )}{" "}
                      min | Status:{" "}
                      {Date.now() < contest.start_time.toDate()
                        ? "Upcoming"
                        : Date.now() > contest.end_time.toDate()
                        ? "Ended"
                        : "Live"}
                    </p>
                  </div>

                  <div className="relative group flex justify-center">
                    <button
                      onClick={() => handleRegistration()}
                      className="btn primary-btn h-9 relative"
                      disabled={
                        !user ||
                        registered ||
                        Date.now() > contest.end_time.toDate()
                      }
                    >
                      Register
                    </button>
                    {(!user ||
                      registered ||
                      Date.now() > contest.end_time.toDate()) && (
                      <span className="disabled-info">
                        {!user
                          ? "Login or create an account to register"
                          : registered
                          ? "You are already registered"
                          : Date.now() > contest.end_time.toDate() &&
                            "Registration is closed"}
                      </span>
                    )}
                  </div>
                </div>
                <hr className="w-full" />
              </div>
              {/* <p className="text-sm">
                  <div className="flex flex-col justify-end gap-y-0.5"> 

                  Events: {contest.events.length} | Duration:{" "}
                    {Math.round(
                      (contest.end_time.toDate() -
                        contest.start_time.toDate()) /
                        1000 /
                        60
                    )}
                    min |{" "}
                    {Date.now() < contest.start_time.toDate()
                      ? "Upcoming"
                      : Date.now() > contest.end_time.toDate()
                      ? "Ended"
                      : "Live"} 
                </p> */}

              <div className="flex flex-col gap-y-4">
                <Markdown
                  components={{
                    a(props) {
                      return (
                        <a
                          className="link"
                          href={props.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {props.children}
                        </a>
                      );
                    },
                    code(props) {
                      return (
                        <code className="px-1 bg-neutral-100 font-medium rounded font-mono py-0.5 text-sm">
                          {props.children}
                        </code>
                      );
                    },
                    li(props) {
                      return (
                        <li>
                          <p>{props.children}</p>
                        </li>
                      );
                    },
                  }}
                >
                  {contestInfo[contestId].contest}
                </Markdown>
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-4">
                  <Markdown
                    components={{
                      a(props) {
                        return (
                          <a
                            className="link"
                            href={props.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {props.children}
                          </a>
                        );
                      },
                      code(props) {
                        return (
                          <code className="px-1 bg-neutral-100 font-medium rounded font-mono py-0.5 text-sm">
                            {props.children}
                          </code>
                        );
                      },
                      li(props) {
                        return (
                          <li>
                            <p>{props.children}</p>
                          </li>
                        );
                      },
                    }}
                  >
                    {contestInfo[contestId].rules}
                  </Markdown>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="h-[calc(100vh-256px)]">
          <div className="flex justify-center items-center w-full h-24">
            <div className="loading-spinner-large"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContestPage;
