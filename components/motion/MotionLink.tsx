"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const MotionLink = motion(Link);
export const cardHover = {
  whileHover: { y: -6 },
  whileTap: { y: -1 },
  transition: { type: "spring" as const, stiffness: 420, damping: 26 },
};
