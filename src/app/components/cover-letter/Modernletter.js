'use client'
import { useRef, useState } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

    const handleDownloadPDF = () => {
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
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'white',
            marginTop: '40px',
            padding: '40px 24px',
        }}>
            <div
                ref={letterRef}
                style={{
                    position: 'relative',
                    maxWidth: '210mm',
                    minHeight: '297mm',
                    margin: '0 auto',
                    backgroundColor: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',                     // ← ADD THIS LINE
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{
                    position: 'relative',
                    background: 'linear-gradient(to right, #334155, #0f172a)',
                    color: 'white',
                    padding: '12px 24px',
                }}>
                    <h1 style={{
                        fontSize: '1.875rem',      // ~text-3xl
                        letterSpacing: '0.1em',     // tracking-widest
                        fontWeight: 300,
                        textAlign: 'center',
                        margin: 0,
                    }}>
                        COVER LETTER
                    </h1>

                    {/* Floating Download Button */}
                    {!hideButton && (
                        <button
                            onClick={handleDownloadPDF}
                            title="Download PDF"
                            data-html2canvas-ignore="true"
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                zIndex: 30,
                                width: '40px',
                                height: '40px',
                                borderRadius: '9999px',
                                backgroundColor: '#2563eb',     // bg-blue-600
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3), 0 4px 6px -2px rgba(0,0,0,0.1)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'transform 0.15s ease',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: '20px', height: '20px' }}
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
                </div>

                {/* Content */}
                <div style={{
                    padding: '40px',
                    fontSize: '0.875rem',          // text-sm
                    color: '#1f2937',              // text-gray-800
                    lineHeight: '1.625',           // leading-relaxed
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    gap: '24px',                   // space-y-6
                }}>
                    {/* Sender Info */}
                    <div>
                        <p style={{ fontWeight: 600, margin: '0 0 4px 0' }}>{capitalize(fullName)}</p>
                        <p style={{ margin: '0 0 4px 0' }}>{capitalize(location)}</p>
                        <p style={{ margin: 0 }}>{phone} | {email}</p>
                    </div>

                    {/* Recipient */}
                    <div style={{ paddingTop: '8px' }}>
                        <p style={{ fontWeight: 600, margin: '0 0 4px 0' }}>{capitalize(recipientName)}</p>
                        <p style={{ margin: '0 0 4px 0' }}>{capitalize(companyName)}</p>
                        <p style={{ margin: 0 }}>{capitalize(companyAddress)}</p>
                    </div>

                    <p style={{ paddingTop: '4px', margin: 0 }}>
                        Subject: {capitalize(subject) || `Applying for ${capitalize(position)} position`},
                    </p>

                    {/* Greeting */}
                    <p style={{ paddingTop: '8px', margin: 0 }}>
                        Dear {capitalize(recipientName)},
                    </p>

                    {/* Paragraphs */}
                    <p style={{ margin: '0 0 16px 0' }}>{openingParagraph}</p>
                    <p style={{ margin: '0 0 16px 0' }}>{bodyParagraph1}</p>
                    <p style={{ margin: '0 0 16px 0' }}>{bodyParagraph2}</p>

                    {/* Closing */}
                    <div style={{ paddingTop: '8px' }}>
                        <p style={{ margin: '0 0 8px 0' }}>Thank you for your time and consideration.</p>
                        <p style={{ margin: '24px 0 8px 0' }}>Sincerely,</p>
                        <p style={{ fontWeight: 600, margin: 0 }}>{capitalize(fullName)}</p>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    height: '64px',
                    background: 'linear-gradient(to right, #334155, #0f172a)',
                    width: '100%',
                    marginTop: 'auto',
                }}></div>
            </div>
        </div>
    );
}