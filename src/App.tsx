import { Chat, GetName } from "./Chat";
import { Slides } from "./Slides";
import useSessionStorage from "./useSessionStorage";

export default function App() {
  const [name, setName] = useSessionStorage("name", "");
  return (
    <main>
      <h1>Convex TreeHacks Workshop</h1>
      <section>
        <p>
          Welcome! You can visit this site at{" "}
          <a href="https://convex.ngrok.io">https://convex.ngrok.io</a>
          <br />
          The code is at{" "}
          <a href="https://github.com/get-convex/convex-treehacks-workshop">
            https://github.com/get-convex/convex-treehacks-workshop
          </a>
          <br />
          Resources:
          <ol>
            <li></li>
          </ol>
        </p>
      </section>
      {/*
      {name ? <Chat name={name} /> : <GetName finished={setName} />}
      <Slides index={0} />
      */}
    </main>
  );
}
