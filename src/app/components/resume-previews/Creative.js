// "use client";

// import { useRef } from "react";

// export default function ResumeTemplate() {
//   const resumeRef = useRef(null);

//   return (
//     <div style={styles.wrapper}>
//       <div ref={resumeRef} style={styles.resume} id="resume">

//         {/* TOP HEX */}
//         <div style={{ ...styles.hexGroup, top: 0, left: 0 }} />
//         <div style={{ ...styles.hexGroup, top: 0, right: 0 }} />

//         {/* HEADER */}
//         <div style={styles.header}>
//           <h1 style={styles.name}>ALYSSA<br />MONTGOMERY</h1>
//           <p style={styles.title}>MULTIMEDIA DESIGN SPECIALIST</p>

//           <div style={styles.contactRow}>
//             <span>(111) 222 1234</span>
//             <span>appleberry@gmail.com</span>
//             <span>New York, NY</span>
//           </div>
//         </div>

//         {/* SECTION */}
//         <Section title="SUMMARY">
//           <p>
//             This should be a brief description of your professional career and
//             years of experience in your field. You can stand out to hiring
//             managers by detailing the problem statement you would solve for
//             the company and how your skills will advance the success of the
//             business.
//           </p>
//         </Section>

//         <Section title="EDUCATION">
//           <Row
//             left={
//               <>
//                 <strong>Master's Degree</strong>
//                 <div>Master of Business Administration</div>
//                 <div>University of New York, New York</div>
//               </>
//             }
//             right="2014 - 2016"
//           />

//           <Row
//             left={
//               <>
//                 <strong>Bachelor's Degree</strong>
//                 <div>Computer Science</div>
//                 <div>Michigan Institution of Technology</div>
//               </>
//             }
//             right="2005 - 2010"
//           />
//         </Section>

//         <Section title="CERTIFICATIONS">
//           <div style={styles.certRow}>
//             <span>• PMP</span>
//             <span>• CISCO</span>
//             <span>• ITIL</span>
//           </div>
//         </Section>

//         <Section title="WORK EXPERIENCE">
//           <Row
//             left={
//               <>
//                 <strong>Position Title</strong>
//                 <div>Company name | Location</div>
//                 <ul>
//                   <li>Brief description of role and achievements.</li>
//                   <li>Quantifiable success and impact.</li>
//                   <li>Relevant skills matching the job.</li>
//                 </ul>
//               </>
//             }
//             right="2005 - 2010"
//           />

//           <Row
//             left={
//               <>
//                 <strong>Position Title</strong>
//                 <div>Company name | Location</div>
//                 <ul>
//                   <li>Brief description of role and achievements.</li>
//                 </ul>
//               </>
//             }
//             right="2005 - 2010"
//           />
//         </Section>

//         {/* BOTTOM HEX */}
//         <div style={{ ...styles.hexGroup, bottom: 0, left: 0 }} />
//         <div style={{ ...styles.hexGroup, bottom: 0, right: 0 }} />

//       </div>
//     </div>
//   );
// }

// /* ---------------- SUB COMPONENTS ---------------- */

// function Section({ title, children }) {
//   return (
//     <div style={{ marginBottom: "20px" }}>
//       <div style={styles.sectionTitle}>{title}</div>
//       <div>{children}</div>
//     </div>
//   );
// }

// function Row({ left, right }) {
//   return (
//     <div style={styles.row}>
//       <div>{left}</div>
//       <div style={styles.year}>{right}</div>
//     </div>
//   );
// }

// /* ---------------- STYLES ---------------- */

// const styles = {
//   wrapper: {
//     background: "#ededed",
//     padding: "80px 10px 10px",
//   },

//   resume: {
//     width: "210mm",
//     minHeight: "297mm",
//     background: "#ffffff",
//     margin: "auto",
//     padding: "35mm 25mm 45mm",
//     fontFamily: "Arial, sans-serif",
//     color: "#555",
//     position: "relative",
//   },

//   header: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },

//   name: {
//     fontSize: "32px",
//     letterSpacing: "4px",
//     margin: "0",
//     fontWeight: "300",
//   },

//   title: {
//     color: "#6bbfc2",
//     letterSpacing: "2px",
//     marginTop: "5px",
//   },

//   contactRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     fontSize: "12px",
//     marginTop: "10px",
//   },

//   sectionTitle: {
//     textAlign: "center",
//     letterSpacing: "3px",
//     color: "#6bbfc2",
//     borderTop: "2px solid #6bbfc2",
//     borderBottom: "2px solid #6bbfc2",
//     padding: "6px 0",
//     marginBottom: "12px",
//     fontSize: "14px",
//   },

//   row: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "14px",
//     fontSize: "13px",
//   },

//   year: {
//     whiteSpace: "nowrap",
//     marginLeft: "20px",
//   },

//   certRow: {
//     display: "flex",
//     justifyContent: "space-around",
//     fontSize: "13px",
//   },

//   hexGroup: {
//     position: "absolute",
//     width: "120px",
//     height: "120px",
//     background:
//       "repeating-linear-gradient(60deg, #10bfc1 0, #10bfc1 20px, transparent 20px, transparent 40px)",
//     clipPath:
//       "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)",
//   },
// };







"use client";

import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeTemplatePDF({ data }) {
    const resumeRef = useRef(null);

    const {
        fullName = "ALYSSA MONTGOMERY",
        title = "MULTIMEDIA DESIGN SPECIALIST",
        email = "appleberry@gmail.com",
        phone = "(111) 222 1234",
        location = "New York, NY",
        summary = "This should be a brief description of your professional career and years of experience in your field. You can stand out to hiring managers by detailing the problem statement you would solve for the company and how your skills will advance the success of the business.",
        education = [],
        certifications = [],
        experience = [],
    } = data;

    const handleDownloadPDF = async () => {
        if (!resumeRef.current) return;

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
        }
    };

    return (
        <div style={styles.wrapper}>
             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
    <button
      onClick={handleDownloadPDF}
      style={{
        padding: "10px 15px",
        background: "#6bbfc2",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Download PDF
    </button>
  </div>
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

            <div ref={resumeRef} style={styles.resume} id="resume">
                {/* TOP HEX */}
                <div style={{ ...styles.hexGroup, top: 0, left: 0 }} />
                <div style={{ ...styles.hexGroup, top: 0, right: 0 }} />

                {/* HEADER */}
                <div style={styles.header}>
                    <h1 style={styles.name}>{fullName.split(" ")[0]}<br />{fullName.split(" ")[1]}</h1>
                    <p style={styles.title}>{title}</p>

                    <div style={styles.contactRow}>
                        {phone && <span>{phone}</span>}
                        {email && <span>{email}</span>}
                        {location && <span>{location}</span>}
                    </div>
                </div>

                {/* SUMMARY */}
                <Section title="SUMMARY">
                    <p>{summary}</p>
                </Section>

                {/* EDUCATION */}
                <Section title="EDUCATION">
                    {education.length > 0 ? (
                        education.map((edu, i) => (
                            <Row
                                key={i}
                                left={
                                    <>
                                        <strong>{edu.degree}</strong>
                                        <div>{edu.field}</div>
                                        <div>{edu.institution}</div>
                                    </>
                                }
                                right={edu.duration}
                            />
                        ))
                    ) : (
                        <>
                            <Row
                                left={
                                    <>
                                        <strong>Master's Degree</strong>
                                        <div>Master of Business Administration</div>
                                        <div>University of New York, New York</div>
                                    </>
                                }
                                right="2014 - 2016"
                            />
                            <Row
                                left={
                                    <>
                                        <strong>Bachelor's Degree</strong>
                                        <div>Computer Science</div>
                                        <div>Michigan Institution of Technology</div>
                                    </>
                                }
                                right="2005 - 2010"
                            />
                        </>
                    )}
                </Section>

                {/* CERTIFICATIONS */}
                <Section title="CERTIFICATIONS">
                    <div style={styles.certRow}>
                        {certifications}
                    </div>
                </Section>

                {/* WORK EXPERIENCE */}
                <Section title="WORK EXPERIENCE">
                    {experience.length > 0 ? (
                        experience.map((exp, i) => (
                            <Row
                                key={i}
                                left={
                                    <>
                                        <strong>{exp.role}</strong>
                                        <div>{exp.company} {exp.location && `| ${exp.location}`}</div>
                                        {exp.description && (
                                            <ul>
                                                {exp.description}
                                            </ul>
                                        )}
                                    </>
                                }
                                right={exp.duration}
                            />
                        ))
                    ) : (
                        <>
                            <Row
                                left={
                                    <>
                                        <strong>Position Title</strong>
                                        <div>Company name | Location</div>
                                        <ul>
                                            <li>Brief description of role and achievements.</li>
                                            <li>Quantifiable success and impact.</li>
                                            <li>Relevant skills matching the job.</li>
                                        </ul>
                                    </>
                                }
                                right="2005 - 2010"
                            />
                            <Row
                                left={
                                    <>
                                        <strong>Position Title</strong>
                                        <div>Company name | Location</div>
                                        <ul>
                                            <li>Brief description of role and achievements.</li>
                                        </ul>
                                    </>
                                }
                                right="2005 - 2010"
                            />
                        </>
                    )}
                </Section>

                {/* BOTTOM HEX */}
                <div style={{ ...styles.hexGroup, bottom: 0, left: 0 }} />
                <div style={{ ...styles.hexGroup, bottom: 0, right: 0 }} />
            </div>
        </div>
    );
}

/* ---------------- SUB COMPONENTS ---------------- */

function Section({ title, children }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <div style={styles.sectionTitle}>{title}</div>
            <div>{children}</div>
        </div>
    );
}

function Row({ left, right }) {
    return (
        <div style={styles.row}>
            <div>{left}</div>
            <div style={styles.year}>{right}</div>
        </div>
    );
}

/* ---------------- STYLES ---------------- */

const styles = {
    wrapper: {
        background: "#ededed",
        padding: "80px 10px 10px",
    },

    resume: {
        width: "210mm",
        minHeight: "297mm",
        background: "#ffffff",
        margin: "auto",
        padding: "35mm 25mm 45mm",
        fontFamily: "Arial, sans-serif",
        color: "#555",
        position: "relative",
    },

    header: {
        textAlign: "center",
        marginBottom: "20px",
    },

    name: {
        fontSize: "32px",
        letterSpacing: "4px",
        margin: "0",
        fontWeight: "300",
    },

    title: {
        color: "#6bbfc2",
        letterSpacing: "2px",
        marginTop: "5px",
    },

    contactRow: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "12px",
        marginTop: "10px",
    },

    sectionTitle: {
        textAlign: "center",
        letterSpacing: "3px",
        color: "#6bbfc2",
        borderTop: "2px solid #6bbfc2",
        borderBottom: "2px solid #6bbfc2",
        padding: "6px 0",
        marginBottom: "12px",
        fontSize: "14px",
    },

    row: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "14px",
        fontSize: "13px",
    },

    year: {
        whiteSpace: "nowrap",
        marginLeft: "20px",
    },

    certRow: {
        display: "flex",
        justifyContent: "space-around",
        fontSize: "13px",
    },

    hexGroup: {
        position: "absolute",
        width: "120px",
        height: "120px",
        background:
            "repeating-linear-gradient(60deg, #10bfc1 0, #10bfc1 20px, transparent 20px, transparent 40px)",
        clipPath:
            "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)",
    },
};
