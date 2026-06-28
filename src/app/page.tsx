"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import MainDashboard from "@/components/MainDashboard";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!booted && (
          <BootSequence key="boot" onComplete={() => setBooted(true)} />
        )}
      </AnimatePresence>
      {booted && <MainDashboard />}
    </>
  );
}
