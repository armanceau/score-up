"use client";
import { useState } from "react";

export default function SkyjoPage() {
  const [scores, setScores] = useState([0, 0]);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Skyjo 🎯</h1>
      <p>Joueur 1 : {scores[0]} pts</p>
      <button onClick={() => setScores([scores[0] + 1, scores[1]])}>+1</button>
    </main>
  );
}
