"use client";
import { countDocuments, getCollection, getDocument } from "@/config/firestore";
import { orderBy } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfilePicture } from "@/config/storage";
import defaultprofile from "@/assets/pictures/defaultprofile.png";
import Image from "next/image";

function ContestRankings() {
  const params = useParams();
  const contestId = params.contest;

  const [participants, setParticipants] = useState();
  const [contest, setContest] = useState();

  const [page, setPage] = useState(0);
  const [participantsCount, setParticipantsCount] = useState(200);

  useEffect(() => {
    const fetchContest = async () => {
      const contestData = await getDocument(["contests"], contestId);
      setContest(contestData);
    };
    fetchContest();

    const fetchParticipantsCount = async () => {
      const participantsCount = await countDocuments([
        "contests",
        contestId,
        "participants",
      ]);
      setParticipantsCount(participantsCount);
    };
    fetchParticipantsCount();
  }, []);

  useEffect(() => {
    const fetchParticipants = async () => {
      let participantsData = await getCollection(
        ["contests", contestId, "participants"],
        [orderBy("total_points", "desc")]
      );
      for (let i = 0; i < participantsData.length; i++) {
        const userData = await getDocument(["users"], participantsData[i].id);
        if (!userData) {
          continue;
        }
        participantsData[i].team_name = userData?.team_name;
        participantsData[i].school = userData?.school;
      }

      for (let i = 0; i < participantsData.length; i++) {
        participantsData[i].photoURL = await getProfilePicture(
          participantsData[i].id
        );
      }
      console.log(participantsData);
      setParticipants(participantsData);
    };

    fetchParticipants();
  }, []);

  // const [lastVisible, setLastVisible] = useState(null);

  // useEffect(() => {
  //   const fetchParticipants = async () => {
  //     let result;
  //     if (lastVisible && page > 0) {
  //       // Fetch the next 15 participants starting after the last visible document
  //       result = await getCollection(
  //         ["contests", contestId, "participants"],
  //         [orderBy("total_points", "desc"), startAfter(lastVisible), limit(1)]
  //       );
  //       console.log(query);
  //     } else {
  //       // Fetch the first 15 participants
  //       result = await getCollection(
  //         ["contests", contestId, "participants"],
  //         [orderBy("total_points", "desc"), limit(1)]
  //       );
  //     }
  //     const { participantsData, snapshot } = result;

  //     setParticipants(participantsData);
  //     setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
  //   };

  //   fetchParticipants();
  // }, [page]);

  return (
    <section
      className="contest-container min-h-[calc(100vh-292px)]"
      data-aos="fade-in-up"
    >
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex flex-col gap-y-3">
          <h3>Rankings</h3>
          <hr />
        </div>
        {participants && participants.length != 0 ? (
          <>
            <div className="flex flex-col gap-y-3">
              <div className="rounded border overflow-x-auto flex flex-col gap-y-3 px-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="min-w-[60px]">Rank</th>
                      <th className="min-w-[300px]">Team</th>
                      <th className="min-w-[140px]">School</th>
                      <th className="min-w-[150px]">Total Points</th>
                      {contest.events.map((event, index) => (
                        <th className="min-w-[60px]" key={index}>
                          {event.split(" ").length > 1
                            ? event
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                            : event.slice(0, 2)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((participant, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="flex items-center gap-x-1">
                            <div className="rounded-[50%] overflow-hidden h-5 w-5">
                              <Image
                                src={
                                  participant.photoURL
                                    ? participant.photoURL
                                    : defaultprofile
                                }
                                width={500}
                                height={500}
                                className="w-full h-full object-cover"
                                alt="profile picture"
                              />
                            </div>
                            <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                              {participant.team_name}
                            </div>
                          </div>
                        </td>
                        <td>{participant.school}</td>

                        <td>
                          {participant.events.reduce(
                            (sum, curr) => sum + curr,
                            0
                          )}
                        </td>
                        {participant.events.map((point, index) => (
                          <td key={index}>{point}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className="w-full flex justify-end">
                <div className="flex gap-x-2">
                  <button
                    className="btn h-8 w-8 hover:bg-neutral-200 flex justify-center items-center duration-200"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button
                    className="btn h-8 w-8 hover:bg-neutral-200 flex justify-center items-center duration-200"
                    onClick={() => setPage(page + 1)}
                    disabled={page === Math.floor(participantsCount / 1) - 1}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div> */}
              <p className="text-sm">
                *Only submissions made within the allotted contest period are
                accepted.
              </p>
            </div>
          </>
        ) : participants && participants.length == 0 ? (
          <p>No rankings available</p>
        ) : (
          <div className="flex justify-center items-center w-full h-24">
            <div className="loading-spinner-large"></div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ContestRankings;
