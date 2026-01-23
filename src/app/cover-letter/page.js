
'use client'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const templates = [
  { id: 1, name: 'Professional', img: '/Professional.png', desc: 'Corporate & formal roles' },
  { id: 2, name: 'Modern', img: '/Center.jpg', desc: 'Tech & startups' },
  { id: 3, name: 'Executive', img: '/Executive.png', desc: 'Leadership roles' }
]

export default function CoverLetterTemplates() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-6">
      {/* Header */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Create Your Perfect
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Cover Letter
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose a template, fill in your details, and generate a professional cover letter in minutes
        </p>
      </section>

      {/* Templates */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map(t => (
          <div
            key={t.id}
            onClick={() => router.push(`/letter/${t.id}`)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Preview (LOCKED SIZE) */}
            <div className="h-64 relative">
              <Image
                src={t.img}
                alt={t.name}
                fill
                className="object-cover object-top"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  Select Template
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {t.desc}
              </p>
            </div>
          </div>
        ))}
      </div>




      <section className="pt-7 ">
  <div className="max-w-5xl mx-auto text-center space-y-8">

    {/* Heading */}
    <h1 className="text-4xl md:text-5xl font-bold text-[#2C4A5C]">
      Build Your{" "}
      <span className="text-[#044c8c]">Perfect Cover Letter</span>{" "}
      in Minutes
    </h1>

    {/* Description */}
    <p className="text-[#18445c] text-lg md:text-xl">
      Join thousands of successful job seekers who created their professional
      cover letter —{" "}
      <span className="font-semibold text-[#044c8c]">
        free, fast, and easy.
      </span>
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
      <button className="bg-blue-600 text-white font-semibold px-7 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2">
        Create Free Cover Letter
      </button>

      <button className="border-2 border-[blue-600] text-blue-600 font-semibold px-7 py-3 rounded-xl">
        Browse Resume Templates
      </button>
    </div>

    {/* Features */}
    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-12">
      <div className="flex flex-col items-center gap-2">
        <CheckCircle className="w-8 h-8 text-blue-600" />
        <span className="text-sm font-medium text-[#18445c]">
          100% Free
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <CheckCircle className="w-8 h-8 text-blue-600" />
        <span className="text-sm font-medium text-[#18445c]">
          ATS-friendly
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <CheckCircle className="w-8 h-8 text-blue-600" />
        <span className="text-sm font-medium text-[#18445c]">
          Instant Download
        </span>
      </div>
    </div>

  </div>
</section>

    </div>
  )
}
