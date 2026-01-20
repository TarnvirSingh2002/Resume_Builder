"use client";

import {
  Star,
  CheckCircle,
  Trophy,
  Users,
  Award,
  Zap,
} from "lucide-react";

export default function EnhancvModern({ data }) {
  const {
    fullName,
    title,
    email,
    phone,
    location,
    website,
    summary,
    strengths = [],
    experience = [],
    education = [],
    languages = [],
    skills = "",
    achievements = [],
    awards = [],
  } = data;

  return (
    <div className="w-[900px] mx-auto bg-white text-black p-10 font-serif leading-relaxed border border-gray-300 rounded-lg">
      {/* HEADER */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wide uppercase">
          {fullName}
        </h1>
        <p className="italic">{title}</p>

        <p className="text-sm mt-2 text-gray-700">
          {phone} • {email} • {website} • {location}
        </p>
      </header>

      <Divider />

      {/* SUMMARY */}
      <Section title="Summary">
        <p className="text-sm text-center">{summary}</p>
      </Section>

      <Divider />

      {/* STRENGTHS */}
      <Section title="Strengths">
        <div className="grid grid-cols-3 gap-6">
          {strengths.map((s, i) => (
            <div key={i} className="flex gap-3 items-start">
              <Star className="w-5 h-5 text-black mt-1" />
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-gray-600">{s.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* EXPERIENCE */}
      <Section title="Experience">
        {experience.map((exp, i) => (
          <div key={i} className="mb-5">
            <div className="flex justify-between font-semibold">
              <p>{exp.company}</p>
              <p className="text-sm text-gray-600">{exp.location}</p>
            </div>

            <div className="flex justify-between italic text-sm mb-1">
              <p>{exp.role}</p>
              <p>{exp.startDate} - {exp.endDate}</p>
            </div>

            <ul className="list-disc ml-6 text-sm space-y-1">
              {exp.points.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Divider />

      {/* EDUCATION */}
      <Section title="Education">
        {education.map((edu, i) => (
          <div key={i} className="flex justify-between mb-2">
            <div>
              <p className="font-semibold">{edu.institution}</p>
              <p className="italic text-sm">{edu.degree}</p>
            </div>
            <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </Section>

      <Divider />

      {/* LANGUAGES */}
      <Section title="Languages">
        <div className="flex gap-12">
          {languages.map((lang, i) => (
            <div key={i}>
              <p className="font-semibold">{lang.name}</p>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx < lang.level ? "bg-black" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* SKILLS */}
      <Section title="Skills">
        <p className="text-sm text-center">{skills}</p>
      </Section>

      <Divider />

      {/* ACHIEVEMENTS */}
      <Section title="Achievements">
        <div className="grid grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <IconCard
              key={i}
              icon={<Trophy />}
              title={a.title}
              subtitle={a.subtitle}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* AWARDS */}
      <Section title="Awards">
        <div className="grid grid-cols-2 gap-6">
          {awards.map((a, i) => (
            <IconCard
              key={i}
              icon={<Award />}
              title={a.title}
              subtitle={a.year}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ----------------- Helpers ----------------- */

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-center mb-3 uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Divider() {
  return <hr className="my-6 border-gray-400" />;
}

function IconCard({ icon, title, subtitle }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}
