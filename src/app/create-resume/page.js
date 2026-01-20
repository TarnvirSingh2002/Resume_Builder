'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function CreateResumePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const templatesRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (templatesRef.current) {
      observer.observe(templatesRef.current);
    }

    return () => {
      if (templatesRef.current) {
        observer.unobserve(templatesRef.current);
      }
    };
  }, [isVisible]);

  const templates = [
    {
      id: 1,
      name: 'Professional',
      category: 'professional',
      color: 'bg-blue-50',
      accent: 'bg-blue-600',
      previewImage: 'https://images.resumgo.com/2025/12/Eiger-Resume-Template-ResumGO.png'  // Clean blue professional look
    },
    {
      id: 2,
      name: 'Modern',
      category: 'modern',
      color: 'bg-purple-50',
      accent: 'bg-purple-600',
      previewImage: '/second.png'  // Fresh modern style
    },
    {
      id: 3,
      name: 'Creative',
      category: 'creative',
      color: 'bg-pink-50',
      accent: 'bg-pink-600',
      previewImage: '/create.jpg'  // Artistic & colorful creative design
    },
    {
      id: 4,
      name: 'Minimalist',
      category: 'minimalist',
      color: 'bg-gray-50',
      accent: 'bg-gray-800',
      previewImage: '/classic.webp'  // Super clean minimalist layout
    },
    {
      id: 5,
      name: 'Executive',
      category: 'professional',
      color: 'bg-indigo-50',
      accent: 'bg-indigo-600',
      previewImage: '/modern.jpg'  // Elegant dark blue executive style
    },
    {
      id: 6,
      name: 'Tech',
      category: 'modern',
      color: 'bg-green-50',
      accent: 'bg-green-600',
      previewImage: '/ats wala.jpg'  // Tech/developer modern green vibe
    },
    {
      id: 7,
      name: 'Designer',
      category: 'creative',
      color: 'bg-orange-50',
      accent: 'bg-orange-600',
      previewImage: '/devops1.webp'  // Vibrant orange creative designer look
    },
    {
      id: 8,
      name: 'Classic',
      category: 'minimalist',
      color: 'bg-slate-50',
      accent: 'bg-slate-700',
      previewImage: '/ckass.png'
    },
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Resume Template
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Select from our professionally designed templates and create a stunning resume in minutes
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-5">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600 mt-1">Templates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">100K+</div>
              <div className="text-gray-600 mt-1">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600">100%</div>
              <div className="text-gray-600 mt-1">Free Forever</div>
            </div>
          </div>
        </div>
      </section>



      {/* Templates Grid */}
      <section ref={templatesRef} className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredTemplates.map((template, index) => (
              <div
                key={template.id}
                className={`group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden rounded-t-2xl">
                    <img
                      src={template.previewImage}  // ← we'll add this to template object
                      alt={`${template.name} resume template preview`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover overlay with button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                  flex items-center justify-center">
                      <button onClick={() => router.push(`/editor/${template.id}`)} className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold 
                       shadow-lg transform scale-90 group-hover:scale-100 
                       transition-all duration-300 hover:bg-gray-100">
                        Use This Template
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Perfect for {template.category} roles
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-medium text-sm">✓ ATS Friendly</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Land Your Dream Job
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Customization</h3>
              <p className="text-gray-600">
                Drag, drop, and edit your way to the perfect resume with our intuitive editor
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">ATS Optimized</h3>
              <p className="text-gray-600">
                All templates are designed to pass Applicant Tracking Systems
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pink-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export Instantly</h3>
              <p className="text-gray-600">
                Download your resume as PDF or Word document in one click
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}