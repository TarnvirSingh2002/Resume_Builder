"use client";

import { useState, useMemo } from "react";
import { User, Mail, Phone, MapPin, FileText, Briefcase, Sparkles, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import CoverLetterTemplate from '../../components/cover-letter/first.js'
import CoverLetter from '../../components/cover-letter/Modernletter.js'
import CoverLetterTemplateA from "../../components/cover-letter/creative.js";

// const OPENAI_API_KEY = process.env.OPEN_API

async function generateCoverLetterContent(data) {
  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    throw new Error("OpenAI API key is missing");
  }

  const prompt = `
You are an expert cover letter writer.

Write a professional, concise, and persuasive cover letter using ONLY the information provided below.
Do NOT invent facts, skills, experience, or company details.
If any field is missing or irrelevant, naturally omit it.

Provided Information:
- Position: ${data.position || ""}
- Company: ${data.companyName || ""}
- Recipient: ${data.recipientName || ""}
- Subject: ${data.subject || ""}

Writing Instructions:
- Write exactly THREE paragraphs
- Separate paragraphs with a single blank line
- Use first-person ("I")
- Maintain a modern, confident, ATS-friendly tone
- Do NOT include greetings, salutations, headers, or sign-offs
- Do NOT repeat field labels in the output

Paragraph Structure:
1. Opening paragraph  
   - Mention the position (only if provided)
   - Clearly state intent and motivation for applying
   - Use subject context only if relevant

2. Main paragraph  
   - Highlight key strengths, skills, or experience relevant to the role
   - Align your value with the company or position (only if company name is provided)
   - Keep content factual and general if details are limited

3. Closing paragraph  
   - Express enthusiasm for the opportunity
   - Thank the reader for their time
   - Invite further discussion or next steps

Length: 200-300 words total.

Return ONLY the three paragraphs. No extra text.
`.trim();


  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // or "gpt-4o", "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are a professional career advisor." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI error: ${err}`);
  }

  const json = await response.json();
  const text = json.choices?.[0]?.message?.content?.trim() || "";

  // Split by double newlines (assuming model follows instruction)
  const parts = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

  return {
    openingParagraph: parts[0] || "",
    bodyParagraph1: parts[1] || "",
    bodyParagraph2: parts[2] || "",
    closingParagraph: parts[3] || "",
  };
}


export default function CoverLetterForm() {
  const { cvId } = useParams();

  const [coverLetterData, setCoverLetterData] = useState(null);

  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    recipientName: "",
    companyName: "",
    companyAddress: "",
    position: "",
    subject: "",
    openingParagraph: "",
    bodyParagraph1: "",
    bodyParagraph2: "",
    closingParagraph: "",
  });


  const letterTemplates = [
    {
      id: 2,
      name: 'Modern Resume',
      component: CoverLetter
    },
    {
      id: 3,
      name: 'Executive Resume',
      component: CoverLetterTemplateA
    },
    {
      id: 1,
      name: 'Professional',
      component: CoverLetterTemplate
    }
  ];


  const selectedTemplate = useMemo(() => {
    return letterTemplates.find(
      (t) => t.id === Number(cvId)
    );
  }, [cvId, letterTemplates]);
  const SelectedTemplateComponent = selectedTemplate?.component;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  //new-added
  const generateWithAI = async () => {
    if (!formData.position || !formData.companyName) {
      alert("Please fill at least Position and Company Name before generating.");
      return;
    }

    setLoadingAI(true);
    setAiError("");

    try {
      const generated = await generateCoverLetterContent(formData);

      setFormData(prev => ({
        ...prev,
        openingParagraph: generated.openingParagraph,
        bodyParagraph1: generated.bodyParagraph1,
        bodyParagraph2: generated.bodyParagraph2,
        closingParagraph: generated.closingParagraph,
      }));
    } catch (err) {
      console.error(err);
      setAiError(err.message || "Failed to generate content. Check console.");
    } finally {
      setLoadingAI(false);
    }
  };



  const handleSubmit = () => {
    if (!formData.fullName.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (!formData.recipientName.trim()) {
      alert("Please enter the recipient's name");
      return;
    }
    setCoverLetterData(formData);
  };

  if (coverLetterData && SelectedTemplateComponent) {
    return <SelectedTemplateComponent data={coverLetterData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-6 pt-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Your Cover Letter</h1>
          <p className="text-gray-600">Fill in your details to generate a professional cover letter</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">

          {/* Personal Information */}
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
              <User className="w-6 h-6 text-blue-600" />
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  name="location"
                  placeholder="Your Address"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Recipient & Job Info */}
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              Recipient & Job Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Recipient Name */}
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  name="recipientName"
                  placeholder="Recipient Name"
                  value={formData.recipientName}
                  onChange={handleChange}
                />
              </div>

              {/* Company Name */}
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              {/* Company Address */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  name="companyAddress"
                  placeholder="Company Address"
                  value={formData.companyAddress}
                  onChange={handleChange}
                />
              </div>

              {/* Position Applying For */}
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  name="position"
                  placeholder="Position Applying For"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Subject — Full Width */}
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
          </div>


          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-600" />
                Cover Letter Content
              </h2>

              <button
                type="button"
                onClick={generateWithAI}
                disabled={loadingAI || !process.env.NEXT_PUBLIC_OPENAI_API_KEY}
                className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold
                    text-white transition-all duration-300
                    shadow-md
                    ${loadingAI
                                    ? "bg-blue-300 cursor-not-allowed"
                                    : process.env.NEXT_PUBLIC_OPENAI_API_KEY
                                      ? "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                                      : "bg-blue-200 cursor-not-allowed"
                                  }
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                  `}
              >
                {loadingAI ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate with AI
                  </>
                )}
              </button>
            </div>

            {aiError && (
              <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{aiError}</p>
            )}

            {!process.env.NEXT_PUBLIC_OPENAI_API_KEY && (
              <p className="text-amber-700 text-sm bg-amber-50 p-3 rounded-lg">
                OpenAI API key not found. Add <code>NEXT_PUBLIC_OPENAI_API_KEY</code> to .env.local to enable AI generation.
              </p>
            )}

            <textarea
              rows={4}
              name="openingParagraph"
              value={formData.openingParagraph}
              onChange={handleChange}
              placeholder="Opening Paragraph (or let AI generate it)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            />

            <textarea
              rows={4}
              name="bodyParagraph1"
              value={formData.bodyParagraph1}
              onChange={handleChange}
              placeholder="Main Content"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            />

            <textarea
              rows={4}
              name="bodyParagraph2"
              value={formData.bodyParagraph2}
              onChange={handleChange}
              placeholder="Closing Paragraph"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Generate Cover Letter
          </button>
        </div>
      </div>
    </div>
  );
}