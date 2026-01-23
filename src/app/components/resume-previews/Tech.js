"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function ProfessionalATS({ data }) {
    if (!data) return null;
    const resumeRef = useRef(null);
    const {
        fullName,
        email,
        phone,
        location,
        linkedin,
        summary,
        experience = [],
        education = [],
        skills,
        certifications,
    } = data;

    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleDownloadPDF = async () => {
        if (!resumeRef.current) return;

        const element = resumeRef.current;
        const btn = element.querySelector(".download-btn");
    if (btn) btn.style.display = "none";

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
            if (btn) btn.style.display = "flex";
        } catch (err) {
            console.error(err);
            alert("PDF generation failed");
        }
    };

    return (
        <>
            <style>{`
                .resume-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 5rem;
                    padding-bottom: 2.5rem;
                    position: relative;
                }

                .resume-paper {
                    position: relative;
                    width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                    background-color: white;
                    color: black;
                    padding: 2.5rem;
                    font-family: Georgia, serif;
                    line-height: 1.625;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
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

                .download-icon {
                    width: 1.25rem;
                    height: 1.25rem;
                }

                .resume-header {
                    text-align: right;
                    margin-bottom: 2rem;
                }

                .resume-header h1 {
                    font-size: 1.875rem;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin: 0;
                }

                .resume-header p {
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                    margin-bottom: 0;
                }

                .summary-section {
                    margin-bottom: 1rem;
                }

                .summary-section p {
                    font-style: italic;
                    font-size: 0.875rem;
                    margin-bottom: 0.5rem;
                }

                .section {
                    margin-bottom: 2rem;
                }

                .section-title {
                    font-size: 0.875rem;
                    font-weight: bold;
                    border-bottom: 2px solid black;
                    padding-bottom: 0.25rem;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    margin-top: 0;
                }

                .experience-item {
                    margin-bottom: 0.75rem;
                }

                .experience-header {
                    display: flex;
                    justify-content: space-between;
                    font-weight: 600;
                }

                .experience-header p {
                    margin: 0;
                }

                .experience-duration {
                    font-size: 0.875rem;
                }

                .experience-company {
                    font-style: italic;
                    font-size: 0.875rem;
                    margin-bottom: 0.5rem;
                    margin-top: 0;
                }

                .experience-description {
                    list-style-type: disc;
                    list-style-position: inside;
                    font-size: 0.875rem;
                    margin: 0;
                    padding: 0;
                }

                .experience-description li {
                    margin-bottom: 0.25rem;
                }

                .education-item {
                    margin-bottom: 0.75rem;
                }

                .education-header {
                    display: flex;
                    justify-content: space-between;
                    font-weight: 600;
                }

                .education-header p {
                    margin: 0;
                }

                .education-year {
                    font-size: 0.875rem;
                }

                .education-institute {
                    font-style: italic;
                    font-size: 0.875rem;
                    margin-top: 0;
                    margin-bottom: 0;
                }

                .skills-section {
                    margin-bottom: 0;
                }

                .skills-text {
                    font-size: 0.875rem;
                    margin-bottom: 0.5rem;
                    margin-top: 0;
                }

                .skills-text strong {
                    font-weight: bold;
                }

                @media print {
                    .resume-container {
                        padding: 0;
                    }

                    .download-btn {
                        display: none;
                    }

                    .resume-paper {
                        width: 100%;
                        box-shadow: none;
                        padding: 1.5rem;
                    }
                }
                   @media print {
                        .resume-container {
                            padding: 0;
                        }

                        .download-btn {
                            display: none;
                        }

                        .resume-paper {
                            width: 100%;
                            box-shadow: none;
                            padding: 1.5rem;
                        }
                    }

            `}</style>

            <div className="resume-container">
                <div ref={resumeRef} className="resume-paper">
                    <div>
                        <button
                            onClick={handleDownloadPDF}
                            title="Download PDF"
                            className="download-btn"
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
                    </div>

                    <header className="resume-header">
                        <h1>{capitalize(fullName) || "Your Name"}</h1>
                        <p>
                            {location && <span>{capitalize(location)}</span>}
                            {phone && <> • {phone}</>}
                        </p>
                        <p>{email}</p>
                        <p>{linkedin && <> {linkedin}</>}</p>
                    </header>

                    <section className="summary-section">
                        <p>{summary}</p>
                    </section>

                    <section className="section">
                        <h2 className="section-title">Work Experience</h2>

                        {experience.map((exp, index) => (
                            <div key={index} className="experience-item">
                                <div className="experience-header">
                                    <p>{exp?.role ?capitalize(exp.role):""}</p>
                                    <p className="experience-duration">{exp.duration}</p>
                                </div>

                                <p className="experience-company">{exp?.company ?capitalize(exp.company):""}</p>

                                {exp.description && (
                                    <ul className="experience-description">
                                        {exp.description.split("\n").map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>

                    <section className="section">
                        <h2 className="section-title">Qualifications</h2>

                        {education.map((edu, index) => (
                            <div key={index} className="education-item">
                                <div className="education-header">
                                    <p>{edu?.degree?capitalize(edu.degree):""}, {edu?.location?capitalize(edu.location):""}</p>
                                    <p className="education-year">{edu.year}</p>
                                </div>
                                <p className="education-institute">{edu?.institute?capitalize(edu.institute):""}</p>
                            </div>
                        ))}
                    </section>

                    <section className="skills-section">
                        <h2 className="section-title">Skills & Other</h2>

                        {skills && (
                            <p className="skills-text">
                                <strong>Skills:</strong> {skills}
                            </p>
                        )}

                        {certifications && (
                            <p className="skills-text">
                                <strong>Certifications:</strong> {certifications}
                            </p>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}