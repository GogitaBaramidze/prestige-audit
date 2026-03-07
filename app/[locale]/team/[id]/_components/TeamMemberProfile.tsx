"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MemberMeta } from "./TeamMembers";

function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [bp]);
  return isMobile;
}

function FadeUp({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function HeroSection({
  name,
  title,
  summary,
  member,
  isMobile,
  contactItems,
}: {
  name: string;
  title: string;
  summary: string;
  member: MemberMeta;
  isMobile: boolean;
  contactItems: { Icon: React.ElementType; value: string }[];
}) {
  return (
    <section
      style={{
        position: "relative",
        background: "#0a1a3f",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-10%",
          right: isMobile ? "-20%" : "-5%",
          width: isMobile ? "280px" : "600px",
          height: isMobile ? "280px" : "600px",
          background:
            "radial-gradient(circle, rgba(56,182,255,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      {!isMobile && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-8%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      )}

      {!isMobile && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "64px",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "rgba(255,255,255,0.06)",
            pointerEvents: "none",
            transformOrigin: "top",
            animation: "scaleY 1.2s 0.3s cubic-bezier(0.16,1,0.3,1) both",
          }}
        />
      )}

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
          <div className={isMobile ? "" : "hero-text-animate"}>
            <div
              style={{ marginBottom: "32px", animationDelay: "0ms" }}
              className={isMobile ? "" : "fade-up-1"}
            >
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
            </div>

            <h1
              className={isMobile ? "" : "fade-up-2"}
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
            </h1>

            <div
              className={isMobile ? "" : "fade-up-3"}
              style={{
                width: "60px",
                height: "2px",
                background: "linear-gradient(90deg, #3b82f6, transparent)",
                marginBottom: "28px",
              }}
            />

            <p
              className={isMobile ? "" : "fade-up-4"}
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
            </p>

            <div
              className={isMobile ? "" : "fade-up-5"}
              style={{
                marginTop: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {contactItems.map(({ Icon, value }) => (
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
            </div>
          </div>

          <div
            className={`hero-image-order hero-image-container ${isMobile ? "" : "fade-up-img"}`}
            style={{ position: "relative" }}
          >
            {!isMobile && (
              <>
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "10px",
                    width: "70%",
                    height: "70%",
                    background: "rgba(37,99,235,0.22)",
                    borderRadius: "6px",
                    filter: "blur(18px)",
                    zIndex: 0,
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: "-12px",
                    left: "10px",
                    width: "70%",
                    height: "70%",
                    background: "rgba(56,182,255,0.12)",
                    borderRadius: "6px",
                    filter: "blur(18px)",
                    zIndex: 0,
                  }}
                />
              </>
            )}
            <div
              className="hero-image-wrapper"
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: "4px",
                overflow: "hidden",
                aspectRatio: "3/4",
                boxShadow: isMobile
                  ? "0 10px 30px rgba(0,0,0,0.4)"
                  : "0 20px 50px rgba(0,0,0,0.6), -8px -8px 0 0 rgba(59,130,246,0.15), 8px 8px 0 0 rgba(56,182,255,0.1)",
              }}
            >
              <Image
                fill
                src={member.image}
                alt={name}
                style={{ objectFit: "cover" }}
                sizes="(max-width: 767px) 80vw, (max-width: 1023px) 55vw, 22vw"
                priority
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
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCell({
  skill,
  index,
  total,
  isMobile,
}: {
  skill: string;
  index: number;
  total: number;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const isFirst = index === 0;
  const isSecond = index === 1;
  const isSecondLast = index === total - 2;
  const isLast = index === total - 1;

  const radius = isMobile
    ? "8px"
    : `${isFirst ? "8px" : "0"} ${isSecond ? "8px" : "0"} ${isLast ? "8px" : "0"} ${isSecondLast ? "8px" : "0"}`;

  return (
    <div
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        background: hovered ? "#0a1a3f" : "#ffffff",
        padding: isMobile ? "20px" : "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        transition: "background 0.2s ease",
        cursor: "default",
        borderRadius: isMobile ? "8px" : radius,
      }}
    >
      <span
        style={{
          fontSize: isMobile ? "14px" : "15px",
          fontFamily: "'Georgia', serif",
          color: hovered ? "#ffffff" : "#0a1a3f",
          transition: "color 0.2s ease",
        }}
      >
        {skill}
      </span>
      <ChevronRight
        style={{
          width: "14px",
          height: "14px",
          color: hovered ? "#93c5fd" : "#2563eb",
          flexShrink: 0,
          transition: "color 0.2s ease",
        }}
      />
    </div>
  );
}

export function TeamMemberProfile({ member }: { member: MemberMeta }) {
  const t = useTranslations("team");
  const isMobile = useIsMobile();

  const { id } = member;
  const name = t(`members.${id}.name`);
  const title = t(`members.${id}.title`);
  const summary = t(`members.${id}.summary`);
  const expertise = t.raw(`members.${id}.expertise`) as string[];
  const certifications = t.raw(`members.${id}.certifications`) as string[];

  const contactItems = [
    { Icon: Mail, value: member.email },
    { Icon: Phone, value: member.phone },
    { Icon: MapPin, value: member.address },
  ];

  return (
    <div
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#f3f5f4",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(28px); filter: blur(5px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
        }
        @keyframes scaleYIn {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes imgReveal {
          from { opacity: 0; transform: scale(0.93) translateY(24px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }

        .fade-up-1 { animation: fadeUpIn 0.65s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .fade-up-2 { animation: fadeUpIn 0.65s cubic-bezier(0.16,1,0.3,1) 0.13s both; }
        .fade-up-3 { animation: fadeUpIn 0.65s cubic-bezier(0.16,1,0.3,1) 0.21s both; }
        .fade-up-4 { animation: fadeUpIn 0.65s cubic-bezier(0.16,1,0.3,1) 0.29s both; }
        .fade-up-5 { animation: fadeUpIn 0.65s cubic-bezier(0.16,1,0.3,1) 0.37s both; }
        .fade-up-img { animation: imgReveal 1s cubic-bezier(0.16,1,0.3,1) 0.3s both; }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .hero-image-order { order: 0; }
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
        .hero-padding      { padding: 80px 32px 100px; }
        .section-padding   { padding: 100px 32px; }
        .hero-image-wrapper { width: 58%; }
        .hero-image-container { display: flex; justify-content: center; }
        .cert-block { margin-top: 48px; }

        @media (max-width: 1023px) {
          .hero-grid { grid-template-columns: 1fr; gap: 48px; }
          .hero-image-order { order: -1; }
          .hero-image-wrapper { width: 55%; }
          .expertise-grid { grid-template-columns: 1fr; gap: 48px; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
          .hero-padding { padding: 60px 32px 80px; }
          .section-padding { padding: 72px 32px; }
          .cert-block { margin-top: 32px; }
        }

        @media (max-width: 767px) {
          .hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .hero-image-order { order: -1; }
          .hero-image-wrapper { width: 78%; }
          .skills-grid { grid-template-columns: 1fr; gap: 6px; }
          .hero-padding { padding: 32px 20px 56px; }
          .section-padding { padding: 48px 20px; }
          .cert-block { margin-top: 24px; }
          .fade-up-1,.fade-up-2,.fade-up-3,.fade-up-4,.fade-up-5,.fade-up-img {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .hero-grid > div:first-child { text-align: center; }
          .hero-grid > div:first-child p { margin-left: auto; margin-right: auto; }
          .hero-grid > div:first-child > div:last-child { align-items: center; }
          .hero-grid > div:first-child > div:nth-child(3) { margin-left: auto; margin-right: auto; }
        }

        @media (max-width: 480px) {
          .hero-image-wrapper { width: 88%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-up-1,.fade-up-2,.fade-up-3,.fade-up-4,.fade-up-5,.fade-up-img {
            animation: none !important;
          }
        }
      `}</style>

      <HeroSection
        name={name}
        title={title}
        summary={summary}
        member={member}
        isMobile={isMobile}
        contactItems={contactItems}
      />

      {Array.isArray(expertise) && expertise.length > 0 && (
        <section className="section-padding" style={{ background: "#f3f5f4" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="expertise-grid">
              <FadeUp>
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
              </FadeUp>

              <div className="skills-grid">
                {expertise.map((skill, i) => (
                  <FadeUp key={i} delay={isMobile ? 0 : i * 60}>
                    <SkillCell
                      skill={skill}
                      index={i}
                      total={expertise.length}
                      isMobile={isMobile}
                    />
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
