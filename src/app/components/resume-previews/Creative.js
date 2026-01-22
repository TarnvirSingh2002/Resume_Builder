
// "use client";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import { useRef, useState } from "react";

// export default function ResumeTemplatePDF({ data }) {
//     const resumeRef = useRef(null);
//     const [hideButton, setHideButton] = useState(false);

//     const {
//         fullName = "",
//         email = "",
//         linkedin = "",
//         phone = "",
//         location = "",
//         summary = "",
//         education = [],
//         certifications = "",
//         experience = [],
//         skills = "",
//     } = data;

//     function capitalize(str) {
//         if (!str) return '';
//         return str.charAt(0).toUpperCase() + str.slice(1);
//     }

//     const handleDownloadPDF = () => {
//         // UNCOMMENT THIS CODE WHEN YOU ADD html2canvas AND jsPDF TO YOUR PROJECT:
        
//         if (!resumeRef.current) return;

//         setHideButton(true);

//         setTimeout(async () => {
//             try {
//                 const canvas = await html2canvas(resumeRef.current, {
//                     scale: 2,
//                     useCORS: true,
//                     backgroundColor: "#ffffff",
//                 });

//                 const imgData = canvas.toDataURL("image/png");
//                 const pdf = new jsPDF("p", "mm", "a4");

//                 const pageWidth = 210;
//                 const pageHeight = 297;

//                 const imgWidth = pageWidth;
//                 const imgHeight = (canvas.height * imgWidth) / canvas.width;

//                 let heightLeft = imgHeight;
//                 let position = 0;

//                 pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//                 heightLeft -= pageHeight;

//                 while (heightLeft > 0) {
//                     position = heightLeft - imgHeight;
//                     pdf.addPage();
//                     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//                     heightLeft -= pageHeight;
//                 }

//                 pdf.save(`${fullName || "Resume"}.pdf`);
//             } catch (err) {
//                 console.error(err);
//                 alert("PDF generation failed");
//             } finally {
//                 setHideButton(false);
//             }
//         }, 100);
//     };

//     return (
//         <>
//             <style>{`
//                 .wrapper {
//                     background: #ededed;
//                     padding: 80px 10px 10px;
//                     position: relative;
//                 }

//                 .resume-container {
//                     width: 210mm;
//                     min-height: 297mm;
//                     background: #ffffff;
//                     margin: auto;
//                     padding: 35mm 25mm 45mm;
//                     font-family: Arial, sans-serif;
//                     color: #555;
//                     position: relative;
//                 }

//                 .download-btn {
//                     position: absolute;
//                     top: 0.25rem;
//                     right: 0.25rem;
//                     width: 2.75rem;
//                     height: 2.75rem;
//                     border-radius: 50%;
//                     background-color: #2563eb;
//                     color: white;
//                     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     border: none;
//                     cursor: pointer;
//                     transition: all 0.2s;
//                     z-index: 10;
//                 }

//                 .download-btn:hover {
//                     background-color: #1d4ed8;
//                     transform: scale(1.1);
//                 }

//                 .download-btn.hidden {
//                     display: none !important;
//                 }

//                 .download-icon {
//                     width: 1.25rem;
//                     height: 1.25rem;
//                 }

//                 .header {
//                     text-align: center;
//                     margin-bottom: 20px;
//                 }

//                 .name {
//                     font-size: 32px;
//                     letter-spacing: 4px;
//                     margin: 0;
//                     font-weight: 300;
//                 }

//                 .contact-row {
//                     display: flex;
//                     justify-content: space-between;
//                     font-size: 12px;
//                     margin-top: 10px;
//                 }

//                 .section {
//                     margin-bottom: 20px;
//                 }

//                 .section-title {
//                     text-align: center;
//                     letter-spacing: 3px;
//                     color: #6bbfc2;
//                     border-top: 2px solid #6bbfc2;
//                     border-bottom: 2px solid #6bbfc2;
//                     padding: 6px 0;
//                     margin-bottom: 12px;
//                     font-size: 14px;
//                 }

//                 .row {
//                     display: flex;
//                     justify-content: space-between;
//                     margin-bottom: 14px;
//                     font-size: 13px;
//                 }

//                 .year {
//                     white-space: nowrap;
//                     margin-left: 20px;
//                 }

//                 .cert-row {
//                     display: flex;
//                     justify-content: space-around;
//                     font-size: 13px;
//                 }

//                 .hex-group {
//                     position: absolute;
//                     width: 120px;
//                     height: 120px;
//                     background: repeating-linear-gradient(60deg, #10bfc1 0, #10bfc1 20px, transparent 20px, transparent 40px);
//                     clip-path: polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%);
//                 }

//                 .hex-top-left {
//                     top: 0;
//                     left: 0;
//                 }

//                 .hex-top-right {
//                     top: 0;
//                     right: 0;
//                 }

//                 .hex-bottom-left {
//                     bottom: 0;
//                     left: 0;
//                 }

//                 .hex-bottom-right {
//                     bottom: 0;
//                     right: 0;
//                 }

//                 @media print {
//                     .wrapper {
//                         padding: 0;
//                         background: white;
//                     }

//                     .download-btn {
//                         display: none;
//                     }

//                     .resume-container {
//                         width: 100%;
//                         padding: 1.5rem;
//                     }
//                 }
//             `}</style>

//             <div className="wrapper">
//                 <div ref={resumeRef} className="resume-container">
//                     <button
//                         onClick={handleDownloadPDF}
//                         title="Download PDF"
//                         className={`download-btn ${hideButton ? 'hidden' : ''}`}
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="download-icon"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M12 4v12m0 0l-4-4m4 4l4-4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
//                             />
//                         </svg>
//                     </button>

//                     {/* TOP HEX */}
//                     <div className="hex-group hex-top-left" />
//                     <div className="hex-group hex-top-right" />

//                     {/* HEADER */}
//                     <div className="header">
//                         <h1 className="name">{capitalize(fullName)}</h1>

//                         <div className="contact-row">
//                             {phone && <span>{phone}</span>}
//                             {email && <span>{email}</span>}
//                             {linkedin && <span>{linkedin}</span>}
//                             {location && <span>{capitalize(location)}</span>}
//                         </div>
//                     </div>

//                     {/* SUMMARY */}
//                     <Section title="SUMMARY">
//                         <p>{summary}</p>
//                     </Section>

//                     <Section title="Skills">
//                         {skills}
//                     </Section>

//                     <Section title="WORK EXPERIENCE">
//                         {experience.length > 0 && (
//                             experience.map((exp, i) => (
//                                 <Row
//                                     key={i}
//                                     left={
//                                         <>
//                                             <strong>{exp?.company ? capitalize(exp.company) : ""}</strong>
//                                             <div>{exp?.role ? capitalize(exp.role) : ""}</div>
//                                             {exp.description && (
//                                                 <div>
//                                                     {exp.description}
//                                                 </div>
//                                             )}
//                                         </>
//                                     }
//                                     right={exp.duration}
//                                 />
//                             ))
//                         )}
//                     </Section>

//                     {/* EDUCATION */}
//                     <Section title="EDUCATION">
//                         {education.length > 0 && (
//                             education.map((edu, i) => (
//                                 <Row
//                                     key={i}
//                                     left={
//                                         <>
//                                             <strong>{edu?.institute ? capitalize(edu.institute) : ""}</strong>
//                                             <div>{edu?.degree ? capitalize(edu.degree) : ""}</div>
//                                         </>
//                                     }
//                                     right={
//                                         <>
//                                             <strong>{edu.year}</strong>
//                                             <div>{edu?.location ? capitalize(edu.location) : ""}</div>
//                                         </>
//                                     }
//                                 />
//                             ))
//                         )}
//                     </Section>

//                     {/* CERTIFICATIONS */}
//                     <Section title="CERTIFICATIONS">
//                         <div className="cert-row">
//                             {certifications}
//                         </div>
//                     </Section>

//                     {/* BOTTOM HEX */}
//                     <div className="hex-group hex-bottom-left" />
//                     <div className="hex-group hex-bottom-right" />
//                 </div>
//             </div>
//         </>
//     );
// }

// /* ---------------- SUB COMPONENTS ---------------- */

// function Section({ title, children }) {
//     return (
//         <div className="section">
//             <div className="section-title">{title}</div>
//             <div>{children}</div>
//         </div>
//     );
// }

// function Row({ left, right }) {
//     return (
//         <div className="row">
//             <div>{left}</div>
//             <div className="year">{right}</div>
//         </div>
//     );
// }




"use client";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";

export default function ResumeTemplatePDF({ data }) {
    const resumeRef = useRef(null);
    const [hideButton, setHideButton] = useState(false);

    if (!data) {
        data = {
            fullName: "John Doe",
            email: "john.doe@email.com",
            phone: "+1 (555) 123-4567",
            location: "New York, NY",
            linkedin: "linkedin.com/in/johndoe",
            summary: "Experienced professional with a strong background in delivering high-quality results and driving business success.",
            experience: [
                {
                    company: "Tech Company",
                    location: "New York, NY",
                    role: "Senior Developer",
                    duration: "Jan 2020 - Present",
                    description: "Led development of key features and mentored junior developers."
                }
            ],
            education: [
                {
                    institute: "University Name",
                    degree: "Bachelor of Science in Computer Science",
                    year: "2019",
                    location: "New York, NY"
                }
            ],
            skills: "JavaScript, React, Node.js, Python, SQL, Git",
            certifications: "AWS Certified Developer, Scrum Master Certified"
        };
    }

    const {
        fullName = "",
        email = "",
        linkedin = "",
        phone = "",
        location = "",
        summary = "",
        education = [],
        certifications = "",
        experience = [],
        skills = "",
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
                    backgroundColor: "#ffffff",
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
                .wrapper {
                    background: #ededed;
                    padding: 80px 10px 10px;
                    position: relative;
                }

                .resume-container {
                    width: 210mm;
                    min-height: 297mm;
                    background: #ffffff;
                    margin: auto;
                    padding: 35mm 25mm 45mm;
                    font-family: Arial, sans-serif;
                    color: #555;
                    position: relative;
                    overflow: hidden;
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
                    z-index: 10;
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

                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }

                .name {
                    font-size: 32px;
                    letter-spacing: 4px;
                    margin: 0;
                    font-weight: 300;
                }

                .contact-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    margin-top: 10px;
                }

                .section {
                    margin-bottom: 20px;
                }

                .section-title {
                    text-align: center;
                    letter-spacing: 3px;
                    color: #6bbfc2;
                    border-top: 2px solid #6bbfc2;
                    border-bottom: 2px solid #6bbfc2;
                    padding: 6px 0;
                    margin-bottom: 12px;
                    font-size: 14px;
                }

                .row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 14px;
                    font-size: 13px;
                }

                .year {
                    white-space: nowrap;
                    margin-left: 20px;
                }

                .cert-row {
                    display: flex;
                    justify-content: space-around;
                    font-size: 13px;
                }

                .hex-group {
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    z-index: 1;
                }

                .hex-shape {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .hex-bar {
                    position: absolute;
                    width: 20px;
                    height: 100%;
                    background: #10bfc1;
                }

                .hex-bar:nth-child(1) { left: 0px; }
                .hex-bar:nth-child(2) { left: 20px; background: transparent; }
                .hex-bar:nth-child(3) { left: 40px; }
                .hex-bar:nth-child(4) { left: 60px; background: transparent; }
                .hex-bar:nth-child(5) { left: 80px; }
                .hex-bar:nth-child(6) { left: 100px; background: transparent; }

                .hex-top-left {
                    top: -10px;
                    left: -10px;
                }

                .hex-top-right {
                    top: -10px;
                    right: -10px;
                }

                .hex-bottom-left {
                    bottom: -10px;
                    left: -10px;
                }

                .hex-bottom-right {
                    bottom: -10px;
                    right: -10px;
                }

                @media print {
                    .wrapper {
                        padding: 0;
                        background: white;
                    }

                    .download-btn {
                        display: none !important;
                    }

                    .resume-container {
                        width: 100%;
                        padding: 35mm 25mm 45mm;
                        overflow: visible;
                    }

                    .hex-group {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }

                    .hex-bar {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                }
            `}</style>

            <div className="wrapper">
                <div ref={resumeRef} className="resume-container">
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

                    {/* TOP LEFT HEX */}
                    <div className="hex-group hex-top-left">
                        <div className="hex-shape">
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                        </div>
                    </div>

                    {/* TOP RIGHT HEX */}
                    <div className="hex-group hex-top-right">
                        <div className="hex-shape">
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                        </div>
                    </div>

                    {/* HEADER */}
                    <div className="header">
                        <h1 className="name">{capitalize(fullName)}</h1>

                        <div className="contact-row">
                            {phone && <span>{phone}</span>}
                            {email && <span>{email}</span>}
                            {linkedin && <span>{linkedin}</span>}
                            {location && <span>{capitalize(location)}</span>}
                        </div>
                    </div>

                    {/* SUMMARY */}
                    <Section title="SUMMARY">
                        <p>{summary}</p>
                    </Section>

                    <Section title="Skills">
                        {skills}
                    </Section>

                    <Section title="WORK EXPERIENCE">
                        {experience.length > 0 && (
                            experience.map((exp, i) => (
                                <Row
                                    key={i}
                                    left={
                                        <>
                                            <strong>{exp?.company ? capitalize(exp.company) : ""}</strong>
                                            <div>{exp?.role ? capitalize(exp.role) : ""}</div>
                                            {exp.description && (
                                                <div>
                                                    {exp.description}
                                                </div>
                                            )}
                                        </>
                                    }
                                    right={exp.duration}
                                />
                            ))
                        )}
                    </Section>

                    {/* EDUCATION */}
                    <Section title="EDUCATION">
                        {education.length > 0 && (
                            education.map((edu, i) => (
                                <Row
                                    key={i}
                                    left={
                                        <>
                                            <strong>{edu?.institute ? capitalize(edu.institute) : ""}</strong>
                                            <div>{edu?.degree ? capitalize(edu.degree) : ""}</div>
                                        </>
                                    }
                                    right={
                                        <>
                                            <strong>{edu.year}</strong>
                                            <div>{edu?.location ? capitalize(edu.location) : ""}</div>
                                        </>
                                    }
                                />
                            ))
                        )}
                    </Section>

                    {/* CERTIFICATIONS */}
                    <Section title="CERTIFICATIONS">
                        <div className="cert-row">
                            {certifications}
                        </div>
                    </Section>

                    {/* BOTTOM LEFT HEX */}
                    <div className="hex-group hex-bottom-left">
                        <div className="hex-shape">
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                        </div>
                    </div>

                    {/* BOTTOM RIGHT HEX */}
                    <div className="hex-group hex-bottom-right">
                        <div className="hex-shape">
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                            <div className="hex-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

/* ---------------- SUB COMPONENTS ---------------- */

function Section({ title, children }) {
    return (
        <div className="section">
            <div className="section-title">{title}</div>
            <div>{children}</div>
        </div>
    );
}

function Row({ left, right }) {
    return (
        <div className="row">
            <div>{left}</div>
            <div className="year">{right}</div>
        </div>
    );
}