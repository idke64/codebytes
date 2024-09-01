import { NextResponse } from "next/server";
import { addDocument, getDocument } from "@/config/firestore";

export async function POST(req) {
  const {
    tokens,
    userId,
    contestId,
    contestName,
    problemId,
    problemName,
    language,
    sourceCode,
  } = await req.json();

  const getUrl = `${process.env.JUDGE_URL}/submissions/batch?tokens=${tokens}&base64_encoded=false&fields=created_at,memory,status,time`;

  try {
    const submissionData = await getSubmissionData(getUrl);

    let participantData = await getDocument(
      ["contests", contestId, "participants"],
      userId
    );

    const accepted = submissionData.filter(
      (submission) => submission.status.description === "Accepted"
    ).length;

    const updatedCpScores = { ...participantData.cp_scores };
    updatedCpScores[problemId] = Math.max(
      accepted * 10,
      participantData.cp_scores[problemId]
    );

    participantData.cp_scores[problemId] = updatedCpScores[problemId];

    const sumOfCpScores = Object.values(updatedCpScores).reduce(
      (sum, score) => sum + score,
      0
    );
    const updatedEvents = [...participantData.events];
    updatedEvents[0] = sumOfCpScores;

    const updatedTotalPoints = Object.values(updatedEvents).reduce(
      (sum, score) => sum + score,
      0
    );

    await addDocument(
      ["contests", contestId, "participants"],
      {
        cp_scores: updatedCpScores,
        events: updatedEvents,
        school: participantData.school,
        team_name: participantData.team_name,
        total_points: updatedTotalPoints,
      },
      userId
    );

    const statusDescriptions = submissionData.map(
      (submission) => submission.status.description
    );

    const times = submissionData.map((submission) => submission.time * 1000);

    const memory = submissionData.map((submission) => submission.memory / 1000);

    const averageMemory = (
      memory.reduce((acc, c) => acc + c, 0) / memory.length
    ).toFixed(2);

    const averageTime = times.reduce((acc, c) => acc + c, 0) / times.length;

    const submissionId = await addDocument(["submissions"], {
      tokens: tokens,
      problem_name: problemName,
      problem_id: problemId,
      user_id: userId,
      language: language,
      source_code: sourceCode,
      points: accepted * 10,
      contest_id: contestId,
      contest_name: contestName,
      status: statusDescriptions,
      times: times,
      memory: memory,
      avg_time: averageTime,
      avg_memory: averageMemory,
    });

    return NextResponse.json(
      {
        participantData: participantData,
        submissionData: submissionData,
        submissionId: submissionId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process submissions." },
      { status: 500 }
    );
  }
}

async function getSubmissionData(url) {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      try {
        const getResponse = await fetch(url, { method: "GET" });
        const results = await getResponse.text();

        const submissionData = JSON.parse(results).submissions;

        let running = false;
        if (submissionData) {
          running = submissionData.some(
            (submission) =>
              submission.status.description === "Processing" ||
              submission.status.description === "In Queue"
          );
        }

        if (!running) {
          clearInterval(intervalId);
          resolve(submissionData);
        }
      } catch (error) {
        console.error("Error fetching submission data, retrying...", error);
      }
    }, 5000);

    // timeout after 30 seconds
    setTimeout(() => {
      clearInterval(intervalId);
      reject(new Error("Polling timed out"));
    }, 30000);
  });
}
