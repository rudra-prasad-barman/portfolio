import { useEffect, useState } from "react";
import Header from "../components/Header";

const projects = [
  {
    number: "01",
    type: "Civic technology · Full stack",
    title: "AI Municipality",
    description:
      "A citizen-first platform for reporting city infrastructure issues, built to help municipal teams verify, triage, and act faster.",
    stack: ["React JS", "Spring Boot", "MySQL", "Google AI Studio"],
    accent: "lime",
    live: "",
  },
  {
    number: "03",
    type: "Student community · Live product",
    title: "MCA27",
    description:
      "A practical student hub for notes, placement preparation, peer support, and the everyday resources MCA students actually need.",
    stack: ["React JS", "Student resources", "Placement support", "Live website"],
    accent: "cyan",
    live: "https://mca27.vercel.app",
  },
  {
    number: "02",
    type: "Campus operations · .NET",
    title: "Attendance, rethought",
    description:
      "A dependable attendance system with geofencing validation that replaced manual record-keeping on a college local network.",
    stack: ["ASP.NET MVC", "C#", "ADO.NET", "MS SQL Server"],
    accent: "violet",
    live: "",
  },
];

const skills = [
  [["C#", "⌘"], ["ASP.NET MVC", "▣"], ["ADO.NET", "◈"], ["MS SQL Server", "▤"]],
  [["React JS", "⚛"], ["TypeScript", "TS"], ["JavaScript", "JS"], ["HTML / CSS", "</>"]],
  [["Spring Boot", "◒"], ["Java", "☕"], ["MySQL", "◉"], ["REST APIs", "⇄"]],
  [["Git", "⑂"], ["GitHub", "◌"], ["Postman", "⚯"], ["VS Code", "⌗"]],
];

const codeSnippets = {
  Java: `import java.util.List;
import java.util.stream.Collectors;

public final class PlacementHub {
  public List<String> shortlist(List<Student> students) {
    return students.stream()
      .filter(student -> student.score() >= 80)
      .map(Student::name)
      .sorted()
      .collect(Collectors.toList());
  }
}`,
  "C#": `public async Task<IReadOnlyList<Note>> SearchAsync(
    string query, CancellationToken token) {
  var notes = await _notes
    .Where(note => note.Title.Contains(query))
    .OrderByDescending(note => note.UpdatedAt)
    .ToListAsync(token);
  return notes;
}`,
};

function renderCodeLine(line, lineIndex) {
  const tokenPattern = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\/\/.*$|\b(?:import|public|private|final|class|return|new|var|async|await|Task|void|string|List|IReadOnlyList|CancellationToken|static|if|else|filter|map|sorted|collect|true|false)\b|\b\d+\b)/g;
  const parts = [];
  let cursor = 0;
  let match;
  while ((match = tokenPattern.exec(line)) !== null) {
    if (match.index > cursor) parts.push(<span key={`${lineIndex}-${cursor}`}>{line.slice(cursor, match.index)}</span>);
    const token = match[0];
    const type = token.startsWith("//") ? "comment" : token.startsWith("\"") || token.startsWith("'") ? "string" : /^\d+$/.test(token) ? "number" : "keyword";
    parts.push(<span className={`code-token ${type}`} key={`${lineIndex}-${match.index}`}>{token}</span>);
    cursor = match.index + token.length;
  }
  if (cursor < line.length) parts.push(<span key={`${lineIndex}-${cursor}`}>{line.slice(cursor)}</span>);
  return parts;
}

function CodeConsole() {
  const [language, setLanguage] = useState("Java");
  const [visibleCode, setVisibleCode] = useState("");

  useEffect(() => {
    let character = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const source = codeSnippets[language];
      if (!deleting) {
        character += 1;
        setVisibleCode(source.slice(0, character));
        if (character >= source.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1800);
          return;
        }
      } else {
        character -= 1;
        setVisibleCode(source.slice(0, character));
        if (character <= 0) deleting = false;
      }
      timer = window.setTimeout(tick, deleting ? 22 : 42);
    };
    timer = window.setTimeout(tick, 300);
    return () => window.clearTimeout(timer);
  }, [language]);

  return (
    <div className="code-console" aria-label={`${language} live code console`}>
      <div className="console-top"><div className="console-dots"><i /><i /><i /></div><span className="console-path"><b>~/rudra/portfolio</b> <em>/ {language.toLowerCase()}</em></span><b className="console-live"><i /> live</b></div>
      <div className="console-tabs">{Object.keys(codeSnippets).map((item) => <button className={language === item ? "active" : ""} key={item} onClick={() => setLanguage(item)}>{item}</button>)}</div>
      <div className="console-editor"><span className="editor-corner">●  RUNNING</span><pre><code><span className="line-count">{visibleCode.split("\n").map((_, index) => `${String(index + 1).padStart(2, "0")}\n`)}</span><span className="code-text">{visibleCode.split("\n").map((line, index) => <span className="code-line" key={`${language}-${index}`}>{renderCodeLine(line, index)}{index < visibleCode.split("\n").length - 1 ? "\n" : null}</span>)}<span className="caret" /></span></code></pre><span className="editor-scan" /></div>
      <div className="console-status"><span><i /> compiling in real time</span><span>UTF-8 · {language}</span></div>
    </div>
  );
}

export default function Dashboard() {
  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-reveal");
    let previousY = window.scrollY;
    const observer = new IntersectionObserver((entries) => {
      const direction = window.scrollY >= previousY ? "down" : "up";
      previousY = window.scrollY;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("scroll-from-up", "scroll-from-down");
          entry.target.classList.add("is-visible", `scroll-from-${direction}`);
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header />

      <main>
        <section className="hero section-pad" id="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="status-dot" /> Available for opportunities · Kolkata, WB</p>
            <h1>Building digital<br /><em>experiences</em> that work.</h1>
            <p className="hero-intro">
              I&apos;m <strong>Rudra Prasad Barman</strong> — a .NET developer and full-stack engineer
              who turns complex problems into clear, reliable products.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <span>↗</span></a>
              <a className="text-link" href="mailto:rudraprasadbarmancoder@gmail.com">Let&apos;s talk <span>→</span></a>
            </div>
            <div className="hero-meta">
              <span>01 / 03</span><span className="meta-line" /><span>Scroll to explore</span>
            </div>
          </div>
          <div className="hero-console reveal reveal-delay"><CodeConsole /></div>
        </section>

        <section className="marquee" aria-label="Technology highlights">
          <div className="marquee-track"><span>ASP.NET MVC</span><b>✦</b><span>REACT JS</span><b>✦</b><span>SPRING BOOT</span><b>✦</b><span>MS SQL</span><b>✦</b><span>PRODUCT THINKING</span><b>✦</b><span>ASP.NET MVC</span><b>✦</b><span>REACT JS</span></div>
        </section>

        <section className="about section-pad scroll-reveal" id="about">
          <div className="section-heading"><p className="eyebrow">02 / About me</p><h2>Good software feels<br /><em>inevitable.</em></h2></div>
          <div className="about-content">
            <p className="lead">I enjoy the part where an ambitious idea becomes a useful, thoughtfully engineered experience.</p>
            <p>Currently pursuing my MCA at Techno Main Salt Lake, I work across the .NET and JavaScript ecosystems. I care about clean architecture, accessible interfaces, and the small details that make a product feel considered.</p>
            <div className="stats"><div><strong>02</strong><span>Real-world<br />projects</span></div><div><strong>04+</strong><span>Core stacks<br />in practice</span></div><div><strong>2027</strong><span>MCA<br />graduation</span></div></div>
          </div>
        </section>

        <section className="experience section-pad scroll-reveal" id="experience">
          <div className="section-heading compact"><p className="eyebrow">03 / Experience</p><h2>Where I&apos;ve been<br /><em>learning by doing.</em></h2></div>
          <div className="timeline">
            <article className="timeline-item"><div className="timeline-date">SEP 2026 — PRESENT</div><div><h3>.NET Developer <span>(Associate)</span></h3><a className="company company-link" href="https://gtechwebsolutions.in/" target="_blank" rel="noreferrer">GTech Web Solutions ↗</a><p>Building production-grade web applications with ASP.NET MVC, C#, ADO.NET, Bootstrap, and MS SQL.</p><div className="tag-row"><span>ASP.NET MVC</span><span>C#</span><span>ADO.NET</span><span>MS SQL</span></div></div><span className="timeline-orb" /></article>
            <article className="timeline-item"><div className="timeline-date">SEP 2026 — PRESENT</div><div><h3>Frontend Developer <span>(Intern)</span></h3><a className="company company-link" href="https://anweshasdigitalverse.in/" target="_blank" rel="noreferrer">Anwesha&apos;s Digital Verse ↗</a><p>Developing the responsive frontend of a production-grade bike riding app and integrating REST APIs with the team.</p><div className="tag-row"><span>React JS</span><span>TypeScript</span><span>REST APIs</span></div></div><span className="timeline-orb" /></article>
          </div>
        </section>

        <section className="projects section-pad scroll-reveal" id="projects">
          <div className="projects-top"><div className="section-heading compact"><p className="eyebrow">04 / Selected work</p><h2>Ideas made<br /><em>real.</em></h2></div><p className="projects-note">A few projects where engineering meets empathy, utility, and a little bit of ambition.</p></div>
          <div className="project-list">{projects.map((project) => <article className={`project-card ${project.accent}`} key={project.number}><div className="project-number">{project.number}</div><div className="project-body"><p className="project-type">{project.type}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>{project.live && <a className="project-live" href={project.live} target="_blank" rel="noreferrer">Visit live project <span>↗</span></a>}</div><span className="project-arrow">↗</span><span className="card-shine" /></article>)}</div>
        </section>

        <section className="toolkit section-pad scroll-reveal" id="skills">
          <div className="section-heading compact"><p className="eyebrow">05 / Toolkit</p><h2>Tools for turning<br /><em>thought into form.</em></h2></div>
          <div className="skills-grid">{skills.flat().map(([skill, icon], index) => <div className="skill-card" key={skill} style={{ "--card-delay": `${index * 70}ms` }}><span className="skill-icon" aria-hidden="true">{icon}</span><p>{skill}</p><span className="skill-arrow">↗</span></div>)}</div>
        </section>

        <section className="features section-pad scroll-reveal" id="features">
          <div className="section-heading compact"><p className="eyebrow">06 / What I bring</p><h2>Twenty ways to make<br /><em>better digital work.</em></h2></div>
          <div className="feature-grid">{["Responsive by default", "Accessible interactions", "Clear visual hierarchy", "Performance minded", "Semantic HTML", "Reusable components", "API integration", "Secure data flows", "Mobile-first thinking", "Clean state management", "Design systems", "Micro-interactions", "SEO foundations", "Cross-browser QA", "Readable code", "Database modelling", "Geolocation features", "AI-assisted workflows", "Git collaboration", "Production curiosity", "Motion design", "Progressive enhancement", "Component testing", "Error-state UX"].map((feature, index) => <div className="feature-item" key={feature}><span>{String(index + 1).padStart(2, "0")}</span><p>{feature}</p></div>)}</div>
        </section>

        <section className="certificate section-pad scroll-reveal" id="certificate">
          <div className="certificate-card"><div><p className="eyebrow">07 / Certification</p><h2>Proof of<br /><em>practice.</em></h2></div><div className="certificate-copy"><p>Full Stack Web Development with C# OOP, MS SQL &amp; ASP.NET MVC — Oak Academy.</p><span className="certificate-id">UC-23981160-651d-4378-922a-db41162d4e36</span><a className="certificate-link" href="https://www.udemy.com/certificate/UC-23981160-651d-4378-922a-db41162d4e36/" target="_blank" rel="noreferrer">View certificate <span>↗</span></a></div></div>
        </section>

        <section className="cv-section section-pad scroll-reveal" id="cv">
          <div className="cv-card">
            <div className="cv-icon" aria-hidden="true">CV</div>
            <div className="cv-copy"><p className="eyebrow">08 / Resume</p><h2>Let&apos;s talk<br /><em>about my work.</em></h2><p>View my experience, technical toolkit, education, and projects in one concise document.</p></div>
            <div className="cv-actions"><a className="cv-button" href="https://drive.google.com/file/d/1feWlmmwJs86ty1Wqy2T21sFix766fiyy/view?usp=sharing" target="_blank" rel="noreferrer">View CV <span>↗</span></a><a className="cv-download" href="https://drive.google.com/file/d/1feWlmmwJs86ty1Wqy2T21sFix766fiyy/view?usp=sharing" target="_blank" rel="noreferrer">Open PDF ↗</a></div>
          </div>
        </section>

        <section className="contact section-pad scroll-reveal" id="contact"><div className="contact-inner"><p className="eyebrow">07 / Start a conversation</p><h2>Have a good problem?<br /><em>Let&apos;s solve it.</em></h2><a className="contact-email" href="mailto:rudraprasadbarmancoder@gmail.com">rudraprasadbarmancoder@gmail.com <span>↗</span></a><div className="contact-details"><span>Kolkata, West Bengal</span><span>+91 9635286713</span><a href="https://www.linkedin.com/in/rudra-prasad-barman/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/rudra-prasad-barman" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></section>
      </main>
      <footer><span>© 2026 Rudra Prasad Barman</span><span>Designed & built with intention.</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
