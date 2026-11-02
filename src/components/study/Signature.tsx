"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * The user's handwritten signature, pre-processed into a transparent PNG
 * with golden ink — matches the dark premium theme everywhere.
 */
export function Signature({
  size = 120,
  className = "",
  delay = 0.6,
}: {
  size?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative inline-block ${className}`}
      title="التوقيع"
    >
      <Image
        src="/signature-gold.png"
        alt="التوقيع"
        width={size * 2.2}
        height={size}
        priority
        className="object-contain select-none pointer-events-none"
        style={{ width: size * 2.2, height: "auto" }}
        draggable={false}
      />
    </motion.div>
  );
}
