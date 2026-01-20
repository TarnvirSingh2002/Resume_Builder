"use client";

export default function DevSecOpsClassic({ data }) {
  const {
    fullName,
    email,
    phone,
    location,
    linkedin,
    summary,
    education = [],
    experience = [],
    skills = "",
    certifications = "",
  } = data;

  return (
    <div className="w-[800px] mx-auto bg-white text-black p-10 font-serif leading-relaxed border border-black">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-3">{fullName}</h1>

      <div className="text-sm mb-4 space-y-0.5">
        <p>{email}</p>
        <p>{phone}</p>
        <p>{location}</p>
        <p>{linkedin}</p>
      </div>

      {/* SUMMARY */}
      {summary && (
        <p className="text-sm mb-6">
          {summary}
        </p>
      )}

      {/* EDUCATION */}
      <Section title="EDUCATION">
        {education.map((edu, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-bold">{edu.institution}</h3>
              <span className="text-sm text-gray-700">
                {edu.startDate} - {edu.endDate}
              </span>
            </div>
            <p className="italic">{edu.degree}</p>
            <p className="text-sm text-gray-700">{edu.location}</p>

            {edu.points?.length > 0 && (
              <ul className="list-disc ml-6 mt-1 text-sm">
                {edu.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Section>

      {/* EXPERIENCE */}
      <Section title="EXPERIENCE">
        {experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-bold">{exp.company}</h3>
              <span className="text-sm text-gray-700">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <p className="italic">{exp.role}</p>
            <p className="text-sm text-gray-700">{exp.location}</p>

            {exp.points?.length > 0 && (
              <ul className="list-disc ml-6 mt-1 text-sm">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Section>

      {/* SKILLS */}
      {skills && (
        <Section title="SKILLS">
          <p className="text-sm">{skills}</p>
        </Section>
      )}

      {/* CERTIFICATIONS */}
      {certifications && (
        <Section title="CERTIFICATIONS">
          <p className="text-sm">{certifications}</p>
        </Section>
      )}
    </div>
  );
}

/* Reusable Section Wrapper */
function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold mb-2 tracking-wide">
        {title}
      </h2>
      {children}
    </section>
  );
}
