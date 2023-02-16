import { Chat, GetName } from "./Chat";
import { Slides } from "./Slides";
import useSessionStorage from "./useSessionStorage";

export default function App() {
  const [name, setName] = useSessionStorage("name", "");
  return (
    <main>
      <h1>Convex TreeHacks Workshop</h1>
      {name ? <Chat name={name} /> : <GetName finished={setName} />}
      <Slides index={1} />
    </main>
  );
}
