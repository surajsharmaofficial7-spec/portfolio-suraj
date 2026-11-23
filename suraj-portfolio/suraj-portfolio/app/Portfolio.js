"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Portfolio({ projects }) {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".hero h1,.hero p,.hero .meta,.eyebrow", { y: 50, opacity: 0, duration: 1.1, stagger: 0.12, ease: "power3.out" });

      const mm = gsap.matchMedia();
      mm.add("(min-width:769px)", () => {
        const wrap = document.getElementById("hwrap");
        const track = document.getElementById("htrack");
        const dist = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: { trigger: wrap, start: "top 12%", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
        });
      });

      const cards = gsap.utils.toArray(".card");
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(c, { scale: 0.93, opacity: 0.55, ease: "none", scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: true } });
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: root }
  );

  return (
    <main ref={root}>
      <nav>
        <a href="#top" className="serif" style={{ fontSize: 20 }}>Suraj.</a>
        <div><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div>
      </nav>

      <header className="hero" id="top">
        <div className="eyebrow">Portfolio · 2026 · Sirsa, India</div>
        <h1 className="serif">Web &amp; <em>graphic</em><br />designer.</h1>
        <p>I design clean, responsive WordPress websites and brand creatives that help small businesses look sharp and perform better online.</p>
        <div className="meta"><span>1+ year experience</span><span>WordPress · Elementor · HTML/CSS</span><span>Available for projects</span></div>
      </header>

      <section id="work">
        <div className="label"><h2 className="serif">Selected work</h2><span>Scroll →</span></div>
        <div className="hwrap" id="hwrap">
          <div className="htrack" id="htrack">
            {projects.map((p, i) => (
              <a key={p.title} className={"proj" + (p.projectDetails?.image?.node?.sourceUrl ? " has-img" : "")} href={p.projectDetails?.liveUrl || "#"} target="_blank" rel="noopener noreferrer">
                <span className="go">↗</span>
                {p.projectDetails?.image?.node?.sourceUrl ? (
                  <img className="shot" src={p.projectDetails.image.node.sourceUrl} alt={p.title} loading="lazy" />
                ) : (
                  <div className="n serif">{String(i + 1).padStart(2, "0")}</div>
                )}
                <div>
                  <h3 className="serif">{p.title}</h3>
                  <p>{p.projectDetails?.description}</p>
                  <div className="tags">
                    {(p.projectDetails?.tags || "").split(",").filter(Boolean).map((t) => <i key={t}>{t.trim()}</i>)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about">
        <div className="label"><h2 className="serif">Experience &amp; craft</h2><span>Stack ↓</span></div>
        <div className="stack">
          <article className="card" style={{ "--i": 0 }}>
            <div><div className="k">Current</div><h3 className="serif">Atnod</h3><p className="sub">Graphic &amp; Web Designer · 1 year</p></div>
            <ul>
              <li><b>Responsive sites</b> — built WordPress websites with Elementor.</li>
              <li><b>Creatives</b> — banners, social media posts and website graphics.</li>
              <li><b>Custom code</b> — tuned pages with HTML &amp; CSS.</li>
              <li><b>SEO</b> — basic on-page improvements.</li>
            </ul>
          </article>
          <article className="card" style={{ "--i": 1 }}>
            <div><div className="k">Previous</div><h3 className="serif">DG Rocket</h3><p className="sub">Graphic &amp; Web Designer Intern · 6 months</p></div>
            <ul>
              <li><b>Websites</b> — responsive builds in WordPress (Elementor).</li>
              <li><b>Landing pages</b> — business sites and campaign pages.</li>
              <li><b>Marketing</b> — creatives in Canva and Photoshop.</li>
              <li><b>Upkeep</b> — maintenance and content updates.</li>
            </ul>
          </article>
          <article className="card" style={{ "--i": 2 }}>
            <div><div className="k">Toolkit</div><h3 className="serif">Skills &amp; tools</h3></div>
            <div className="chips">
              {["Web Design","Graphic Design","WordPress","Elementor","HTML & CSS","Photoshop","Illustrator","Canva","ChatGPT","Basic SEO"].map((s) => <span key={s}>{s}</span>)}
            </div>
          </article>
          <article className="card" style={{ "--i": 3 }}>
            <div><div className="k">Background</div><h3 className="serif">Education</h3></div>
            <ul>
              <li><b>B.Com</b> — Govt. National College (2021–2024)</li>
              <li><b>Diploma</b> — Digital Marketing</li>
              <li><b>12th</b> — Central Senior Secondary School, 90%</li>
              <li><b>10th</b> — Jai Shree High School, 84%</li>
              <li><b>Languages</b> — Hindi, English</li>
            </ul>
          </article>
        </div>
      </section>

      <footer id="contact">
        <div className="eyebrow">Let’s work together</div>
        <h2 className="serif">Have a project<br />in mind?</h2>
        <a className="btn" href="mailto:surajsharmaofficial7@gmail.com">surajsharmaofficial7@gmail.com</a>
        <p style={{ marginTop: 20, color: "var(--mute)" }}>+91 79884 21657</p>
        <small>© 2026 Suraj Sharma</small>
      </footer>
    </main>
  );
}
