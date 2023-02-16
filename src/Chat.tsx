import { useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";

export const Chat = ({ name }: { name: string }) => {
  const messages = useQuery("listMessages") || [];

  const [newMessageText, setNewMessageText] = useState("");
  const sendMessage = useMutation("sendMessage");
  return (
    <section>
      <h2>Chat</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id.toString()}>
            <span>{message.author}:</span>
            <span>{message.body}</span>
            <span>{new Date(message._creationTime).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNewMessageText("");
          sendMessage(newMessageText, name);
        }}
      >
        <input
          value={newMessageText}
          onChange={(event) => setNewMessageText(event.target.value)}
          placeholder="Write a message…"
        />
        <input
          type="submit"
          value={"Send as " + name}
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
