import { Chat, GetName } from "./Chat";
import { Slides } from "./Slides";
import useSessionStorage from "./useSessionStorage";

export default function App() {
  const [name, setName] = useSessionStorage("name", "");
  return (
    <main>
      <h1>Convex TreeHacks Workshop</h1>
      <section>
        <article>
          Welcome! Let's get building with Convex. You can visit this site at{" "}
          <a href="https://convex.ngrok.io">https://convex.ngrok.io</a>
          <br />
          The code is at{" "}
          <a href="https://github.com/get-convex/convex-treehacks-workshop">
            https://github.com/get-convex/convex-treehacks-workshop
          </a>
          <br />
          <br />
          Resources:
          <ul>
            <li>
              <a href="https://docs.convex.dev/tutorial">Convex Tutorial</a>: To
              get something running on your machine.
            </li>
            <li>
              <a href="https://github.com/get-convex/convex-demos">
                Demos Repo
              </a>
              : Examples for reference or to use as a template.
            </li>
            <li>
              <a href="https://docs.convex.dev/">Docs</a>
            </li>
            <li>
              <a href="https://dashboard.convex.dev/">Dashboard</a>
            </li>
            <li>
              <a href="https://stack.convex.dev/">Reference Articles</a>
            </li>
            <li>
              <a href="https://github.com/get-convex/convex-helpers/">
                My Helper Repo
              </a>
            </li>
          </ul>
          - Ian (<a href="https://twitter.com/ianmacartney">@ianmacartney</a>)
        </article>
      </section>
      {/*
      {name ? <Chat name={name} /> : <GetName finished={setName} />}
      <Slides index={0} />
      */}
    </main>
  );
}
