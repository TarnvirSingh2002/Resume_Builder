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
        summary,
        experience = [],
        education = [],
        skills,
        certifications,
    } = data;

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
        <div className="relative w-[800px] m-3 mt-25 mx-auto bg-white text-black p-10 font-serif leading-relaxed border border-black">

            {/* Download PDF Button — top-right of resume page */}
            <div className="absolute top-1 right-1">
                <button
                    onClick={handleDownloadPDF}
                    title="Download PDF"
                    className="w-11 h-11 rounded-full bg-blue-600 text-white shadow-lg 
               flex items-center justify-center
               hover:bg-blue-700 hover:scale-110 
               transition-all duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
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


            {/* HEADER */}
            <header className="text-right mb-8">
                <h1 className="text-3xl font-bold uppercase tracking-wide">
                    {fullName || "Your Name"}
                </h1>
                <p className="text-sm mt-1">
                    {location && <span>{location}</span>}
                    {phone && <> • {phone}</>}
                </p>
                <p className="text-sm">{email}</p>
            </header>

            <section className="mb-4">
                <p className="italic text-sm mb-2">{summary}</p>
            </section>

            {/* WORK EXPERIENCE */}
            <section className="mb-8">
                <h2 className="text-sm font-bold border-b-2 border-black pb-1 mb-4 uppercase">
                    Work Experience
                </h2>

                {experience.map((exp, index) => (
                    <div key={index} className="mb-6">
                        <div className="flex justify-between font-semibold">
                            <p>{exp.role}</p>
                            <p className="text-sm">{exp.duration}</p>
                        </div>

                        <p className="italic text-sm mb-2">{exp.company}</p>

                        {exp.description && (
                            <ul className="list-disc list-inside text-sm space-y-1">
                                {exp.description.split("\n").map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </section>

            {/* QUALIFICATIONS / EDUCATION */}
            <section className="mb-8">
                <h2 className="text-sm font-bold border-b-2 border-black pb-1 mb-4 uppercase">
                    Qualifications
                </h2>

                {education.map((edu, index) => (
                    <div key={index} className="mb-3">
                        <div className="flex justify-between font-semibold">
                            <p>{edu.degree}</p>
                            <p className="text-sm">{edu.year}</p>
                        </div>
                        <p className="italic text-sm">{edu.institute}</p>
                    </div>
                ))}
            </section>

            {/* SKILLS & OTHER */}
            <section>
                <h2 className="text-sm font-bold border-b-2 border-black pb-1 mb-4 uppercase">
                    Skills & Other
                </h2>

                {skills && (
                    <p className="text-sm mb-2">
                        <strong>Skills:</strong> {skills}
                    </p>
                )}

                {certifications && (
                    <p className="text-sm">
                        <strong>Certifications:</strong> {certifications}
                    </p>
                )}
            </section>
        </div>
    );
}
