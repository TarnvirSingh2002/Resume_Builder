'use client'
import { useState } from 'react';

export default function CoverLetterPage() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [step, setStep] = useState(1); // 1: Select Template, 2: Fill Details, 3: Preview

    const templates = [
        { 
            id: 1, 
            name: 'Professional', 
            category: 'professional', 
            color: 'bg-blue-50', 
            accent: 'bg-blue-600',
            description: 'Perfect for corporate and traditional roles'
        },
        { 
            id: 2, 
            name: 'Modern', 
            category: 'modern', 
            color: 'bg-purple-50', 
            accent: 'bg-purple-600',
            description: 'Contemporary design for tech and creative fields'
        },
        { 
            id: 3, 
            name: 'Creative', 
            category: 'creative', 
            color: 'bg-pink-50', 
            accent: 'bg-pink-600',
            description: 'Bold and unique for design-focused positions'
        },
        { 
            id: 4, 
            name: 'Minimalist', 
            category: 'minimalist', 
            color: 'bg-gray-50', 
            accent: 'bg-gray-800',
            description: 'Clean and simple for any industry'
        },
        { 
            id: 5, 
            name: 'Executive', 
            category: 'professional', 
            color: 'bg-indigo-50', 
            accent: 'bg-indigo-600',
            description: 'Sophisticated style for leadership roles'
        },
        { 
            id: 6, 
            name: 'Tech', 
            category: 'modern', 
            color: 'bg-green-50', 
            accent: 'bg-green-600',
            description: 'Ideal for IT and engineering positions'
        },
    ];

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        recipientName: '',
        recipientTitle: '',
        companyName: '',
        companyAddress: '',
        jobTitle: '',
        greeting: 'Dear Hiring Manager,',
        opening: '',
        body: '',
        closing: '',
        signature: 'Sincerely,'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setStep(2);
    };

    const handleBackToTemplates = () => {
        setStep(1);
        setSelectedTemplate(null);
    };

    const handlePreview = () => {
        setStep(3);
    };

    const handleBackToEdit = () => {
        setStep(2);
    };

    const handleDownload = () => {
        alert('PDF download functionality would be implemented here!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <section className="pt-20 pb-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block mb-6">
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Create Your Perfect
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Cover Letter
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Choose a template, fill in your details, and generate a professional cover letter in minutes
                    </p>
                    
                    {/* Progress Steps */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                1
                            </div>
                            <span className="ml-2 font-medium hidden sm:inline">Choose Template</span>
                        </div>
                        <div className="w-12 h-0.5 bg-gray-300"></div>
                        <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                2
                            </div>
                            <span className="ml-2 font-medium hidden sm:inline">Fill Details</span>
                        </div>
                        <div className="w-12 h-0.5 bg-gray-300"></div>
                        <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                3
                            </div>
                            <span className="ml-2 font-medium hidden sm:inline">Preview & Download</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Step 1: Template Selection */}
            {step === 1 && (
                <section className="py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Select Your Cover Letter Template
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {templates.map((template) => (
                                <div
                                    key={template.id}
                                    onClick={() => handleTemplateSelect(template)}
                                    className="group cursor-pointer"
                                >
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                        {/* Template Preview */}
                                        <div className={`${template.color} h-64 relative p-6`}>
                                            <div className={`${template.accent} h-3 w-20 rounded-full mb-4`}></div>
                                            <div className="bg-white/80 h-4 w-32 rounded mb-2"></div>
                                            <div className="bg-white/60 h-3 w-24 rounded mb-6"></div>
                                            <div className="space-y-2">
                                                <div className="bg-white/40 h-2 w-full rounded"></div>
                                                <div className="bg-white/40 h-2 w-5/6 rounded"></div>
                                                <div className="bg-white/40 h-2 w-4/6 rounded"></div>
                                            </div>
                                            
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                                    Select Template
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Template Info */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {template.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                {template.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Step 2: Fill Details */}
            {step === 2 && selectedTemplate && (
                <section className="py-12 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Fill in Your Details
                                </h2>
                                <button
                                    onClick={handleBackToTemplates}
                                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Change Template
                                </button>
                            </div>

                            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-800">
                                    <strong>Selected Template:</strong> {selectedTemplate.name}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Your Information */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                                            👤
                                        </span>
                                        Your Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="City, State"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Recipient Information */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
                                            🏢
                                        </span>
                                        Recipient Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Hiring Manager Name</label>
                                            <input
                                                type="text"
                                                name="recipientName"
                                                value={formData.recipientName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Jane Smith"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Their Title</label>
                                            <input
                                                type="text"
                                                name="recipientTitle"
                                                value={formData.recipientTitle}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="HR Manager"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="ABC Corporation"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                                            <input
                                                type="text"
                                                name="companyAddress"
                                                value={formData.companyAddress}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="City, State"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Job Details */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                                            💼
                                        </span>
                                        Position Details
                                    </h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Software Engineer"
                                        />
                                    </div>
                                </div>

                                {/* Cover Letter Content */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-2">
                                            ✍️
                                        </span>
                                        Cover Letter Content
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Opening Paragraph *</label>
                                            <textarea
                                                name="opening"
                                                value={formData.opening}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Introduce yourself and explain why you're writing..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Main Body *</label>
                                            <textarea
                                                name="body"
                                                value={formData.body}
                                                onChange={handleInputChange}
                                                rows="6"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Highlight your relevant skills, experience, and why you're a great fit..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Closing Paragraph *</label>
                                            <textarea
                                                name="closing"
                                                value={formData.closing}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Express enthusiasm and request an interview..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePreview}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                >
                                    Preview Cover Letter
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Step 3: Preview */}
            {step === 3 && selectedTemplate && (
                <section className="py-12 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Preview Your Cover Letter</h2>
                                    <button
                                        onClick={handleBackToEdit}
                                        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>

                            {/* Preview Content */}
                            <div className={`p-12 ${selectedTemplate.color}`}>
                                <div className="bg-white p-12 shadow-lg rounded-lg max-w-3xl mx-auto">
                                    {/* Header */}
                                    <div className="mb-8">
                                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{formData.fullName || 'Your Name'}</h1>
                                        <p className="text-gray-600">{formData.email || 'email@example.com'} | {formData.phone || 'Phone'}</p>
                                        {formData.address && <p className="text-gray-600">{formData.address}</p>}
                                    </div>

                                    {/* Date */}
                                    <p className="text-gray-600 mb-6">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                                    {/* Recipient */}
                                    {(formData.recipientName || formData.companyName) && (
                                        <div className="mb-6">
                                            {formData.recipientName && <p className="text-gray-900">{formData.recipientName}</p>}
                                            {formData.recipientTitle && <p className="text-gray-600">{formData.recipientTitle}</p>}
                                            {formData.companyName && <p className="text-gray-900 font-medium">{formData.companyName}</p>}
                                            {formData.companyAddress && <p className="text-gray-600">{formData.companyAddress}</p>}
                                        </div>
                                    )}

                                    {/* Greeting */}
                                    <p className="text-gray-900 mb-4">{formData.greeting}</p>

                                    {/* Body */}
                                    <div className="space-y-4 text-gray-700">
                                        <p>{formData.opening || 'Your opening paragraph will appear here...'}</p>
                                        <p>{formData.body || 'Your main body content will appear here...'}</p>
                                        <p>{formData.closing || 'Your closing paragraph will appear here...'}</p>
                                    </div>

                                    {/* Signature */}
                                    <div className="mt-8">
                                        <p className="text-gray-900 mb-12">{formData.signature}</p>
                                        <p className="text-gray-900 font-medium">{formData.fullName || 'Your Name'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Download Button */}
                            <div className="p-6 bg-gray-50 border-t border-gray-200">
                                <button 
                                    onClick={handleDownload}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                >
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download as PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}