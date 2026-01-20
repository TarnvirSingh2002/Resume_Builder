'use client'

import { useEffect, useRef, useState } from "react";

export default function AboutPage() {

    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // animate only once
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -80px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center pt-9 mb-3">
                    <div className="inline-block mb-2">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        About Resume Builder
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A simple, free, and powerful tool to help you create professional resumes in minutes
                    </p>
                </div>

                {/* Mission Section */}
                <div className="bg-white rounded-2xl shadow-lg p-3 md:p-6 mb-8 border border-gray-100 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        To empower every job seeker — especially students, freshers, and everyday people in India and around the world — to create professional, modern, ATS-friendly resumes without spending a single rupee, without giving up their privacy, and without unnecessary complications.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        That's why Resume Builder is completely free—no hidden fees, no premium tiers, no credit card required.
                        Our goal is to empower job seekers worldwide to create stunning, ATS-friendly resumes that help them
                        land their dream jobs. We're committed to transparency and user-centric design. While we offer optional AI enhancements, you can always build and download professional resumes without paying a dime.
                    </p>
                    <p className="text-gray-900 font-bold text-lg">Our bigger dream</p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We want to remove money and privacy as barriers to opportunity.
                        Whether you're a student applying for your first internship, a professional switching careers, or anyone just trying to get a better job — you deserve a fair shot without exploitation.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-3xl">🎨</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Beautiful Templates</h3>
                        <p className="text-gray-600">
                            Choose from a variety of professionally designed templates that make you stand out.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-3xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
                        <p className="text-gray-600">
                            Create, edit, and download your resume in minutes. No signup required to get started.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-3xl">🔒</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy First</h3>
                        <p className="text-gray-600">
                            Your data stays on your device. We store everything locally in your browser by default.
                        </p>
                    </div>
                </div>
                {/* <div className="bg-gradient-to-br from-violet-500 to-indigo-400 rounded-2xl shadow-xl p-8 md:p-12 mb-8 text-white"> */}
                <div ref={ref} className={`
                    bg-gradient-to-br from-violet-500 to-indigo-400 
                    rounded-2xl shadow-xl p-8 md:p-6 mb-4 text-white
                    opacity-0 
                    transition-all duration-900 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : ''}
                    `}>
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                            <span className="text-2xl">💡</span>
                        </div>
                        <h2 className="text-3xl font-bold text-amber-100" >Why We Built This</h2>
                    </div>
                    <p className="text-lg leading-relaxed mb-4 text-gray-900">
                        As developers and job seekers ourselves, we've experienced the frustration of expensive resume
                        builders with paywalls and limited features. We wanted to create something different—a tool that's
                        powerful, free, and accessible to everyone.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-900">
                        This project started as a learning exercise and has grown into a tool we're proud to share with the community.
                        We hope it helps you in your job search journey!
                    </p>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    Our Core Values
                </h2>

                <div className="grid md:grid-cols-4 gap-8 text-center pb-6">
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                            🔒
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Privacy First</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Your data never leaves your device unless you choose to save it
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                            ⚡
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Speed & Simplicity</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Create beautiful resumes in minutes — not hours
                        </p>
                    </div>

                    {/* Value 3 */}
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                            🏆
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Quality Focus</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Modern ATS-friendly templates that help you get noticed
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                            ♡
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Accessibility</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Professional tools for everyone — completely free, no hidden fees
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}