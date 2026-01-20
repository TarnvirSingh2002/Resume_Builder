"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => setStatsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTemplate((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])


  const [isVisible2, setIsVisible2] = useState(false);
const sectionRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isVisible2) {
        setIsVisible2(true);
      }
    },
    { threshold: 0.2 }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => {
    if (sectionRef.current) {
      observer.unobserve(sectionRef.current);
    }
  };
}, [isVisible2]);

  const templates = [
    { name: "Professional", color: "from-blue-500 to-blue-600" },
    { name: "Modern", color: "from-purple-500 to-purple-600" },
    { name: "Creative", color: "from-pink-500 to-pink-600" }
  ]

  const stats = [
    { number: "50K+", label: "Resumes Created" },
    { number: "98%", label: "Success Rate" },
    { number: "500+", label: "Templates" },
    { number: "24/7", label: "Support" }
  ]

  const features = [
    {
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      title: "Professional Templates",
      description: "Choose from hundreds of professionally designed templates"
    },
    {
      icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      title: "Easy Customization",
      description: "Edit and customize every section with our intuitive editor"
    },
    {
      icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
      title: "Download Instantly",
      description: "Export your resume in PDF, Word, or other formats instantly"
    },
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "ATS Friendly",
      description: "All templates are optimized for Applicant Tracking Systems"
    }
  ]

  const testimonials = [
    {
      name: "Amit Sharma",
      role: "Software Engineer",
      company: "Infosys",
      story:
        "I landed my first interview within a week of using this resume builder. The ATS-friendly templates really work!",
    },
    {
      name: "Neha Verma",
      role: "Marketing Executive",
      company: "Byju’s",
      story:
        "The live preview and clean design made resume building effortless. Highly recommended for freshers.",
    },
    {
      name: "Rohit Mehta",
      role: "Data Analyst",
      company: "TCS",
      story:
        "I switched careers successfully thanks to the professional templates and expert guidance.",
    },
    {
      name: "Karan Patel",
      role: "UI/UX Designer",
      company: "Startup",
      story: "Minimal, modern and impactful resumes. Exactly what recruiters want."
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 pt-5 via-white to-gray-50">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-25 px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Now with AI-powered suggestions
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Build Your Perfect
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Resume</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Create a professional resume in minutes with our easy-to-use builder. Stand out from the crowd and land your dream job.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Create Resume Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </button>

                <button className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg">
                  View Templates
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">4.9/5 Rating</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Free to Start</span>
                </div>
              </div>
            </div>

            {/* Right - Animated Resume Preview */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                {/* Floating Resume Cards */}
                <div className="relative h-[440px] max-w-[400px]">
                  {templates.map((template, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ${activeTemplate === index
                        ? 'opacity-100 scale-100 rotate-0 z-30'
                        : activeTemplate === (index - 1 + 3) % 3
                          ? 'opacity-60 scale-95 rotate-3 translate-x-4 translate-y-4 z-20'
                          : 'opacity-30 scale-90 rotate-6 translate-x-8 translate-y-8 z-10'
                        }`}
                    >
                      <div className="bg-white rounded-xl shadow-2xl p-8 h-full border border-gray-200">
                        <div className={`h-3 bg-gradient-to-r ${template.color} rounded-full mb-6`}></div>
                        <div className="space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                          <div className="pt-6 space-y-3">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                          </div>
                          <div className="pt-6 space-y-3">
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Template Indicator */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {templates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTemplate(index)}
                      className={`h-2 rounded-full transition-all ${activeTemplate === index ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 px-4 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 delay-${index * 100} ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 px-4 bg-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our powerful tools and features help you create a resume that gets noticed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-purple-100 py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">

          {/* Heading */}
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            How It Works
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            Create your professional resume in just three simple steps. Our step-by-step
            process makes resume writing easy and effective.
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Step 1 */}
            <div>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Enter Your Information
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Fill in your personal details, work experience, education,
                and skills through our intuitive step-by-step process.
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Customize & Preview
              </h3>
              <p className="text-gray-600 leading-relaxed">
                See your resume come to life with live preview.
                Edit and customize until it’s perfect.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Download & Apply
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Download your professional PDF resume and
                start applying to your dream jobs with confidence.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Loved by Job Seekers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how professionals are getting hired faster using our resume builder
            </p>
          </div>

          {/* Carousel Wrapper */}
          <div className="relative">
            <div className="testimonial-marquee flex animate-marquee hover:pause-marquee">
              {/* First set */}
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[340px] mx-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm 
                       hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t.name}</h4>
                      <p className="text-sm text-gray-500">
                        {t.role} @ {t.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    “{t.story}”
                  </p>
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {testimonials.map((t, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex-shrink-0 w-[340px] mx-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm 
                       hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t.name}</h4>
                      <p className="text-sm text-gray-500">
                        {t.role} @ {t.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    “{t.story}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-10 bg-blue-50" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Thousands Choose Us
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, powerful, and completely free resume building — no hidden catches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-700 text-center ${
              isVisible2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`} style={{ transitionDelay: '100ms' }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                100% Free Forever
              </h3>
              <p className="text-gray-600">
                No premium plans, no trials, no credit card required. Everything is completely free.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-700 text-center ${
              isVisible2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`} style={{ transitionDelay: '300ms' }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                No Signup Required
              </h3>
              <p className="text-gray-600">
                Start building your resume instantly — no accounts, no passwords, no emails.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-700 text-center ${
              isVisible2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`} style={{ transitionDelay: '500ms' }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Instant Download
              </h3>
              <p className="text-gray-600">
                Get your professional PDF resume instantly — ready to send in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>





{/* CTA Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Ready to Create Your Resume?
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Join thousands of job seekers who have created professional resumes with our free tool.
                    </p>
                    <Link 
                        href="/create-resume"
                        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        Start Building Now
                    </Link>
                </div>
    </div>
  )
}