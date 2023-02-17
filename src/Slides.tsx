import { useEffect, useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";

export const Slides = ({ index }: { index: number }) => {
  const slides = useQuery("slides:list") ?? [];
  index = useQuery("slides:getIndex") ?? 0;
  const setSlideIndex = useMutation("slides:setIndex");
  //index = useQuery("slides:getIndex") ?? 0;
  //const setSlideIndex = useMutation("slides:setIndex");
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
        <button onClick={() => setSlideIndex(index - 1)} disabled={index < 1}>
          ⏮️
        </button>
        <button
          onClick={() => setSlideIndex(index + 1)}
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
