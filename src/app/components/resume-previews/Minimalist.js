// "use client";

// import { useRef } from "react";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// export default function DevSecOpsClassic({ data }) {
//   const {
//     fullName,
//     email,
//     phone,
//     location,
//     linkedin,
//     summary,
//     education = [],
//     experience = [],
//     skills = "",
//     certifications = "",
//   } = data;
//   const resumeRef = useRef(null);
//    const handleDownloadPDF = async () => {
//         if (!resumeRef.current) return;

//         try {
//             const canvas = await html2canvas(resumeRef.current, {
//                 scale: 2,
//                 useCORS: true,
//                 backgroundColor: "#ffffff"
//             });

//             const imgData = canvas.toDataURL("image/png");
//             const pdf = new jsPDF("p", "mm", "a4");

//             const pageWidth = 210;
//             const pageHeight = 297;

//             const imgWidth = pageWidth;
//             const imgHeight = (canvas.height * imgWidth) / canvas.width;

//             let heightLeft = imgHeight;
//             let position = 0;

//             pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//             heightLeft -= pageHeight;

//             while (heightLeft > 0) {
//                 position = heightLeft - imgHeight;
//                 pdf.addPage();
//                 pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//                 heightLeft -= pageHeight;
//             }

//             pdf.save(`${fullName || "Resume"}.pdf`);
//         } catch (err) {
//             console.error(err);
//             alert("PDF generation failed");
//         }
//     };


//   return (

// <div className="flex flex-col items-center pt-20 pb-10 relative">
    // <div className="w-full max-w-[210mm] flex justify-end px-4 md:px-0"
    //             style={{ position: "absolute" }}>
    //             <button
    //                 onClick={handleDownloadPDF}
    //                 className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center group"
    //                 title="Download as PDF"
    //             >
    //                 <svg
    //                     className="w-6 h-6 group-hover:scale-110 transition-transform"
    //                     fill="none"
    //                     stroke="currentColor"
    //                     viewBox="0 0 24 24"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                     <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    //                     />
    //                 </svg>
    //             </button>
    //         </div>
//     <div ref={resumeRef} className="w-[800px] mx-auto bg-white text-black p-10 font-serif leading-relaxed border border-black">
//       {/* HEADER */}
//       <h1 className="text-3xl font-bold mb-3">{fullName}</h1>

//       <div className="text-sm mb-4 space-y-0.5">
//         <p>{email}</p>
//         <p>{phone}</p>
//         <p>{location}</p>
//         <p>{linkedin}</p>
//       </div>

//       {/* SUMMARY */}
//       {summary && (
//         <p className="text-sm mb-6">
//           {summary}
//         </p>
//       )}

//       {/* EDUCATION */}
//       <Section title="EDUCATION">
//         {education.map((edu, idx) => (
//           <div key={idx} className="mb-4">
//             <div className="flex justify-between">
//               <h3 className="font-bold">{edu.institute}</h3>
//               <span className="text-sm text-gray-700">
//                 {edu.year}
//               </span>
//             </div>
//             <p className="italic">{edu.degree}</p>
//             <p className="text-sm text-gray-700">{edu.location}</p>

//             {edu.points?.length > 0 && (
//               <ul className="list-disc ml-6 mt-1 text-sm">
//                 {edu.points.map((point, i) => (
//                   <li key={i}>{point}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//       </Section>

//       {/* EXPERIENCE */}
//       <Section title="EXPERIENCE">
//         {experience.map((exp, idx) => (
//           <div key={idx} className="mb-4">
//             <div className="flex justify-between">
//               <h3 className="font-bold">{exp.company}</h3>
//               <span className="text-sm text-gray-700">
//                 {exp.duration}
//               </span>
//             </div>
//             <p className="italic">{exp.role}</p>
//             <p className="text-sm text-gray-700">{exp.location}</p>

//               <ul className="list-disc mt-1 text-sm">
//                 {exp.description}
//               </ul>
            
//           </div>
//         ))}
//       </Section>

//       {/* SKILLS */}
//       {skills && (
//         <Section title="SKILLS">
//           <p className="text-sm">{skills}</p>
//         </Section>
//       )}

//       {/* CERTIFICATIONS */}
//       {certifications && (
//         <Section title="CERTIFICATIONS">
//           <p className="text-sm">{certifications}</p>
//         </Section>
//       )}
//     </div>
//     </div>
//   );
// }

// /* Reusable Section Wrapper */
// function Section({ title, children }) {
//   return (
//     <section className="mb-6">
//       <h2 className="text-lg font-bold mb-2 tracking-wide">
//         {title}
//       </h2>
//       {children}
//     </section>
//   );
// }



"use client";

import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function DevSecOpsClassic({ data }) {
  const {
    fullName,
    email,
    phone,
    location,
    linkedin,
    summary,
    education = [],
    experience = [],
    skills = "",
    certifications = "",
  } = data;

  const resumeRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: -window.scrollY,
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
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${fullName || "Resume"}.pdf`);
    } catch (error) {
      console.error(error);
      alert("PDF generation failed");
    }
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
      <div ref={resumeRef} style={styles.page}>
        <h1 style={styles.name}>{fullName}</h1>

        <div>
          <p style={styles.contactText}>{email}</p>
          <p style={styles.contactText}>{phone}</p>
          <p style={styles.contactText}>{location}</p>
          <p style={styles.contactText}>{linkedin}</p>
        </div>

        {summary && <p style={styles.text}>{summary}</p>}

        {/* EDUCATION */}
        <Section title="EDUCATION">
          {education.map((edu, idx) => (
            <div key={idx} style={styles.row}>
              <div style={styles.rowHeader}>
                <span>{edu.institute}</span>
                <span>{edu.year}</span>
              </div>
              <p style={styles.muted}>{edu.degree}</p>
              <p style={styles.muted}>{edu.location}</p>

              {edu.points?.length > 0 && (
                <ul style={styles.list}>
                  {edu.points.map((p, i) => (
                    <li key={i} style={styles.listItem}>
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>

        {/* EXPERIENCE */}
        <Section title="EXPERIENCE">
          {experience.map((exp, idx) => (
            <div key={idx} style={styles.row}>
              <div style={styles.rowHeader}>
                <span>{exp.company}</span>
                <span>{exp.duration}</span>
              </div>
              <p style={styles.muted}>{exp.role}</p>
              <p style={styles.muted}>{exp.location}</p>

              <div style={styles.list}>
                {exp.description
                  .split("\n")
                  .filter(Boolean)
                  .map((line, i) => (
                      <div key={i}>{line.replace("-", "").trim()}</div>
                  ))}
              </div>
            </div>
          ))}
        </Section>

        {skills && (
          <Section title="SKILLS">
            <p style={styles.text}>{skills}</p>
          </Section>
        )}

        {certifications && (
          <Section title="CERTIFICATIONS">
            <p style={styles.text}>{certifications.split("\n")
                  .filter(Boolean)
                  .map((line, i) => (
                      <div key={i}>{line.replace("-", "").trim()}</div>
                  ))}</p>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "80px 0 20px",
    backgroundColor: "#f5f5f5",
  },

  page: {
    width: "800px",
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "40px",
    fontFamily: `"Times New Roman", Georgia, serif`,
    lineHeight: 1.6,
    boxSizing: "border-box",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)"
  },

  name: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "12px",
  },

  contactText: {
    fontSize: "14px",
    margin: "2px 0",
  },

  section: {
    marginTop: "24px",
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
    letterSpacing: "0.5px",
  },

  row: {
    marginBottom: "16px",
  },

  rowHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "15px",
    fontWeight: "bold",
  },

  muted: {
    fontSize: "13px",
    color: "#555555",
    fontStyle: "italic",
  },

  list: {
    marginTop: "6px",
    fontSize: "14px",
  },

  listItem: {
    marginBottom: "4px",
  },

  text: {
    fontSize: "14px",
  },

  downloadBtn: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "12px 16px",
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};
