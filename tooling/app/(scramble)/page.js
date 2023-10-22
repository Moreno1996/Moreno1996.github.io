"use client"
import Image from 'next/image'
import Scramble from "@/components/Scramble";
import ScrambleSelector from './Selector';
import {useState} from "react";
import { scrambler } from '@/components/scramblerv2';
export default function Home() {
  const scrambles = [
    {
      title: "Random",
      scramble: scrambler.getRandomScramble,
    },
    {
      title: "Cross finished",
      scramble: scrambler.getF2LScramble,
    },
    {
      title: "OLL",
      scramble: scrambler.getLLScramble,
    },
    {
      title: "PLL",
      scramble: scrambler.getPLLScramble,
    },
    {
      title: "Corner only",
      scramble: scrambler.getCornerScramble,
    },
    {
      title: "Edge only",
      scramble: scrambler.getEdgeScramble,
    },
    {
      title: "EO Done",
      scramble: scrambler.getZZScramble,
    },
    {
      title: "Blind level 1/6",
      scramble: scrambler.getScrambleBlindLevel1,
    },
    {
      title: "Blind level 2/6",
      scramble: scrambler.getScrambleBlindLevel2,
    },
    {
      title: "Blind level 3/6",
      scramble: scrambler.getScrambleBlindLevel3,
    },
    {
      title: "Blind level 4/6",
      scramble: scrambler.getScrambleBlindLevel4,
    },
    {
      title: "Blind level 5/6",
      scramble: scrambler.getScrambleBlindLevel5,
    },
    {
      title: "Blind level 6/6",
      scramble: scrambler.getScrambleBlindLevel6,
    },
  ];
  const [scramble, setScramble] = useState(scrambles[0]?.title);
  
  const selectedScramble = scrambles.find((sc)=>sc.title==scramble) 
  return (
    <>
    
    <ScrambleSelector scrambles={scrambles} setScramble={setScramble} scramble={scramble}/>
    <Scramble scrambleFunction={(selectedScramble?.scramble)}/>
    </>
  )
}
