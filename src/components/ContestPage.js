"use client";
import { useEffect, useState } from "react";

function ContestPage(props) {
  const contestId = props.contestId;
  const [contest, setContest] = useState();
  useEffect(() => {
    const fetchContest = async () => {
      const contestData = await getDocument("contests", contestId);
      setContest(contestData);
    };
    fetchContest();
  });

  return <div>ContestPage</div>;
}

export default ContestPage;
