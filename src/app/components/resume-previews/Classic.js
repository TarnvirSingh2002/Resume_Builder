"use client";

import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function ClassicResumePreview({ data }) {
    const resumeRef = useRef(null);

    const {
        fullName = "",
        email = "",
        phone = "",
        linkedin = "",
        location = "",
        summary="",
        skills = "",
        experience = [],
        projects = [],
        certifications = [],
        education = []
    } = data;

    function capitalize(str) {
        if (!str) return '';                    // handle empty / null / undefined
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

    const handleDownloadPDF = async () => {
        if (!resumeRef.current) return;

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
        }
    };

    return (
        <div className="flex flex-col items-center pt-20 pb-10 relative">

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
            <div
                ref={resumeRef}
                className="resume-pdf bg-white text-black-900"
                style={{
                    width: "210mm",
                    minHeight: "297mm",
                    padding: "40px 50px",
                    fontSize: "11pt",
                    lineHeight: "1.4",
                    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                    fontFamily: "serif"
                }}
            >
                {/* NAME */}
                <h1 className="text-4xl font-bold text-center mb-2">
                    {capitalize(fullName)}
                </h1>

                <hr className="border-gray-800 mb-3" />

                {/* CONTACT */}
                <p className="text-center text-sm mb-4 space-x-3">
                    {phone && <span>{phone}</span>}
                    {email && <span>• {email}</span>}
                    {linkedin && <span>• {linkedin}</span>}
                    {location && <span>• {capitalize(location)}</span>}

                </p>

                <hr className="border-gray-800 mb-5" />
                <span>{summary}</span>
                <hr className="border-gray-800 mb-5 mt-5" />
                {/* TECHNICAL SKILLS */}
                {skills && (
                    <Section title="Technical Skills">
                        <p>{skills}</p>
                    </Section>
                )}

                {/* EXPERIENCE */}
                {experience.length > 0 && (
                    <Section title="Experience / Projects">
                        {experience.map((exp, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between font-semibold">
                                    <span>{exp?.company ? capitalize(exp.company) : ''}</span>
                                    <span className="text-sm">{exp.duration}</span>
                                    <span>{exp?.role ? capitalize(exp.role) : ''}</span>
                                </div>
                                {exp.location && (
                                    <p className="text-sm text-gray-600">{exp?.location ? capitalize(exp.location) : ''}</p>
                                )}
                                <ul className="list-disc mt-2 space-y-1">
                                    {exp.description}
                                </ul>
                            </div>
                        ))}
                    </Section>
                )}

                {/* EDUCATION */}
                {education.length > 0 && (
                    <Section title="Education">
                        {education.map((edu, i) => (
                            <div key={i} className="mb-2">
                                <div className="flex justify-between font-semibold">
                                    <span>{edu?.institute ? capitalize(edu.institute) : ''}</span>
                                    <span className="text-sm">{edu.year}</span>
                                </div>
                                <p className="text-sm">{edu?.degree ? capitalize(edu.degree):""}</p>
                                {edu.location && (
                                    <p className="text-sm text-gray-600">{edu?.location ? capitalize(edu.location) : ''}</p>
                                )}
                            </div>
                        ))}
                    </Section>
                )}



                {/* CERTIFICATIONS */}
                {certifications.length > 0 && (
                    <Section title="Certifications">
                        <ul className="list-disc space-y-1">
                            {certifications}
                        </ul>
                    </Section>
                )}
            </div>
        </div>
    );
}

/* ===== Helper Section ===== */

function Section({ title, children }) {
    return (
        <div className="mb-5">
            <h2 className="font-bold text-lg">{title}</h2>
            <hr className="border-gray-600 mb-3" />
            {children}
        </div>
    );
}
