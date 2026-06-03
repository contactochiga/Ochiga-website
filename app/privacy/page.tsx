import type { Metadata } from "next";
import CorporatePage from "@/app/components/CorporatePage";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy — Ochiga",
  description: "Ochiga privacy information for website visitors, deployment enquiries, and enterprise infrastructure conversations.",
};

export default function PrivacyPage() {
  return (
    <CorporatePage
      eyebrow="Privacy"
      title="Privacy for infrastructure conversations."
      description="Ochiga collects only the information needed to understand enquiries, respond to deployment requests, and operate trusted business conversations."
    >
      <PolicySections
        sections={[
          ["Information we collect", "When you contact Ochiga or submit a deployment request, we may collect your name, company, email, phone, location, project type, project size, deployment interest, and project notes."],
          ["How we use information", "We use submitted information to qualify infrastructure enquiries, respond to requests, route conversations to the right team, maintain audit visibility, and improve Ochiga communications."],
          ["Operational systems", "Website interactions may be routed into Ochiga operational systems, including lead management, support, and internal review workflows. We do not sell deployment enquiry data."],
          ["Retention", "Business enquiry records may be retained for operational continuity, compliance, support history, and future deployment planning unless deletion is required by applicable law."],
          ["Contact", `For privacy questions, contact ${companyInfo.contactEmail}.`],
        ]}
      />
    </CorporatePage>
  );
}

function PolicySections({ sections }: { sections: Array<[string, string]> }) {
  return (
    <div className="space-y-8 text-white/68">
      {sections.map(([title, text]) => (
        <section key={title}>
          <h2 className="text-lg font-medium text-white">{title}</h2>
          <p className="mt-3 leading-7">{text}</p>
        </section>
      ))}
    </div>
  );
}
