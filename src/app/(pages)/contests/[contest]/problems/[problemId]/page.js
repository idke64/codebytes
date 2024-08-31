"use client";

import ProblemNotFound from "@/components/ProblemNotFound";
import Selector from "@/components/Selector";
import TestcaseResult from "@/components/TestcaseResult";
import { addDocument, getCollection, getDocument } from "@/config/firestore";
import { useAuth } from "@/context/AuthContext";
import { Editor } from "@monaco-editor/react";
import clipboardCopy from "clipboard-copy";
import { limit, orderBy, where } from "firebase/firestore";
import "katex/dist/katex.min.css";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Latex from "react-latex-next";
import Link from "next/link";

const files = [
  {
    name: "C++",
    language: "cpp",
    language_id: 54,
    value:
      '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tstd::cout << "Hello World!";\n}',
  },
  {
    name: "C",
    language: "c",
    language_id: 48,
    value:
      '#include <stdio.h>\n\nint main() {\n\tprintf("Hello World!");\n\treturn 0;\n}',
  },
  {
    name: "Java",
    language: "java",
    language_id: 62,
    value:
      'import java.util.*;\nimport java.io.*;\n\npublic class Main //keep this class\n{\n\tpublic static void main(String[] args)\n\t{\n\t\tSystem.out.println("Hello World!");\n\t}\n}',
  },
  {
    name: "Python",
    language: "python",
    language_id: 71,
    value: 'print("Hello World!")',
  },
  {
    name: "JavaScript",
    language: "javascript",
    language_id: 63,
    value: 'console.log("Hello World!");',
  },
  {
    name: "Ruby",
    language: "ruby",
    language_id: 72,
    value: 'puts "Hello World!"',
  },
  {
    name: "Go",
    language: "go",
    language_id: 60,
    value:
      'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello World!")\n}',
  },
  {
    name: "C#",
    language: "csharp",
    language_id: 51,
    value:
      'using System;\n\nclass Program\n{\n\tstatic void Main()\n\t{\n\t\tConsole.WriteLine("Hello World!");\n\t}\n}',
  },
  {
    name: "Kotlin",
    language: "kotlin",
    language_id: 78,
    value: 'fun main() {\n\tprintln("Hello World!")\n}',
  },
  {
    name: "Rust",
    language: "rust",
    language_id: 73,
    value: 'fn main() {\n\tprintln!("Hello World!");\n}',
  },
];
function ContestProblems() {
  const params = useParams();
  const problemId = params.problemId;
  const contestId = params.contest;
  const [contest, setContest] = useState();
  const [problem, setProblem] = useState();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState();
  const router = useRouter();

  const { user, userData } = useAuth();

  useEffect(() => {
    const fetchProblem = async () => {
      const problemData = await getDocument(["problems"], problemId);
      setProblem(problemData);
    };

    fetchProblem();
  }, []);

  useEffect(() => {
    const fetchContest = async () => {
      const contestData = await getDocument(["contests"], contestId);
      setContest(contestData);
    };

    fetchContest();
  }, []);

  const [participant, setParticipant] = useState();

  const [toggleFetchParticipant, setToggleFetchParticipant] = useState(false);
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
  }, [user, toggleFetchParticipant]);

  const [latestSubmission, setLatestSubmission] = useState();

  useEffect(() => {
    if (user) {
      const fetchLatestSubmission = async () => {
        const latestSubmissionData = await getCollection(
          ["submissions"],
          [
            orderBy("created_at", "desc"),
            where("user_id", "==", user.uid),
            where("contest_id", "==", contestId),
            where("problem_id", "==", problemId),
            limit(1),
          ]
        );
        if (latestSubmissionData && latestSubmissionData.length > 0) {
          setLatestSubmission(latestSubmissionData[0]);
        }
      };
      fetchLatestSubmission();
    }
  }, [user]);

  const [copied, setCopied] = useState([false, false]);

  const inputRef = useRef();
  const outputRef = useRef();

  const options = {
    minimap: {
      enabled: false,
      readOnly: false,
    },
  };

  const handleCopy = (index, text) => {
    clipboardCopy(text);
    setCopied(copied.map((c, i) => (index === i ? true : c)));
  };

  const [fileIndex, setFileIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);
  const file = files[fileIndex];
  const editorRef = useRef();

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  let intervalId = null;

  const handleCodeSubmit = async () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      setSubmitted(true);
      setLoading(true);
      setSubmission([]);

      const submitResponse = await fetch("/api/judge/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language_id: file.language_id,
          source_code: editorRef.current.getValue(),
          problem_id: problemId,
        }),
      });

      const submitResults = await submitResponse.json();
      if (submitResponse.ok) {
        if (submitResults.error) {
          setLoading(false);
          return;
        }
        const submissionResponse = await fetch("/api/judge/get-submission", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokens: submitResults.tokens,
            userId: user.uid,
            contestId: contestId,
            contestName: contest.name,
            problemId: problemId,
            problemName: problem.name,
            language: file.name,
            sourceCode: editorRef.current
              .getValue()
              .replace(/\n/g, "\\n")
              .replace(/\t/g, "\\t"),
          }),
        });
        const submissionResults = await submissionResponse.json();
        if (submissionResponse.ok) {
          if (submissionResults.status === 500) {
            console.log("poop");
            setLoading(false);
            return;
          }
          setSubmission(submissionResults.submissionData);
          setParticipant(submissionResults.participantData);
          setLoading(false);
        } else {
          console.log("poopospdosd");
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // if (
  //   contest &&
  //   problem &&
  //   !contest.problems.some((p) => p.id === problem.id)
  // ) {
  //   return <NotFound />;
  // }

  return (
    <>
      <section className="contest-container" data-aos="fade-in-up">
        {(problem &&
          contest &&
          contest.problems.some((problem) => problem.id === problemId) &&
          Date.now() > contest.start_time.toDate()) ||
        (userData && userData.admin) ? (
          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between">
                  <h3>{problem.name}</h3>
                </div>

                <p className="text-sm">
                  Time Limit: {problem.time_limit} | Memory Limit:{" "}
                  {problem.memory_limit} | Standard Input | Standard Output
                </p>
              </div>

              <hr />
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <h5>Statement</h5>

                <div className="flex flex-col gap-y-4">
                  {problem.description?.split("\\n").map((line, index) => (
                    <p key={index}>
                      <Latex>{line}</Latex>
                    </p>
                  ))}
                  {problem.image && (
                    <Image
                      className="float-right m-1 w-80 object-cover rounded-md border shadow"
                      width={500}
                      height={500}
                      src={problem.image}
                      alt="picture"
                    />
                  )}
                </div>
              </div>
              <hr className="w-full" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-y-2">
                  <h5>Input Format</h5>

                  {problem.input_format?.split("\\n").map((line, index) => (
                    <p key={index}>
                      <Latex>{line}</Latex>
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-y-2">
                  <h5>Output Format</h5>

                  {problem.output_format?.split("\\n").map((line, index) => (
                    <p key={index}>
                      <Latex>{line}</Latex>
                    </p>
                  ))}
                </div>
              </div>
              <hr className="w-full"></hr>

              {problem.sample_inputs?.map((input, index) => (
                <div className="flex flex-col gap-4" key={index}>
                  <div className="flex flex-col gap-y-3">
                    <h5>Sample Input {index + 1}</h5>
                    <button
                      onClick={() =>
                        handleCopy(0, input.replaceAll("\\n", `\n`))
                      }
                      ref={inputRef}
                      className={`py-[6px] px-2 bg-bg-1 text-sm text-text-1 rounded-sm border flex justify-start text-start pr-16 relative after:content-['Copied!'] after:absolute after:right-0 after:-top-6 after:ease-linear after:duration-100  ${
                        copied[0]
                          ? "after:opacity-100 after:delay-0"
                          : "after:opacity-0 after:delay-[1.5s]"
                      }
                  `}
                      onTransitionEnd={() => {
                        setCopied(copied.map((c, i) => (i === 0 ? false : c)));
                      }}
                    >
                      <div className="flex flex-col text-text-2 text-sm font-mono">
                        {input.split("\\n").map((line, index) => (
                          <span key={index}>{line}</span>
                        ))}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <h5>Sample Output {index + 1}</h5>
                    <button
                      onClick={() =>
                        handleCopy(
                          1,
                          problem.sample_outputs[index].replaceAll("\\n", `\n`)
                        )
                      }
                      ref={outputRef}
                      className={`py-[6px] px-2 bg-bg-1 text-sm text-text-1 rounded-sm border flex justify-start text-start pr-16 relative after:content-['Copied!'] after:absolute after:right-0 after:-top-6 after:ease-linear after:duration-100 ${
                        copied[1]
                          ? "after:opacity-100 after:delay-0"
                          : "after:opacity-0 after:delay-[2s]"
                      }
                  `}
                      onTransitionEnd={() => {
                        setCopied(copied.map((c, i) => (i === 1 ? false : c)));
                      }}
                    >
                      <div className="flex flex-col font-mono">
                        {problem.sample_outputs[index]
                          .split("\\n")
                          .map((line, index) => (
                            <span key={index}>{line}</span>
                          ))}
                      </div>
                    </button>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5>Sample Description</h5>
                    {problem.sample_descriptions[index]
                      ?.split("\\n")
                      .map((line, index) => (
                        <p key={index}>
                          <Latex>{line}</Latex>
                        </p>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : contest && problem && Date.now() < contest.start_time.toDate() ? (
          <ProblemNotFound path={"/contests/" + contestId + "/problems"} />
        ) : contest &&
          problem &&
          !contest.problems.some((problem) => problem.id === problemId) ? (
          <ProblemNotFound path={"/contests/" + contestId + "/problems"} />
        ) : contest && !problem ? (
          <ProblemNotFound path={"/contests/" + contestId + "/problems"} />
        ) : (
          <div className="flex justify-center items-center w-full h-24">
            <div className="loading-spinner-large" />
          </div>
        )}
      </section>
      {problem &&
        contest &&
        contest.problems.some((problem) => problem.id === problemId) && (
          <section className="contest-container">
            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex flex-col gap-y-3">
                <h3>Submissions</h3>
                <hr />
              </div>
              <div className="w-full flex justify-between">
                <div className="flex gap-x-8 justify-between w-full">
                  <div className="w-44 flex mt-4 items-center h-10">
                    <Selector
                      options={files.map((file) => file.name)}
                      setOption={setFileIndex}
                      defaultOption={true}
                      label="Language"
                    />
                  </div>

                  <div className="w-44 flex mt-4 items-center h-10">
                    <Selector
                      options={["Light", "Dark"]}
                      setOption={setThemeIndex}
                      defaultOption={true}
                      label="Theme"
                    />
                  </div>
                </div>

                {/* <button className="btn secondary-btn h-9">Upload</button> */}
              </div>

              <div className="w-full h-96 flex items-center justify-center my-2 border">
                <Editor
                  height={"100%"}
                  width={"100%"}
                  theme={themeIndex == 0 ? "vs-light" : "vs-dark"}
                  defaultLanguage={file.language}
                  defaultValue={file.value}
                  path={file.name}
                  options={{ scrollBeyondLastLine: false }}
                  onMount={handleEditorDidMount}
                />
              </div>
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <p className="text-sm">
                    * Your code will not be saved. It is recommended to use an
                    external code editor.
                  </p>
                  <p className="text-sm">
                    * Submissions may take up to 30 seconds to run
                  </p>
                </div>
                <div className="relative group flex justify-center">
                  <button
                    onClick={handleCodeSubmit}
                    className="btn primary-btn h-9 relative"
                    disabled={
                      loading ||
                      !user ||
                      !participant ||
                      Date.now() > contest.end_time.toDate() ||
                      Date.now() < contest.start_time.toDate()
                    }
                  >
                    Submit
                    {loading && <div className="loading-spinner-small"></div>}
                  </button>
                  {(!user ||
                    !participant ||
                    Date.now() > contest.end_time.toDate() ||
                    Date.now() < contest.start_time.toDate()) && (
                    <span className="disabled-info">
                      {!user
                        ? "Login to submit"
                        : !participant
                        ? "Register to submit"
                        : (Date.now() > contest.end_time.toDate() ||
                            Date.now() < contest.start_time.toDate()) &&
                          "Submissions are only allowed during the contest"}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-y-2 flex-col">
                <h5>Results</h5>
                <div className="w-full grid grid-cols-10 max-sm:grid-cols-2 max-lg:grid-cols-5 gap-x-3 mt-3">
                  {submission && submission.length != 0 ? (
                    submission.map((submission, index) => (
                      <TestcaseResult
                        key={index}
                        description={submission.status.description}
                        time={(submission.time * 1000).toFixed(0) + "ms"}
                        memory={(submission.memory / 1000).toFixed(2) + "MB"}
                      />
                    ))
                  ) : latestSubmission && !submitted ? (
                    <>
                      {latestSubmission.status.map((testcase, index) => (
                        <TestcaseResult
                          key={index}
                          description={testcase}
                          time={latestSubmission.times[index] + "ms"}
                          memory={latestSubmission.memory[index] + "MB"}
                        />
                      ))}
                    </>
                  ) : (
                    [...Array(10)].map((_, index) => (
                      <TestcaseResult
                        key={index}
                        description={"Not Attempted"}
                      />
                    ))
                  )}
                </div>
                <div className="self-end relative group flex justify-center">
                  <button
                    className="btn primary-btn h-9 relative"
                    disabled={!latestSubmission && !submission}
                  >
                    <Link
                      href={`/submissions/${
                        submission
                          ? submission.id
                          : latestSubmission
                          ? latestSubmission.id
                          : ""
                      }`}
                    >
                      View Submission
                    </Link>
                  </button>
                  {!latestSubmission && !submission && (
                    <span className="disabled-info">
                      No submission available
                      {!latestSubmission}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
    </>
  );
}

export default ContestProblems;
