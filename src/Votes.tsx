import { useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";
import { BarChart } from "./BarChart";

export const Votes = ({ name }: { name: string }) => {
  const options = useQuery("votes:list") || [];

  const [newMessageText, setNewMessageText] = useState("");
  const vote = useMutation("votes:vote");
  const counts = useQuery("votes:count");
  return (
    <section>
      <h2>Votes</h2>
      <ul>
        {counts &&
          [...counts.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([option, count]) => (
              <li key={option}>
                <button onClick={() => vote(option, name)}>
                  <span>
                    {count}: {option}
                  </span>
                </button>
              </li>
            ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNewMessageText("");
          vote(newMessageText, name);
        }}
      >
        <input
          value={newMessageText}
          onChange={(event) => setNewMessageText(event.target.value)}
          placeholder="Add an option…"
        />
        <input
          type="submit"
          value={"Submit as " + name}
          disabled={!newMessageText}
        />
      </form>
    </section>
  );
};
export const GetName = ({ finished }: any) => {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        finished(name);
      }}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value.substring(0, 100))}
      />
      <input type="submit" value="Set Name" />
    </form>
  );
};
