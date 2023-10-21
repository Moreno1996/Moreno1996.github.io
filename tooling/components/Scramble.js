"use client";
import { Button } from "flowbite-react";
import { useState } from "react";
import Cube from "./Cube/Cube";
import { solver } from "./blindMain";
function clean(scramble) {
  //split string to array
  var scram_s = scramble.split(" ");
  //remove empty strings
  var scram = [];
  for (var i = 0; i < scram_s.length; i++) {
    if (scram_s[i] != "") {
      scram.push(scram_s[i]);
    }
  }

  return scram;
}
const Scramble = ({ scrambleFunction }) => {
  const [scrambleData, setScrambleData] = useState({});
  const [scramble, setScramble] = useState(null);
  const [ blindData, setBlindData ] = useState(null);
  function getScramble() {
    console.log("scrambleFunction", scrambleFunction);
    const scramble = scrambleFunction();

    return scramble;
  }
  function handleScramble() {
    let _scramble = getScramble();
    setScramble(_scramble);
    const _solver = solver();

    _scramble = clean(_scramble);
    _solver.executeScramble(_scramble);
    const edge_solution = _solver.getEdgeSolution();
    const corner_solution = _solver.getCornerSolution();
    const cubeCorners = _solver.getCubeCorners();
    const cubeEdges = _solver.getCubeEdges();
    setScrambleData({ cubeCorners, cubeEdges });
    setBlindData({ edge_solution,
      corner_solution, });
    return _scramble;
  }
  return (
    <div className="flex flex-col gap-2">
      <Button
        className="w-fit"
        onClick={() => {
          handleScramble();
        }}
      >
        Genereer scramble
      </Button>
      <h1>{scramble}</h1>

      <Cube scrambleData={scrambleData} />
      {blindData && <>
      <h4>Blind oplossing</h4>
      <div>

        Edges: {blindData.edge_solution || "-"}
      </div>
      <div>
        Corners: {blindData.corner_solution || "-"}
      </div>
      </>}
    </div>
  );
};

export default Scramble;
