"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

type MotionLinkProps = {
  children: React.ReactNode;
  href: string;
};

const MLink = motion(Link);

export default function MotionLink({ children, href }: MotionLinkProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <MLink
      ref={ref}
      href={href}
      className="h-[380px] max-w-[500px] flex-1 basis-80"
      style={{
        // @ts-ignore
        scale: scaleProgress,
        // @ts-ignore
        opacity: opacityProgress,
      }}
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
    >
      {children}
    </MLink>
  );
}
