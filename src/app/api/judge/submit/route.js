import { NextResponse } from "next/server";

export async function POST(req) {
  const { language_id, source_code, problem_id } = await req.json();

  const getTestcases = async () => {
    //fetches testcases from github "database"
    const url = `https://raw.githubusercontent.com/idke64/codebytes-database/main/problems/${problem_id}/data.jsons`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/json",
        },
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.error(err);
    }
  };

  //submits code and testcases to judge
  const postUrl = `${process.env.JUDGE_URL}/submissions/batch?base64_encoded=false&fields=*`;

  let tokens = "";
  try {
    const testcases = await getTestcases();
    console.log(testcases);

    const inputs = testcases.inputs;
    const outputs = testcases.outputs;

    const response = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        submissions: inputs.map((input, index) => ({
          language_id: language_id,
          source_code: source_code,
          stdin: input,
          expected_output: outputs[index],
        })),
      }),
    });
    const results = await response.json();
    tokens = results.map((i) => i.token).join("%2C");
    return NextResponse.json({ tokens: tokens }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
