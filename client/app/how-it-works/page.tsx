import { CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    title: "1. Citizen Reports the Challenge",
    description: "Any community member or local body can submit a challenge detailing the civic issue. They provide photos, precise location data, and supporting documents to build a strong case."
  },
  {
    title: "2. AI Triage & Routing",
    description: "Our AI engine automatically categorizes the submission, scores it for priority, checks against existing challenges for duplicates, and routes it to the university best matched by subject expertise."
  },
  {
    title: "3. University Forms a Team",
    description: "Higher Education Institutions review assigned challenges. They form multidisciplinary teams consisting of students and assign faculty mentors to guide the solution development process."
  },
  {
    title: "4. Proposal & Solution Design",
    description: "The academic team submits a detailed solution proposal. This includes the technical approach, required resources, timeline, and potential impact."
  },
  {
    title: "5. Industry Partnership",
    description: "Industries, startups, MSMEs, and CSR bodies plug in to review proposals. They can offer mentoring, co-development, funding, prototyping resources, or pilot environments."
  },
  {
    title: "6. Implementation & Piloting",
    description: "The solution is developed, tested, and implemented in a real-world pilot. Milestones, deliverables, and testing outcomes are tracked end-to-end."
  },
  {
    title: "7. Resolution & Impact Tracking",
    description: "Once successfully piloted, the challenge is marked resolved. The IP generated, startups created, and community impact are recorded in real-time dashboards."
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-paper">
      <section className="bg-navy-900 py-24 text-paper">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="font-serif text-4xl font-semibold md:text-6xl">How It Works</h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-200">
            A continuous, transparent workflow from a citizen's initial report to a fully piloted, patented solution.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="space-y-12">
          {STEPS.map((step, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-saffron text-navy-900">
                  <CheckCircle2 size={20} />
                </div>
                {index !== STEPS.length - 1 && (
                  <div className="mt-4 h-full w-px bg-navy-200"></div>
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-serif text-2xl font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-3 text-lg text-navy-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
