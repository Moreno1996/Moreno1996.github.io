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
      title: "Last Layer",
      scramble: scrambler.getLLScramble,
    },
    {
      title: "Easy blind",
      scramble: scrambler.getEasyBLDScramble,
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
