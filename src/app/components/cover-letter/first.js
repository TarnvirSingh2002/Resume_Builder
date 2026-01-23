"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

export default function CoverLetterTemplate({ data }) {
    const letterRef = useRef(null);
    const [hideButton, setHideButton] = useState(false);

    const {
        fullName = "",
        email = "",
        phone = "",
        location = "",
        recipientName = "",
        companyName = "",
        companyAddress = "",
        position = "",
        subject = "",
        openingParagraph = "",
        bodyParagraph1 = "",
        bodyParagraph2 = "",
    } = data;

    function capitalize(str) {
        if (!str) return '';                    // handle empty / null / undefined
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

    const date = new Date();
    const fullDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const handleDownloadPDF = () => {
        // UNCOMMENT THIS CODE WHEN YOU ADD html2canvas AND jsPDF TO YOUR PROJECT:

        if (!letterRef.current) return;

        setHideButton(true);

        setTimeout(async () => {
            try {
                const canvas = await html2canvas(letterRef.current, {
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

                pdf.save(`${fullName || "CoverLetter"}_CoverLetter.pdf`);
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
                .letter-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 5rem;
                    padding-bottom: 2.5rem;
                    background: #f5f5f5;
                }

                .letter-container {
                    position: relative;
                    width: 210mm;
                    min-height: 297mm;
                    background: #ffffff;
                    margin: auto;
                    padding: 25mm;
                    font-family: Georgia, serif;
                    color: #333;
                    line-height: 1.6;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                }

                .download-btn {
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
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

                .sender-info {
                    margin-bottom: 1rem;
                }

                .sender-name {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: #1a1a1a;
                }

                .sender-contact {
                    font-size: 0.9rem;
                    color: #555;
                    line-height: 1.4;
                }

                .date-section {
                    margin-bottom: 1rem;
                    font-size: 0.95rem;
                }

                .recipient-info {
                    margin-bottom: 1rem;
                }

                .recipient-name {
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }

                .recipient-details {
                    font-size: 0.95rem;
                    line-height: 1.5;
                }

                .salutation {
                    margin-bottom: 1rem;
                    font-size: 1rem;
                }

                .letter-body {
                    margin-bottom: 1.5rem;
                }

                .paragraph {
                    margin-bottom: 1.25rem;
                    font-size: 0.95rem;
                    text-align: justify;
                }

                .closing {
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }

                .signature-section {
                    margin-top: 1rem;
                }

                .signature-line {
                    font-family: 'Brush Script MT', cursive, Georgia, serif;
                    font-size: 1.5rem;
                    margin-bottom: 0.25rem;
                    color: #1a1a1a;
                }

                .typed-name {
                    font-weight: 600;
                    font-size: 1rem;
                }

                @media print {
                    .letter-wrapper {
                        padding: 0;
                        background: white;
                    }

                    .download-btn {
                        display: none !important;
                    }

                    .letter-container {
                        width: 100%;
                        box-shadow: none;
                        padding: 25mm;
                    }
                }
            `}</style>

            <div className="letter-wrapper">
                <div ref={letterRef} className="letter-container">
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

                    {/* Sender Information */}
                    <div className="sender-info">
                        <div className="sender-name">{capitalize(fullName)}</div>
                        <div className="sender-contact">
                            {location && <div>{capitalize(location)}</div>}
                            {phone && <div>{phone}</div>}
                            {email && <div>{email}</div>}
                        </div>
                    </div>

                    {/* Date */}
                    <div className="date-section">
                        {fullDate ? fullDate : ""}
                    </div>

                    {/* Recipient Information */}
                    <div className="recipient-info">
                        <div className="recipient-name">{capitalize(recipientName)}</div>
                        <div className="recipient-details">
                            {companyName && <div>{capitalize(companyName)}</div>}
                            {companyAddress && <div>{capitalize(companyAddress)}</div>}
                        </div>
                    </div>

                    {/* Subject */}
                    <div style={{
                        marginBottom: "1rem",
                        fontWeight: "600",
                        fontSize: "0.95rem"
                    }}>
                        Subject: {capitalize(subject) || `Application for ${position}`}
                    </div>

                    {/* Salutation */}
                    <div className="salutation">
                        Dear {capitalize(recipientName) || "Hiring Manager"},
                    </div>

                    {/* Letter Body */}
                    <div className="letter-body">
                        {openingParagraph && (
                            <div className="paragraph">
                                {openingParagraph}
                            </div>
                        )}

                        {bodyParagraph1 && (
                            <div className="paragraph">
                                {bodyParagraph1}
                            </div>
                        )}

                        {bodyParagraph2 && (
                            <div className="paragraph">
                                {bodyParagraph2}
                            </div>
                        )}
                    </div>

                    {/* Closing */}
                    <div className="closing">
                        <div style={{ marginBottom: "0.5rem" }}>Sincerely,</div>

                        <div className="signature-section">
                            <div className="typed-name">{capitalize(fullName)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}