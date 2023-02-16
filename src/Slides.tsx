import { useEffect, useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";

export const Slides = ({ index }: { index: number }) => {
  const slides = useQuery("slides:list") ?? [];
  // pre-fetch images
  useEffect(() => {
    for (const src of slides) {
      const img = new Image();
      img.src = src;
    }
  }, [slides]);

  return (
    <section>
      {slides[index] ? (
        <img src={slides[index]} />
      ) : (
        <article aria-busy="true"></article>
      )}
    </section>
  );
};
