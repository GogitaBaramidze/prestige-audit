"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { MemberMeta } from "./TeamMembers";

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function TeamMemberProfile({ member }: { member: MemberMeta }) {
  const t = useTranslations("team");
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const { id } = member;
  const name = t(`members.${id}.name`);
  const title = t(`members.${id}.title`);
  const summary = t(`members.${id}.summary`);
  const expertise = t.raw(`members.${id}.expertise`) as string[];
  const certifications = t.raw(`members.${id}.certifications`) as string[];

  return (
    <div
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#f3f5f4",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .hero-image-order {
          order: 0;
        }
        .expertise-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 80px;
          align-items: start;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3px;
        }
        .hero-padding {
          padding: 80px 32px 100px;
        }
        .section-padding {
          padding: 100px 32px;
        }
        .nav-padding {
          padding: 40px 32px 0;
        }
        .hero-image-wrapper {
          width: 72%;
        }
        .hero-image-container {
          display: flex;
          justify-content: center;
        }
        .cert-block {
          margin-top: 48px;
        }

        /* Tablet: 768px – 1023px */
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .hero-image-order {
            order: -1;
          }
          .hero-image-wrapper {
            width: 55%;
          }
          .hero-image-container {
            justify-content: center;
          }
          .expertise-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .skills-grid {
            grid-template-columns: 1fr 1fr;
          }
          .hero-padding {
            padding: 60px 32px 80px;
          }
          .section-padding {
            padding: 72px 32px;
          }
          .cert-block {
            margin-top: 32px;
          }
        }

        /* Mobile: up to 767px */
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .hero-image-order {
            order: -1;
          }
          .hero-image-wrapper {
            width: 78%;
          }
          .skills-grid {
            grid-template-columns: 1fr;
          }
          .hero-padding {
            padding: 40px 20px 64px;
          }
          .section-padding {
            padding: 56px 20px;
          }
          .nav-padding {
            padding: 24px 20px 0;
          }
          .cert-block {
            margin-top: 28px;
          }
        }

        /* Small mobile: up to 480px */
        @media (max-width: 480px) {
          .hero-image-wrapper {
            width: 88%;
          }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          background: "#0a1a3f",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          paddingTop: "80px", // ← match your header height
        }}
      >
        {/* Background decorations */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(56,182,255,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-8%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            left: "64px",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
          initial={{ scaleY: 0, originY: "top" }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

       

        {/* Hero content */}
        <div
          className="hero-padding"
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div className="hero-grid">
            {/* Text column */}
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={fadeUp} style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "rgba(37,99,235,0.2)",
                    border: "1px solid rgba(59,130,246,0.3)",
                    borderRadius: "100px",
                    padding: "6px 18px",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#60a5fa",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "sans-serif",
                      color: "#93c5fd",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {title}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                style={{
                  fontSize: "clamp(28px, 4.5vw, 60px)",
                  fontWeight: "300",
                  color: "#ffffff",
                  lineHeight: "1.05",
                  letterSpacing: "-0.02em",
                  marginBottom: "24px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                {name}
              </motion.h1>

              <motion.div
                variants={fadeUp}
                style={{
                  width: "60px",
                  height: "2px",
                  background: "linear-gradient(90deg, #3b82f6, transparent)",
                  marginBottom: "28px",
                }}
              />

              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: "1.9",
                  fontFamily: "'Georgia', serif",
                  maxWidth: "440px",
                  fontWeight: "300",
                }}
              >
                {summary}
              </motion.p>

              <motion.div
                variants={fadeUp}
                style={{
                  marginTop: "40px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {(
                  [
                    { icon: Mail, value: member.email },
                    { icon: Phone, value: member.phone },
                    { icon: MapPin, value: member.address },
                  ] as const
                ).map(({ icon: Icon, value }) => (
                  <div
                    key={value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "13px",
                      fontFamily: "sans-serif",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid rgba(59,130,246,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon
                        style={{
                          width: "13px",
                          height: "13px",
                          color: "#60a5fa",
                        }}
                      />
                    </div>
                    {value}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image column */}
            <motion.div
              className="hero-image-order hero-image-container"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "10px",
                  width: "70%",
                  height: "70%",
                  background: "rgba(37,99,235,0.25)",
                  borderRadius: "6px",
                  filter: "blur(18px)",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-12px",
                  left: "10px",
                  width: "70%",
                  height: "70%",
                  background: "rgba(56,182,255,0.15)",
                  borderRadius: "6px",
                  filter: "blur(18px)",
                  zIndex: 0,
                }}
              />

              <div
                className="hero-image-wrapper"
                style={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "4px",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.6), -8px -8px 0 0 rgba(59,130,246,0.15), 8px 8px 0 0 rgba(56,182,255,0.1)",
                }}
              >
                <Image
                  fill
                  src={member.image}
                  alt={name}
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 767px) 80vw, (max-width: 1023px) 55vw, 30vw"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(10,26,63,0.65) 0%, transparent 55%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "24px",
                    left: "24px",
                    right: "24px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontFamily: "sans-serif",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(147,197,253,0.7)",
                      marginBottom: "6px",
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontFamily: "'Georgia', serif",
                      color: "#ffffff",
                      fontWeight: "300",
                    }}
                  >
                    {name}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise section */}
      {Array.isArray(expertise) && expertise.length > 0 && (
        <motion.section
          className="section-padding"
          style={{ background: "#f3f5f4" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="expertise-grid">
              {/* Left: heading + certs */}
              <motion.div variants={fadeUp}>
                <div
                  style={{
                    fontSize: "11px",
                    fontFamily: "sans-serif",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#2563eb",
                    marginBottom: "16px",
                  }}
                >
                  {t("ui.coreCompetencies")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 44px)",
                    fontWeight: "300",
                    color: "#0a1a3f",
                    fontFamily: "'Georgia', serif",
                    lineHeight: "1.15",
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  {t("ui.areasOf")}
                  <br />
                  <em style={{ fontStyle: "italic", color: "#2563eb" }}>
                    {t("ui.expertise")}
                  </em>
                </h2>

                {Array.isArray(certifications) && certifications.length > 0 && (
                  <div
                    className="cert-block"
                    style={{
                      background: "#0a1a3f",
                      borderRadius: "6px",
                      padding: "28px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "3px",
                        height: "100%",
                        background:
                          "linear-gradient(to bottom, #3b82f6, #1d4ed8)",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "sans-serif",
                        marginBottom: "16px",
                      }}
                    >
                      {t("ui.certificationsEducation")}
                    </div>
                    {certifications.map((c, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "#60a5fa",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            color: "#93c5fd",
                            fontSize: "14px",
                            fontFamily: "'Georgia', serif",
                          }}
                        >
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Right: skills grid */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="skills-grid"
              >
                {expertise.map((skill, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    onMouseEnter={() => setHoveredSkill(i)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      background: hoveredSkill === i ? "#0a1a3f" : "#ffffff",
                      padding: "28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      transition: "background 0.25s ease",
                      cursor: "default",
                      borderRadius:
                        i === 0
                          ? "8px 0 0 0"
                          : i === 1
                            ? "0 8px 0 0"
                            : i === expertise.length - 2
                              ? "0 0 0 8px"
                              : i === expertise.length - 1
                                ? "0 0 8px 0"
                                : "0",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontFamily: "'Georgia', serif",
                        color: hoveredSkill === i ? "#ffffff" : "#0a1a3f",
                        fontWeight: "400",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {skill}
                    </span>
                    <ChevronRight
                      style={{
                        width: "14px",
                        height: "14px",
                        color: hoveredSkill === i ? "#93c5fd" : "#2563eb",
                        flexShrink: 0,
                        transition: "color 0.25s ease",
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
