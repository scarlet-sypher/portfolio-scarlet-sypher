import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Send,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import emailjs from "@emailjs/browser";

import hand from "../assets/contact/handshake.png";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactData = {
  email: "ayushjha002@gmail.com",
  phone: "1234567890",
  location: "Somewhere",
};

const contactCards = [
  {
    icon: Mail,
    label: "Email us",
    value: contactData.email,
    href: `mailto:${contactData.email}`,
  },
  {
    icon: Phone,
    label: "Call us",
    value: contactData.phone,
    href: `tel:${contactData.phone}`,
  },
  {
    icon: MapPin,
    label: "Our location",
    value: contactData.location,
    href: "#",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

function CursorGlow() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handler = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-0"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        width: 520,
        height: 520,
        background: `
          radial-gradient(circle at center,
            rgba(74,222,128,0.35) 0%,
            rgba(74,222,128,0.22) 15%,
            rgba(74,222,128,0.12) 30%,
            rgba(74,222,128,0.05) 45%,
            transparent 60%
          )
        `,
        filter: "blur(10px)",
        borderRadius: "50%",
      }}
    />
  );
}

function ParticleField() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    dur: Math.random() * 10 + 8,
    delay: Math.random() * 6,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "rgba(74,222,128,0.5)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.7, 0] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GridLines() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(74,222,128,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74,222,128,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
    />
  );
}

function HandshakeHero() {
  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      initial="hidden"
      animate="show"
      className="relative flex items-center justify-center"
      style={{ marginBottom: "2rem" }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          border: "1px solid rgba(74,222,128,0.15)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 230,
          height: 230,
          border: "1px dashed rgba(74,222,128,0.2)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: 180,
          height: 180,
          background:
            "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: 160,
          height: 160,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(74,222,128,0.25)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 0 40px rgba(74,222,128,0.1), inset 0 0 30px rgba(74,222,128,0.04)",
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img
          src={hand}
          alt="Partnership"
          style={{
            width: "85%",
            height: "85%",
            objectFit: "contain",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
          }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;gap:6px;opacity:0.5">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(74,222,128,0.8)" stroke-width="1.5">
                  <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                </svg>
                <span style="font-size:9px;color:rgba(74,222,128,0.6);letter-spacing:0.1em;text-transform:uppercase;">Handshake</span>
              </div>`;
          }}
        />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: 10, right: -10 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
          style={{
            background: "rgba(74,222,128,0.12)",
            border: "1px solid rgba(74,222,128,0.3)",
            color: "#4ade80",
            backdropFilter: "blur(8px)",
          }}
        >
          <Sparkles size={9} /> Open for Projects
        </div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ bottom: 10, left: -10 }}
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Zap size={9} style={{ color: "#facc15" }} /> Quick Turnaround
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactCard({ icon: Icon, label, value, href, index }) {
  return (
    <motion.a
      href={href}
      variants={fadeUp}
      custom={index + 5}
      initial="hidden"
      animate="show"
      whileHover={{ scale: 1.02, x: 4 }}
      className="group relative flex items-center gap-4 rounded-2xl p-4 no-underline overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(74,222,128,0.35)";
        e.currentTarget.style.boxShadow =
          "0 0 24px rgba(74,222,128,0.1), inset 0 0 24px rgba(74,222,128,0.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl shrink-0"
        style={{
          width: 44,
          height: 44,
          background: "rgba(74,222,128,0.08)",
          border: "1px solid rgba(74,222,128,0.18)",
        }}
      >
        <Icon size={17} style={{ color: "#4ade80" }} strokeWidth={1.8} />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="text-[10px] font-semibold tracking-widest uppercase mb-0.5"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {label}
        </p>
        <p
          className="text-[13px] font-medium truncate"
          style={{
            color: "rgba(255,255,255,0.8)",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {value}
        </p>
      </div>

      <ArrowUpRight
        size={14}
        className="shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: "rgba(255,255,255,0.2)" }}
      />
    </motion.a>
  );
}

function Field({
  tag: Tag = "input",
  label,
  name,
  type = "text",
  value,
  onChange,
  rows,
}) {
  const [focused, setFocused] = useState(false);
  const hasVal = value.length > 0;

  return (
    <div className="relative">
      <Tag
        name={name}
        type={type}
        rows={rows}
        placeholder=" "
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent resize-none outline-none rounded-xl px-4 py-3.5 transition-all duration-300"
        style={{
          color: "rgba(255,255,255,0.88)",
          fontSize: "13px",
          fontFamily: "'DM Sans', sans-serif",
          background: focused
            ? "rgba(74,222,128,0.03)"
            : "rgba(255,255,255,0.025)",
          border: `1px solid ${focused ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.08)"}`,
          boxShadow: focused ? "0 0 0 4px rgba(74,222,128,0.07)" : "none",
        }}
      />
      <label
        className="absolute pointer-events-none transition-all duration-200 font-medium tracking-wide"
        style={{
          left: "1rem",
          top: hasVal || focused ? "-9px" : Tag === "textarea" ? "1rem" : "50%",
          transform:
            hasVal || focused
              ? "none"
              : Tag === "textarea"
                ? "none"
                : "translateY(-50%)",
          fontSize: hasVal || focused ? "10px" : "12px",
          color: focused ? "rgba(74,222,128,0.9)" : "rgba(255,255,255,0.35)",
          background: hasVal || focused ? "rgba(10,12,20,1)" : "transparent",
          padding: hasVal || focused ? "0 5px" : "0",
          borderRadius: 4,
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      { name: form.name, email: form.email, message: form.message },
      EMAILJS_PUBLIC_KEY,
    );
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <>
      <div
        className="relative w-full min-h-screen overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #080a10 0%, #0b110b 50%, #080a10 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <CursorGlow />
        <GridLines />
        <ParticleField />

        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(74,222,128,0.4), transparent)",
          }}
        />

        <div
          className="pointer-events-none absolute"
          style={{
            top: -100,
            right: -80,
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            bottom: -60,
            left: -80,
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            top: "40%",
            left: "50%",
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(74,222,128,0.025) 0%, transparent 65%)",
            borderRadius: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-start justify-start select-none overflow-hidden"
          style={{ padding: "3rem 3rem 0" }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(50px,11vw,120px)",
              fontWeight: 900,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
            }}
          >
            LET'S
          </span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(50px,11vw,120px)",
              fontWeight: 900,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              marginLeft: "6rem",
            }}
          >
            CONNECT
          </span>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center gap-7 px-10 py-16 lg:pr-6">
            <HandshakeHero />

            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full"
              style={{
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.2)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
              />
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ color: "#4ade80", fontFamily: "'Syne', sans-serif" }}
              >
                Open for Work
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
            >
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.94)",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                Have something in mind?
                <br />
                <span style={{ color: "#4ade80" }}>Let's talk.</span>
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="text-[13px] leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.4)", margin: 0 }}
            >
              Got something in mind? I’d love to hear about it and see how I can
              help.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="show"
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(74,222,128,0.2), transparent)",
                maxWidth: 280,
              }}
            />

            <div className="flex flex-col gap-3">
              {contactCards.map((card, i) => (
                <ContactCard key={card.label} {...card} index={i} />
              ))}
            </div>
          </div>

          <div
            className="flex flex-col justify-center px-10 py-16 lg:pl-6"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.04)" }}
          >
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
            >
              <div className="mb-8">
                <p
                  className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2"
                  style={{ color: "#4ade80", fontFamily: "'Syne', sans-serif" }}
                >
                  Send a message
                </p>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "clamp(20px,2.5vw,28px)",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.9)",
                    margin: 0,
                  }}
                >
                  Start the conversation
                </h3>
              </div>

              <div
                className="rounded-2xl p-7 flex flex-col gap-5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(24px)",
                  boxShadow: "inset 0 0 60px rgba(74,222,128,0.015)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <Field
                  tag="textarea"
                  label="Your Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                />

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[12px] font-semibold"
                    style={{
                      background: "rgba(74,222,128,0.08)",
                      border: "1px solid rgba(74,222,128,0.2)",
                      color: "#4ade80",
                    }}
                  >
                    <CheckCircle2 size={15} /> Message sent! We'll be in touch
                    soon.
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[12px] font-semibold"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#f87171",
                    }}
                  >
                    <XCircle size={15} /> Something went wrong. Please try
                    again.
                  </motion.div>
                )}

                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 36px rgba(74,222,128,0.3)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    disabled={status === "sending"}
                    className="flex-1 flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-[13px] font-bold tracking-wide transition-all duration-300"
                    style={{
                      background:
                        status === "sending"
                          ? "rgba(255,255,255,0.1)"
                          : "#4ade80",
                      color:
                        status === "sending"
                          ? "rgba(255,255,255,0.4)"
                          : "#080a10",
                      border: "none",
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                      fontFamily: "'Syne', sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-black/20 border-t-black/70 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={14} strokeWidth={2.5} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>

                <p
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: "10px",
                    textAlign: "center",
                    letterSpacing: "0.04em",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  We respect your privacy. Your info is never shared.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(74,222,128,0.25), transparent)",
          }}
        />
      </div>
    </>
  );
}
