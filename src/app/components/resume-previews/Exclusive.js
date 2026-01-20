"use client";

import { useRef } from "react";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
export default function SarahATSResume({ data = {} }) {
  const resumeRef = useRef(null);

  const {
    fullName = "SARAH JACKSON",
    phone = "588.888.9999",
    email = "youremail@gmail.com",
    location = "New York, NY",
    linkedin = "linkedin.com/in/username",
    summary = "",

    experience = [],
    education = [],
    skills = [],
    certifications = [],
  } = data;

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
      <div ref={resumeRef} style={styles.resume}>

        {/* HEADER */}
        <div style={styles.headerBar}>
          <h1 style={styles.name}>{fullName}</h1>
        </div>

        <p style={styles.contact}>
          {phone} | {email} | {location} | {linkedin}
        </p>

        {/* SUMMARY */}
        {summary && (
          <Section title="SUMMARY">
            <p style={styles.text}>{summary}</p>
          </Section>
        )}

        
          <Section title="SKILLS">
            <p style={styles.text}>
              {skills}
            </p>
          </Section>

        {/* EXPERIENCE */}
        {Array.isArray(experience) && experience.length > 0 && (
          <Section title="EXPERIENCE">
            {experience.map((exp, i) => (
              <div key={i} style={styles.block}>
                <div style={styles.row}>
                  <strong>{exp.title}</strong>
                  <span>{exp.duration}</span>
                </div>

                <div style={styles.sub}>
                  {exp.company}, {exp.location}
                </div>

                {Array.isArray(exp.points) && (
                  <ul style={styles.list}>
                    {exp.points.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}


        {/* EDUCATION */}
        {Array.isArray(education) && education.length > 0 && (
          <Section title="EDUCATION">
            {education.map((edu, i) => (
              <div key={i} style={styles.block}>
                <div style={styles.row}>
                  <strong>{edu.degree}</strong>
                  <span>{edu.duration}</span>
                </div>

                <div style={styles.sub}>
                  {edu.institution}, {edu.location}
                </div>

                {Array.isArray(edu.points) && (
                  <ul style={styles.list}>
                    {edu.points.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        
          <Section title="CERTIFICATIONS">
            <ul style={styles.list}>
              {certifications}
            </ul>
          </Section>

      </div>
    </div>
  );
}


function Section({ title, children }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <hr style={styles.hr} />
      {children}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  wrapper: {
    background: "#cfd6d6",
    padding: "90px 0 30px",
    position: "relative",  
  },

  resume: {
    width: "210mm",
    minHeight: "297mm",
    background: "#fff",
    margin: "auto",
    padding: "25mm",
    fontFamily: "Georgia, serif",
    color: "#333",
  },

  headerBar: {
    background: "#e5e5e5",
    padding: "12px 0",
    textAlign: "center",
  },

  name: {
    margin: 0,
    letterSpacing: "3px",
    fontWeight: "400",
  },

  contact: {
    textAlign: "center",
    fontSize: "12px",
    margin: "12px 0 20px",
  },

  section: {
    marginBottom: "22px",
  },

  sectionTitle: {
    textAlign: "center",
    letterSpacing: "2px",
    fontSize: "14px",
    marginBottom: "6px",
  },

  hr: {
    border: "none",
    borderTop: "1px solid #999",
    marginBottom: "12px",
  },

  block: {
    marginBottom: "16px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
  },

  sub: {
    fontSize: "13px",
    marginBottom: "6px",
  },

  text: {
    fontSize: "13px",
    lineHeight: "1.6",
  },

  list: {
    paddingLeft: "18px",
    fontSize: "13px",
    lineHeight: "1.5",
  },
};
