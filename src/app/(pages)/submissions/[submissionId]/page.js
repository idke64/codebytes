"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getDocument } from "@/config/firestore";
import { Editor } from "@monaco-editor/react";
import TestcaseResult from "@/components/TestcaseResult";

const monacoLanguages = {
  "C++": "cpp",
  C: "c",
  Java: "java",
  Python: "python",
  JavaScript: "javascript",
  Ruby: "ruby",
  Go: "go",
  "C#": "csharp",
  Kotlin: "kotlin",
  Rust: "rust",
};

function Submission() {
  const params = useParams();
  const submissionId = params.submissionId;
  const [teamName, setTeamName] = useState();

  const [submission, setSubmission] = useState();

  useEffect(() => {
    const fetchSubmission = async () => {
      const submissionData = await getDocument(["submissions"], submissionId);
      setSubmission(submissionData);
    };
    fetchSubmission();
  }, []);
  useEffect(() => {
    const fetchTeamName = async () => {
      const teamData = await getDocument(["users"], submission.user_id);
      setTeamName(teamData.team_name);
    };
    if (submission) {
      fetchTeamName();
    }
  }, [submission]);

  const editorRef = useRef();

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <>
      <section className="bg-bg-3">
        <div className="page-margins py-5 flex items-center">
          <h1 className="text-white text-5xl" data-aos="fade-in-right">
            Submission
          </h1>
        </div>
      </section>
      {submission && teamName ? (
        <section className="page-margins flex flex-col py-8 gap-y-4">
          <div className="flex flex-col gap-y-3">
            <div className="flex justify-between items-end">
              <h3>Submission ID: {submissionId}</h3>
              <p>
                {submission.created_at.toDate().toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false, // Use 24-hour format
                })}
              </p>
            </div>

            <hr />
          </div>
          <div className="flex flex-col gap-y-2">
            <h4>Source Code</h4>
            <div className="w-full h-96 flex items-center justify-centers my-2 border">
              <Editor
                height={"100%"}
                width={"100%"}
                theme={"vs-light"}
                defaultLanguage={monacoLanguages[submission.language]}
                defaultValue={eval("`" + submission.source_code + "`")}
                path={"submission"}
                onMount={handleEditorDidMount}
                options={{
                  readOnly: true,
                  scrollBeyondLastLine: false,
                  readOnlyMessage: "",
                }}
              />
            </div>
          </div>

          <hr />
          <div className="flex flex-col gap-y-2">
            <h4>Details</h4>
            <div className="flex flex-col gap-y-1 my-2">
              <div className="rounded border overflow-hidden flex flex-col gap-y-3 px-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Team</th>
                      <th>Contest</th>
                      <th>Problem</th>
                      <th>Language</th>
                      <th>Time</th>
                      <th>Memory</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {submission.status.reduce((count, currStatus) => {
                          if (currStatus === "Accepted") {
                            return count + 1;
                          }
                          return count;
                        }, 0) == submission.status.length ? (
                          <span className="text-green-400 font-bold">
                            Accepted
                          </span>
                        ) : (
                          <span className="text-red-500 font-bold">
                            Wrong Answer
                          </span>
                        )}
                      </td>
                      <td>{teamName}</td>
                      <td>{submission.contest_name}</td>
                      <td>{submission.problem_name}</td>

                      <td>{submission.language}</td>
                      <td>{submission.avg_time}ms</td>
                      <td>{submission.avg_memory}MB</td>
                      <td>{submission.points}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-y-2">
            <h4>Test Cases</h4>
            <div className="w-full grid grid-cols-10 max-sm:grid-cols-2 gap-x-3 mt-3">
              {submission.status.map((status, index) => (
                <TestcaseResult
                  key={index}
                  description={status}
                  time={submission.times[index] + "ms"}
                  memory={submission.memory[index] + "MB"}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="h-[828px]">
          <div className="flex justify-center items-center w-full h-28">
            <div className="loading-spinner-large"></div>
          </div>
        </section>
      )}
    </>
  );
}

export default Submission;
