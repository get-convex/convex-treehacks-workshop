import { api } from "../convex/_generated/api";
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";

export const Slides = ({ index }: { index: number }) => {
  const slides = useQuery(api.slides.list) ?? [];
  index = useQuery(api.slides.getIndex) ?? 0;
  const setSlideIndex = useMutation(api.slides.setIndex);
  // pre-fetch images
  useEffect(() => {
    for (const src of slides) {
      const img = new Image();
      img.src = src;
    }
  }, [slides]);

  return (
    <section>
      <h2>Slides</h2>
      {slides[index] ? (
        <img src={slides[index]} />
      ) : (
        <article aria-busy="true"></article>
      )}
      <div style={{ display: "flex" }}>
        <button
          onClick={() => setSlideIndex({ index: index - 1 })}
          disabled={index < 1}
        >
          ⏮️
        </button>
        <button
          onClick={() => setSlideIndex({ index: index + 1 })}
          disabled={index >= slides.length - 1}
        >
          ⏭️
        </button>
      </div>
      {/*(
      )*/}
    </section>
  );
};
