import React, { useState, useEffect } from "react";

const CODON_LEN = 3;
const NUM_CODONS = 500;
const ROWS = 50;
const BASES = ["A", "G", "T", "C"];

export function Nucleotides() {
  const [sequence, setSequence] = useState("");

  useEffect(() => {
    let result = "";
    const totalChars = CODON_LEN * NUM_CODONS;
    for (let i = 0; i < totalChars; i++) {
      result += BASES[Math.floor(Math.random() * 4)];
    }
    setSequence(result);
  }, []);

  return (
    <div className="wall-nucleotide">
      {Array.from({ length: ROWS }).map((_, rowIndex) => (
        <span key={`r${rowIndex}`} className="row-nucleotide">
          {Array.from({ length: NUM_CODONS })
            .map((_, codonIndex) =>
              sequence.slice(
                codonIndex * CODON_LEN,
                (codonIndex + 1) * CODON_LEN
              )
            )
            .join("   ")}
        </span>
      ))}
    </div>
  );
}