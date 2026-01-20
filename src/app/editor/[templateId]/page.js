"use client";

import { useState, useMemo } from "react";
import { User, Mail, Phone, MapPin, FileText, Award, Briefcase, GraduationCap } from "lucide-react";
import { useParams } from "next/navigation";

import ClassicDevOpsResume from '../../components/resume-previews/Designer';
import SarahATSResume from '../../components/resume-previews/Exclusive';
import ResumeTemplate from '../../components/resume-previews/Creative';
import Resume from '../../components/resume-previews/Classic';
import SecurityDevSecOpsPreview from '../../components/resume-previews/Minimalist'
import ProfessionalATS from "../../components/resume-previews/Tech";
import SecurityDevSecOps from "../../components/resume-previews/First";
const resumeTemplates = [
  {
    id: 8,//working
    name: 'Classic Resume',
    component: Resume
  },
  {
    id: 2, 
    name: 'Modern Resume',
    component: ResumeTemplate
  },
  {
    id: 3,//working
    name: 'Creative Resume',
    component: ResumeTemplate
  },
  {
    id: 4, //working on it not completed
    name: 'Minimalist Resume',
    component: SecurityDevSecOpsPreview
  },
  {
    id: 6, //working
    name: 'Tech Resume',
    component: ProfessionalATS
  },
  {
    id: 7, //working
    name: 'Designer Resume',
    component: ClassicDevOpsResume
  },
  {
    id: 5, //working
    name: 'Exclusive Resume',
    component: SarahATSResume
  },
  {
    id: 1, //working
    name: 'Professional',
    component: SecurityDevSecOps
  }
];

export default function ResumeForm() {
  const { templateId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    education: [{ degree: "", institute: "", year: "" }],
    experience: [{ role: "", company: "", duration: "" }],
    skills: "",
    certifications: ""
  });

const selectedTemplate = useMemo(() => {
  return resumeTemplates.find(
    (t) => t.id === Number(templateId)
  );
}, [templateId, resumeTemplates]);

const SelectedTemplateComponent = selectedTemplate?.component;

  const handleSubmit = () => {

    console.log(templateId);

    if (!selectedTemplate) {
      alert("Invalid resume template");
      return;
    }

    if (!formData.fullName.trim()) {
      alert("Please enter your full name");
      return;
    }

    // ✅ THIS IS THE KEY LINE
    setResumeData(formData);
  };


  if (resumeData && SelectedTemplateComponent) {
    return <SelectedTemplateComponent data={resumeData} />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, value, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = value;
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const addArrayItem = (arrayName, template) => {
    setFormData({ ...formData, [arrayName]: [...formData[arrayName], template] });
  };

  const removeArrayItem = (arrayName, index) => {
    const newArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({ ...formData, [arrayName]: newArray });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Your Resume</h1>
          <p className="text-gray-600">Fill in your details to generate a professional resume</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
              <User className="w-6 h-6 text-blue-600" />
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                name="summary"
                placeholder="Professional Summary"
                rows="4"
                value={formData.summary}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                Education
              </h2>
              <button
                onClick={() => addArrayItem("education", { degree: "", institute: "", year: "" })}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Education
              </button>
            </div>

            {formData.education.map((edu, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleArrayChange(index, "degree", e.target.value, "education")}
                  />
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                    placeholder="Institute"
                    value={edu.institute}
                    onChange={(e) => handleArrayChange(index, "institute", e.target.value, "education")}
                  />
                </div>
                <div className="flex gap-3">
                  <input
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => handleArrayChange(index, "year", e.target.value, "education")}
                  />
                  {formData.education.length > 1 && (
                    <button
                      onClick={() => removeArrayItem("education", index)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-600" />
                Experience
              </h2>
              <button
                onClick={() => addArrayItem("experience", { role: "", company: "", duration: "" })}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Experience
              </button>
            </div>

            {formData.experience.map((exp, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => handleArrayChange(index, "role", e.target.value, "experience")}
                  />
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleArrayChange(index, "company", e.target.value, "experience")}
                  />
                </div>
                <div className="flex gap-3">
                  <input
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => handleArrayChange(index, "duration", e.target.value, "experience")}
                  />
                  {formData.experience.length > 1 && (
                    <button
                      onClick={() => removeArrayItem("experience", index)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Skills & Certifications */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Additional Information</h2>

            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              name="skills"
              placeholder="Skills (comma separated, e.g., JavaScript, React, Node.js)"
              rows="3"
              value={formData.skills}
              onChange={handleChange}
            />

            <div className="relative">
              <Award className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                name="certifications"
                placeholder="Certifications (one per line)"
                rows="3"
                value={formData.certifications}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Generate Resume
          </button>
        </div>
      </div>
    </div>
  );
}