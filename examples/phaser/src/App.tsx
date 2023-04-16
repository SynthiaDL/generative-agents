import React from "react";
import "./App.css";
import PhaserGame from "./phaserGame";
import { Agent, AgentEngine } from "generative-agents";

function App() {
  const ae = new AgentEngine(process.env.REACT_APP_OPENAI_API_KEY ?? "");

  const agent = new Agent(ae, "id_1", "Buri Buri Zaemon", 24, {
    background: "A Samurai",
    currentGoal: "slay the dragon",
    innateTendency: ["brave", "rude", "lonewolf"],
    learnedTendency: ["swordsmanship", "archery", "fishing"],
    lifestyle: "wanders around the forest of Tsurugi",
    values: ["honor", "loyalty", "justice"],
  });

  console.log("agent", agent);
  const handleObservation = async () => {
    const observation = "buying grocery from Vilma's shop.";
    await agent.observe(observation);
    console.log("agent", agent);
  };

  const handleSalientQuestions = async () => {
    const input = `Created: 2023-02-13 14:31:20
Description: conversing about two people, Carmen Ortiz and Rajiv Patel, discussing their mutual interest in promoting art in low-income communities, potential collaborations, attending discussions on the local mayoral election, and exploring connections between math, nature, and art, with plans to grab a drink at The Rose and Crown Pub after Rajiv's first solo show.
Filling:
Carmen Ortiz: Excuse me, hi there! I couldn't help but notice your paintings. They look amazing.
Rajiv Patel: Oh, thank you! I'm Rajiv. Nice to meet you.
Carmen Ortiz: I'm Carmen. Likewise! Are you preparing for a show?
Rajiv Patel: Yes, actually. My first solo show.
Carmen Ortiz: Congratulations! I'm also involved in the creative scene here. I'm managing a supply store and expanding it online. I'm always looking for opportunities to promote local artists.
Rajiv Patel: That's great! I'm also interested in collaborating on projects with others.
Carmen Ortiz: Wow, it sounds like we have a lot in common. I've been discussing potential art projects with Jennifer Moore, and I'm always interested in finding new ways to promote art in low-income communities.
Rajiv Patel: That's really cool. I've had similar discussions with Latoya Williams and Ryan Park. And I'm also interested in attending discussions about the local mayoral election and exploring connections between math, nature, and art.
Carmen Ortiz: That's fascinating! I recently discussed the topic of medicinal development using mathematical patterns found in nature with Ryan Park.
Rajiv Patel: Wow, that's really interesting. It would be great to collaborate on something like that in the future.
Carmen Ortiz: Definitely! Do you have any plans after the show? We could grab a drink and discuss further collaborations.
Rajiv Patel: I would love that. How about The Rose and Crown Pub? It's close by.
Carmen Ortiz: Sounds perfect. Looking forward to it.
Created: 2023-02-13 14:30:20
Description: conversing about two people, Carmen Ortiz and Rajiv Patel, discussing their mutual interest in promoting art in low-income communities, potential collaborations, attending discussions on the local mayoral election, and exploring connections between math, nature, and art, with plans to grab a drink at The Rose and Crown Pub after Rajiv's first solo show.
Filling:
Carmen Ortiz: Excuse me, hi there! I couldn't help but notice your paintings. They look amazing.
Rajiv Patel: Oh, thank you! I'm Rajiv. Nice to meet you.
Carmen Ortiz: I'm Carmen. Likewise! Are you preparing for a show?
Rajiv Patel: Yes, actually. My first solo show.
Carmen Ortiz: Congratulations! I'm also involved in the creative scene here. I'm managing a supply store and expanding it online. I'm always looking for opportunities to promote local artists.
Rajiv Patel: That's great! I'm also interested in collaborating on projects with others.
Carmen Ortiz: Wow, it sounds like we have a lot in common. I've been discussing potential art projects with Jennifer Moore, and I'm always interested in finding new ways to promote art in low-income communities.
Rajiv Patel Abigail Chen is experimenting with new tools and techniques to create interactive art.
(Depth: 1; Evidence: ['node_28'])

[node_31] 2023-02-13 09:16:50: For Rajiv Patel's planning: should remember to catch up with Abigail later to talk more about local politics and art.
(Depth: 1; Evidence: ['node_28'])

[node_16] 2023-02-13 00:01:30: Rajiv Patel enjoys discussing politics and local elections.
(Depth: 1; Evidence: None)

[node_15] 2023-02-13 00:01:30: Rajiv Patel has been visiting The Rose and Crown Pub late at night for about a year, as he is familiar with the bartender, Arthur Burton.
(Depth: 1; Evidence: None)

[node_14] 2023-02-13 00:01:30: Rajiv Patel has attempted to socialize at Hobbs Cafe, but has not yet had any meaningful conversations with anyone there.
(Depth: 1; Evidence: None)

[node_13] 2023-02-13 00:01:30: Rajiv Patel has been living with Haily Johnson for about a year, but he doesn't feel very comfortable around her.
(Depth: 1; Evidence: None)

[node_12] 2023-02-13 00:01:30: Rajiv Patel has been living with Francisco Lopez, his housemate, for approximately one year.
(Depth: 1; Evidence: None)

[node_11] 2023-02-13 00:01:30: Rajiv Patel has known his housemate Abigail Chan for approximately one year and finds her attractive.
(Depth: 1; Evidence: None)

[node_10] 2023-02-13 00:01:30: Rajiv Patel and Latoya Williams have conversations about politics and local elections.
(Depth: 1; Evidence: None)

[node_9] 2023-02-13 00:01:30: Rajiv Patel has been living with Latoya Williams, his housemate, for approximately one year.
(Depth: 1; Evidence: None)

[node_6] 2023-02-13 00:00:00: This is Rajiv Patel's plan for Monday February 13: wake up and complete the morning routine at 9:00 am, have breakfast at 9:30 am, spend 1 hour on yoga and exercise at 10:30 am, work on paintings in the morning at 11:30 am, have lunch at 12:00 pm, work on his painting in the afternoon at 1:00 pm, watch some TV from 7 to 8 pm, practice guitar from 8 to 10 pm.
(Depth: 1; Evidence: None)
`;

    const output = await ae.getSalientQuestions(input);
    console.log("imp questions", output);
  };

  const handleDaySchedule = async () => {
    const output = await ae.getDayPlan(
      agent.name,
      agent.age,
      agent.personality
    );
    console.log("day schedule", output);
  };

  const createPlan = async () => {
    await agent.createPlan();

    console.log("agent", agent);
  };

  return (
    <div className='p-5 overflow-scroll'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleObservation}
      >
        Add observation to memory
      </button>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleSalientQuestions}
      >
        get salient questions
      </button>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleDaySchedule}
      >
        get day schedule
      </button>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={createPlan}
      >
        create a plan
      </button>

      <PhaserGame />
    </div>
  );
}

export default App;
