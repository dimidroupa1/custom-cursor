"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default")


  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "yellow",
      mixBlendMode: "difference"
    }
  }

  const textEnter = () => setCursorVariant("text")

  const textLeave = () => setCursorVariant("default")

  return (
    <Container>
      <Title onMouseEnter={textEnter} onMouseLeave={textLeave}>Hello world</Title>
      <Cursor 
        variants={variants}
        animate={cursorVariant}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: yellow;
`;

const Title = styled(motion.h1)`
  font-size: 10rem;
`;

const Cursor = styled(motion.div)`
  background-color: #111;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
`;
