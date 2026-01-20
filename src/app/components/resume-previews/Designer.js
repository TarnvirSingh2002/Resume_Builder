"use client";

import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function ClassicDevOpsResume({ data }) {
  const resumeRef = useRef(null);

  const {
    fullName,
    email,
    phone,
    location,
    linkedin,
    // portfolio,
    summary,
    education = [],
    experience = [],
    skills = "",
    certifications = "",
  } = data;

  console.log("data",data);

  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fullName}_Resume.pdf`);
  };

  return (
    <div style={styles.wrapper}>
      {/* Download Button */}
      <div className="w-full max-w-[210mm] flex justify-end px-4 md:px-0"
                style={{ position: "absolute" }}>
                <button
                    onClick={handleDownloadPDF}
                    className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center group"
                    title="Download as PDF"
                >
                    <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                    </svg>
                </button>
            </div>
      {/* Resume */}
      <div ref={resumeRef} style={styles.resume}>
        {/* Header */}
        <h1 style={styles.name}>{fullName}</h1>
        <p style={styles.contact}>
          {email} | {phone} | {location} | {linkedin}
        </p>

        <p style={styles.summary}>{summary}</p>

        {/* {portfolio && (
          <p style={styles.portfolio}>
            <strong>Portfolio:</strong>{" "}
            <a href={portfolio} target="_blank">{portfolio}</a>
          </p>
        )} */}

        {/* Education */}
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} style={styles.block}>
              <strong>{edu.institute}</strong>
              <p>{edu.degree}</p>
              {/* <span style={styles.muted}>
                {edu.duration} • {edu.location}
              </span> */}
              {/* <ul>
                {edu.points?.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul> */}
            </div>
          ))}
        </Section>

        {/* Experience */}
        <Section title="Experience">
          {experience.map((exp, i) => (
            <div key={i} style={styles.block}>
              <strong>{exp.company}</strong>
              <p>{exp.role}</p>
              <span style={styles.muted}>
                {exp.duration} • {exp?.location}
              </span>
              {/* <ul>
                {exp.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul> */}
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <p>{skills}</p>
        </Section>

        {/* Certifications */}
        <Section title="Certifications">
          <p>{certifications}</p>
        </Section>
      </div>
    </div>
  );
}

/* ---------- Reusable Section ---------- */
function Section({ title, children }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}

/* ---------- Styles ---------- */
const styles = {
  wrapper: {
    background: "#f3f4f6",
    padding: "90px 0 30px",
    display: "flex",
    justifyContent: "center",
  },
  downloadWrap: {
    position: "absolute",
    top: 20,
    right: 40,
  },
  downloadBtn: {
    padding: "10px 16px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  resume: {
    width: "210mm",
    background: "#fff",
    padding: "32px",
    fontFamily: "Arial, sans-serif",
    color: "#111",
    lineHeight: 1.5,
  },
  name: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f4fd8",
    marginBottom: "4px",
  },
  contact: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "14px",
  },
  summary: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  portfolio: {
    fontSize: "14px",
    marginBottom: "18px",
  },
  section: {
    marginTop: "22px",
  },
  sectionTitle: {
    fontSize: "18px",
    color: "#1f4fd8",
    borderBottom: "2px solid #1f4fd8",
    paddingBottom: "4px",
    marginBottom: "12px",
  },
  block: {
    marginBottom: "14px",
  },
  muted: {
    fontSize: "12px",
    color: "#666",
  },
};
