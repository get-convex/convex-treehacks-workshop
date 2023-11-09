import { api } from "../convex/_generated/api";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";

export const Chat = ({ name }: { name: string }) => {
  const messages = useQuery(api.messages.list) ?? [];

  const [newMessageText, setNewMessageText] = useState("");
  const sendMessage = useMutation(api.messages.send);
  return (
    <section>
      <h2>Chat</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id.toString()}>
            <span>{message.author}:</span>
            <span>{message.body}</span>

            {message.url && (
              <figure>
                <img src={message.url} />
              </figure>
            )}
            <span>{new Date(message._creationTime).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNewMessageText("");
          //alert(name + ": " + newMessageText);
          sendMessage({ body: newMessageText, author: name });
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
        placeholder="Name"
      />
      <input type="submit" value={"Join" + (name ? " as " + name : "")} />
    </form>
  );
};
