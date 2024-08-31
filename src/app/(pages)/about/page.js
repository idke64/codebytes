"use client";

import haroldasd from "@/assets/pictures/haroldasd.png";
import canchenl from "@/assets/pictures/canchenl.png";
import jackz from "@/assets/pictures/jackz.png";
import arthurc from "@/assets/pictures/arthurc.png";
import vinayn from "@/assets/pictures/vinayn.png";
import harryy from "@/assets/pictures/harryy.png";
import TeamCard from "@/components/TeamCard";
import Carousel from "@/components/Carousel";
import novembercontest from "@/assets/novembercontest/novembercontest.jpg";
import novembercontest2 from "@/assets/novembercontest/novembercontest2.jpg";
import novembercontest3 from "@/assets/novembercontest/novembercontest3.jpg";
import novembercontest4 from "@/assets/novembercontest/novembercontest4.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import "/src/aos-animations.css";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-sine",
      once: true,
    });
  });
  return (
    <>
      <section className="bg-bg-3">
        <div className="page-margins py-5 flex items-center">
          <h1 className="text-white text-5xl" data-aos="fade-in-right">
            About
          </h1>
        </div>
      </section>
      <section
        className="page-margins py-8 flex flex-col gap-y-6"
        data-aos="fade-in"
      >
        <div className="flex flex-col gap-y-3">
          <h2 className="relative block after:content-['HISTORY'] after:absolute after:font-bold after:text-palette-5 after:-top-6 after:text-lg after:left-0 max-sm:text-4xl mt-[25px]">
            Our Story
          </h2>
        </div>

        <div className="gap-y-4 gap-x-4">
          {/* <Image
            src={novembercontest}
            className="float-right m-1 w-[420px] object-cover rounded-md border shadow max-md:w-full max-md:h-60"
          /> */}
          <div className="w-[480px] h-[360px] max-md:w-full max-md:h-60 float-right px-6 py-2">
            <Carousel
              images={[
                novembercontest,
                novembercontest2,
                novembercontest3,
                novembercontest4,
              ]}
            />
          </div>

          <p>
            Welcome to CodeBytes, a regional competition founded by the 2023 -
            2024 computing clubs of Neuqua Valley High School and Naperville
            Central High School.
          </p>
          <br />
          <p>
            Made with the vision of creating an intuitive experience that
            incorporates the many flavors of computing, CodeBytes prides itself
            in its unique event structure and variability. We include the
            traditional competitive problems that national tournaments focus
            upon, as well as numerous subjects that reference the vast field of
            computer science (such as data science, web development, botting).
          </p>
          <br />

          <p>
            The story of CodeBytes returns to the summer of 2023, where the
            upcoming NVHS Computing Team Captains sought a way to enhance the
            competitive programming experience. Based in a region where
            little-to-no communication between adjacent schools&apos; teams
            existed, the norm in competitions was simply online, independent,
            national competitions that did not offer much at face value. Thus,
            the idea of a local recurring competition was born in the hearts of
            these founders.
          </p>
          <br />

          <p>
            One day, a meeting was called between NVHS and NCHS to discuss
            possible relations and to pitch the idea—only to discover that the
            NCHS Captains had also been in the works of forming their Computer
            Science League. Struck with the knowledge, the two teams came
            together to form CodeBytes over the span of several months.
          </p>
          <br />
          <p>
            Now, we are expanding, all in the hopes of achieving our goal of
            keeping competitive programming both engaging and relevant.
          </p>
        </div>
      </section>
      <hr className="page-margins" />
      <section className="py-8">
        <div className="page-margins flex flex-col gap-y-6" data-aos="fade-in">
          <div className="flex flex-col gap-y-3">
            <h2 className="relative block after:content-['TEAM'] after:absolute after:text-palette-5 after:text-boldd after:-top-6 after:text-lg after:left-0 max-sm:text-4xl mt-[25px]">
              Meet the Team
            </h2>
          </div>

          <div className="flex flex-col gap-y-4">
            <p>
              CodeBytes wouldn&apos;t be possible if it weren&apos;t for those
              who built the competition up from scratch (and of course, our
              supporters too!). This section is dedicated to these people, which
              will be updated as their path continues on to a new future.
            </p>

            <div className="grid-cols-3 grid max-md:grid-cols-2 gap-x-6 gap-y-6">
              <TeamCard
                name="Vinay Narahari"
                image={vinayn}
                role="Founder"
                quote="It is what it is"
              >
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  Vinay is a senior at Naperville Central looking to find an
                  intersection with CS and other fields. Known for his
                  quick-thinking, Vinay gets anything and everything done.{" "}
                </p>{" "}
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  He painfully enjoys the process of spending hours on stack
                  overflow and debugging to get his code to run. Outside of CS,
                  he spends his time breaking out of the stereotype by going to
                  the gym and taking showers.
                </p>
              </TeamCard>
              <TeamCard
                name="Harry Yu"
                image={harryy}
                role="Founder"
                quote="Mannn, I need bigger (insert muscle group here)"
              >
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  Harry Yu is a Senior at Naperville Central. He has invested
                  countless hours into getting good at CS and continues trucking
                  onwards despite the sunk cost fallacy.
                </p>
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  Harry Yu vehemently denies that Vinay showers, even if he
                  claims to do so in his description. Please subscribe to
                  Harry&apos;ls youtube channel: [REDACTED]
                </p>
              </TeamCard>
              <TeamCard name="Andy Ye" role="Founder" quote="I don't like bios">
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  Andy Ye is a graduating senior of the NVHS Class of 2024 who
                  likes to bike and play ping pong.
                </p>
              </TeamCard>
              <TeamCard
                name="Canchen Li"
                image={canchenl}
                role="Founder"
                quote="Please DM me 'uwu'"
              >
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  Canchen Li is a graduating senior of the NVHS Class of 2024,
                  who has to deal with Haroldas going: &quot;whatever jinkles
                  your jeepers&quot; during Computing Team meetings.
                </p>
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  Thanks to him being a weeb, he has decided to give up being
                  good at computing to go read visual novels instead. Did you
                  know that &quot;reizoukou&quot; means &quot;refrigerator&quot;
                  in Japanese?
                </p>
              </TeamCard>
              <TeamCard
                name="Haroldas Diska"
                image={haroldasd}
                role="Founder"
                quote="What do you mean I only have forty-five char-"
              >
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  Haroldas Diska is a graduating senior of NVHS Class of 2024,
                  aiming to study Chemistry and eventually slingshot into the
                  medical route.
                </p>
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  Thanks to their bilateral mechanical hearing loss, they spend
                  the majority of his free-time studying obscure topics that
                  nobody would ever want to touch, so that her memory does not
                  degrade into dementia. If approached, expect to be barraged
                  with random facts and studies. Prepare well.
                </p>
              </TeamCard>
              <TeamCard
                name="Arthur Cai"
                image={arthurc}
                role="Founder"
                quote="memory reboot"
              >
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  Arthur is a junior of NVHS class of 2025, dreaming of majoring
                  in computer science or engineering. Currently looking for any
                  opportunities to leave school as quickly as possible.
                </p>
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  According to Arthur, he is the definition of writing code that
                  doesn&apos;t work, running it, seeing that it doesn&apos;t
                  work, then running it again to make sure it really
                  doesn&apos;t work.
                </p>
              </TeamCard>
              <TeamCard
                name="Jack Zhou"
                image={jackz}
                role="Founder"
                quote="Watermelons..."
              >
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  Jack Zhou is a graduating senior from NVHS, an avid lover of
                  computer science, and extremely overqualified in all forms of
                  survival. Did he mean archivals?
                </p>
                <p className="text-sm whitespace-pre-wrap items-center text-center">
                  Obsesses over the fact that watermelon can act both as a drink
                  and a food at the same time. Jack Zhou commonly insists for
                  others to take a bite out of one. Clearly his favorite, or so
                  we&apos;ve been told.
                </p>
              </TeamCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
