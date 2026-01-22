"use client";

import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
export default function EnhancvModern({ data }) {
  const resumeRef = useRef(null);
  const [hideButton, setHideButton] = useState(false);

  const {
    fullName,
    email,
    phone,
    location,
    linkedin,
    summary,
    experience = [],
    education = [],
    skills = "",
    certifications = "",
  } = data;

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleDownloadPDF = () => {
    
    // UNCOMMENT THIS CODE WHEN YOU ADD html2canvas AND jsPDF TO YOUR PROJECT:
    
    if (!resumeRef.current) return;

    setHideButton(true);

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(resumeRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff"
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = 210;
        const pageHeight = 297;

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`${fullName || "Resume"}.pdf`);
      } catch (err) {
        console.error(err);
        alert("PDF generation failed");
      } finally {
        setHideButton(false);
      }
    }, 100);

  };

  return (
    <>
      <style>{`
        .resume-outer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 5rem;
          padding-bottom: 2.5rem;
          position: relative;
        }

        .resume-main {
          position: relative;
          width: 900px;
          margin-left: auto;
          margin-right: auto;
          background-color: white;
          color: black;
          padding: 2.5rem;
          font-family: Georgia, serif;
          line-height: 1.625;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
        }

        .download-btn {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          background-color: #2563eb;
          color: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .download-btn:hover {
          background-color: #1d4ed8;
          transform: scale(1.1);
        }

        .download-btn.hidden {
          display: none !important;
        }

        .download-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .resume-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .resume-header h1 {
          font-size: 1.875rem;
          font-weight: bold;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin: 0;
        }

        .resume-header .contact-info {
          font-size: 0.875rem;
          margin-top: 0.5rem;
          color: #374151;
        }

        .divider {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          border-top: 1px solid #9ca3af;
        }

        .section {
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          margin-top: 0;
        }

        .section-content-center {
          font-size: 0.875rem;
          text-align: center;
        }

        .experience-item {
          margin-bottom: 1.25rem;
        }

        .experience-header {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
        }

        .experience-header p {
          margin: 0;
        }

        .experience-location {
          font-size: 0.875rem;
          color: #4b5563;
        }

        .experience-subheader {
          display: flex;
          justify-content: space-between;
          font-style: italic;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .experience-subheader p {
          margin: 0;
        }

        .experience-description {
          list-style-type: disc;
          font-size: 0.875rem;
          margin: 0;
        }

        .experience-description li {
          margin-bottom: 0.25rem;
        }

        .education-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .education-left p {
          margin: 0;
        }

        .education-institute {
          font-weight: 600;
        }

        .education-degree {
          font-style: italic;
          font-size: 0.875rem;
        }

        .education-right {
          text-align: right;
        }

        .education-right p {
          font-size: 0.875rem;
          margin: 0;
        }

        @media print {
          .resume-outer-container {
            padding: 0;
          }

          .download-btn {
            display: none;
          }

          .resume-main {
            width: 100%;
            border: none;
            border-radius: 0;
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="resume-outer-container">
        <div ref={resumeRef} className="resume-main">
          <button
            onClick={handleDownloadPDF}
            title="Download PDF"
            className={`download-btn ${hideButton ? 'hidden' : ''}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="download-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v12m0 0l-4-4m4 4l4-4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              />
            </svg>
          </button>

          {/* HEADER */}
          <header className="resume-header">
            <h1>{fullName}</h1>
            <p className="contact-info">
              {phone} • {email} • {linkedin} • {capitalize(location)}
            </p>
          </header>

          <Divider />
          <Divider />

          {/* SUMMARY */}
          <Section title="Summary">
            <p className="section-content-center">{summary}</p>
          </Section>

          <Divider />
          <Divider />

          {/* EXPERIENCE */}
          <Section title="Experience">
            {experience.map((exp, i) => (
              <div key={i} className="experience-item">
                <div className="experience-header">
                  <p>{exp?.company ? capitalize(exp.company) : ''}</p>
                  <p className="experience-location">{exp?.location ? capitalize(exp.location) : ''}</p>
                </div>

                <div className="experience-subheader">
                  <p>{exp?.role ? capitalize(exp.role) : ''}</p>
                  <p>{exp?.duration}</p>
                </div>

                <ul className="experience-description">
                  {exp.description}
                </ul>
              </div>
            ))}
          </Section>

          <Divider />
          <Divider />

          {/* EDUCATION */}
          <Section title="Education">
            {education.map((edu, i) => (
              <div key={i} className="education-item">
                <div className="education-left">
                  <p className="education-institute">{edu?.institute ? capitalize(edu.institute) : ''}</p>
                  <p className="education-degree">{edu?.degree ? capitalize(edu.degree) : ''}</p>
                </div>
                <div className="education-right">
                  <p>{edu.year}</p>
                  <p>{edu?.location ? capitalize(edu.location) : ''}</p>
                </div>
              </div>
            ))}
          </Section>

          <Divider />
          <Divider />

          {/* SKILLS */}
          <Section title="Skills">
            <p className="section-content-center">{skills}</p>
          </Section>

          <Divider />
          <Divider />

          {/* CERTIFICATIONS */}
          <Section title="Certifications">
            <p className="section-content-center">{certifications}</p>
          </Section>
        </div>
      </div>
    </>
  );
}

/* ----------------- Helpers ----------------- */

function Section({ title, children }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

function Divider() {
  return <hr className="divider" />;
}