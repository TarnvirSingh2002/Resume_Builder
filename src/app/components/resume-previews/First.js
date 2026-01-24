"use client";

import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
export default function SecurityDevSecOps({ data }) {
    const resumeRef = useRef(null);

    const {
        fullName = "",
        email = "",
        phone = "",
        location = "",
        linkedin = "",
        summary = "",
        education = [],
        experience = [],
        skills = "",
        certifications = ""
    } = data;

    function capitalize(str) {
        if (!str) return '';
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

            // First page
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Remaining pages
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${fullName?.trim() || "Resume"}.pdf`);
        } catch (error) {
            console.error(error);
            alert("PDF generation failed. Try again.");
        }
    };

    return (

        <div className="flex flex-col items-center pt-18 pb-10">

            {/* Download Icon - Top Right */}
            <div className="w-full max-w-[210mm] flex justify-end px-4 md:px-0"
            style={{position:"absolute"}}>
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

            {/* RESUME */}
            <div
                ref={resumeRef}
                className="resume-pdf bg-white text-gray-800 font-sans"
                style={{
                    width: "210mm",
                    minHeight: "297mm",
                    padding: "40px 50px",
                    fontSize: "11pt",
                    lineHeight: "1.4",
                    boxShadow: "0 0 15px rgba(0,0,0,0.1)"
                }}
            >
                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-1">
                        {capitalize(fullName)}
                    </h1>
                </div>

                {/* Contact Info */}
                <div className="text-center text-sm mb-5 space-x-3 text-gray-600">
                    {email && <span>{email}</span>}
                    {phone && <span>• {phone}</span>}
                    {location && <span>• {capitalize(location)}</span>}
                    {linkedin && (
                        <span>
                            •{" "}
                            <a href={linkedin} className="text-blue-600 hover:underline">
                                {linkedin.replace("https://", "")}
                            </a>
                        </span>
                    )}
                </div>

                {/* Summary */}
                {summary && (
                    <div className="mb-5">
                        <p className="text-justify leading-relaxed whitespace-pre-line">
                            {summary}
                        </p>
                    </div>
                )}

                {/* EDUCATION */}
                {education.length > 0 && (
                    <div className="mb-5">
                        <h2 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-4">
                            EDUCATION
                        </h2>

                        {education.map((edu, index) => (
                            <div key={index} className="mb-3">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg">{edu?.institute?capitalize(edu.institute):""}</h3>
                                        <p className="font-medium">{edu?.degree ? capitalize(edu.degree):""}</p>
                                    </div>
                                    <div className="text-gray-600 ">{edu.year}</div>
                                </div>
                                {edu.location && <p className="text-gray-600 ">{edu?.location?capitalize(edu.location):""}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {/* EXPERIENCE */}
                {experience.length > 0 && (
                    <div className="mb-5">
                        <h2 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-4">
                            EXPERIENCE
                        </h2>

                        {experience.map((exp, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg">{exp?.company?capitalize(exp.role):""}</h3>
                                        <p className="font-medium">{exp?.role?capitalize(exp.role):""}</p>
                                    </div>
                                    <div className="text-gray-600">{exp.duration}</div>
                                </div>

                                {exp.description && (
                                    <ul className="mt-1 list-disc pl-5 space-y-1.5">
                                        {exp.description
                                            .split("\n")
                                            .filter(Boolean)
                                            .map((line, i) => (
                                                <li key={i}>{line.replace("-", "").trim()}</li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* SKILLS */}
                {skills && (
                    <div className="mb-5">
                        <h2 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-4">
                            SKILLS
                        </h2>
                        <p>{skills}</p>
                    </div>
                )}

                {/* CERTIFICATIONS */}
                {certifications && (
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-2">
                            CERTIFICATIONS
                        </h2>
                        <p className="whitespace-pre-line">{certifications}</p>
                    </div>
                )}
            </div>
        </div>
    );
}