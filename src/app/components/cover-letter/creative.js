"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

export default function CoverLetterTemplateA({ data }) {
  const letterRef = useRef(null);
  const [hideButton, setHideButton] = useState(false);

  const {
    fullName = "",
    position = "",
    email = "",
    phone = "",
    location = "",
    recipientName = "",
    companyName = "",
    companyAddress = "",
    subject = "",
    openingParagraph = "",
    bodyParagraph1 = "",
    bodyParagraph2 = "",
  } = data || {};

  function capitalize(str) {
        if (!str) return '';                    // handle empty / null / undefined
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownloadPDF = async () => {
    if (!letterRef.current) return;

    setHideButton(true);

    try {
      const canvas = await html2canvas(letterRef.current, {
        scale: 2,
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

      pdf.save(`${fullName || "CoverLetter"}_CoverLetter.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF generation failed");
    } finally {
      setHideButton(false);
    }
  };

  return (
    <>
      <style>{`
        .container {
          min-height: 100vh;
          background-color: #f9fafb;
          display: flex;
          justify-content: center;
          padding-top: 6.25rem;
          padding-bottom: 2.5rem;
          padding-left: 20rem;
          padding-right: 1rem;
        }

        .letter-wrapper {
          position: relative;
          width: 100%;
          max-width: 48rem;
          background-color: white;
          padding: 2.5rem;
          color: #111827;
          line-height: 1.625;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .download-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 9999px;
          background-color: #2563eb;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: none;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .download-btn:hover {
          transform: scale(1.1);
        }

        .download-icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .header-left h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .header-left p {
          font-size: 0.875rem;
          color: #374151;
          margin: 0.25rem 0 0 0;
        }

        .header-right {
          font-size: 0.875rem;
          text-align: right;
          color: #374151;
        }

        .header-right p {
          margin: 0.25rem 0;
        }

        .header-right .email {
          color: #1d4ed8;
        }

        .date {
          margin-bottom: 1.5rem;
        }

        .recipient {
          margin-bottom: 1.5rem;
        }

        .recipient p {
          margin: 0.25rem 0;
        }

        .recipient .recipient-name {
          font-weight: 600;
        }

        .subject {
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .body-paragraph {
          margin-bottom: 1rem;
        }

        .closing {
          margin-bottom: 2rem;
        }

        .signature p {
          margin: 0;
        }

        .signature .name {
          font-weight: 600;
          margin-top: 1rem;
        }
      `}</style>

      <section className="container">
        <div ref={letterRef} className="letter-wrapper">
          {/* Download Button */}
          {!hideButton && (
            <button
              onClick={handleDownloadPDF}
              className="download-btn"
              title="Download PDF"
              data-html2canvas-ignore="true"
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
          )}

          {/* Header */}
          <div className="header">
            <div className="header-left">
              <h1>{capitalize(fullName)}</h1>
              {position && <p>{capitalize(position)}</p>}
            </div>

            <div className="header-right">
              {location && <p>{capitalize(location)}</p>}
              {phone && <p>{phone}</p>}
              {email && <p className="email">{email}</p>}
            </div>
          </div>

          {/* Date */}
          <p className="date">{date}</p>

          {/* Recipient */}
          <div className="recipient">
            {recipientName && <p className="recipient-name">{capitalize(recipientName)}</p>}
            {companyName && <p>{capitalize(companyName)}</p>}
            {companyAddress && <p>{capitalize(companyAddress)}</p>}
          </div>

          {/* Subject */}
          <p className="subject">
            {subject ? `RE: ${subject}` : `RE: Application for ${position} Position`}
          </p>

          {/* Body */}
          <p className="body-paragraph">{openingParagraph}</p>
          <p className="body-paragraph">{bodyParagraph1}</p>
          <p className="body-paragraph">{bodyParagraph2}</p>

          {/* Closing */}
          <p className="closing">
            Thank you for considering my application. I look forward to the
            opportunity to discuss how my skills and experience can contribute
            to your organization.
          </p>

          <div className="signature">
            <p>Sincerely,</p>
            <p className="name">{capitalize(fullName)}</p>
          </div>
        </div>
      </section>
    </>
  );
}