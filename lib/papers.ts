export type PaperCategory =
  | "Technology"
  | "Infrastructure"
  | "Governance"
  | "AI"
  | "Digital Twins"
  | "Smart Estates";

export type PaperSection = {
  heading: string;
  body: string[];
};

export type Paper = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  publishDate: string;
  author: string;
  category: PaperCategory;
  readingTime: string;
  relatedPapers: string[];
  pdfPath?: string;
  sections: PaperSection[];
};

export const paperCategories: PaperCategory[] = [
  "Technology",
  "Infrastructure",
  "Governance",
  "AI",
  "Digital Twins",
  "Smart Estates",
];

export const papers: Paper[] = [
  {
    slug: "digital-twins-operational",
    title: "Digital Twins as Operational Infrastructure",
    subtitle: "Why twins must govern infrastructure, not merely visualize it.",
    summary:
      "A practical argument for treating digital twins as authoritative operational records for estates, buildings, assets, access, utilities, and incidents.",
    publishDate: "2026-06-03",
    author: "Ochiga Systems",
    category: "Digital Twins",
    readingTime: "8 min read",
    relatedPapers: ["infrastructure-operating-systems", "infrastructure-intelligence", "digital-identity-for-physical-spaces"],
    sections: [
      {
        heading: "The Visualization Trap",
        body: [
          "Digital twins are often presented as impressive renderings: a building model, a dashboard, a moving camera, or a set of status lights. Those experiences can be useful, but visualization alone does not operate infrastructure.",
          "The operational question is harder: which system knows what exists, who owns it, where it belongs, whether it is healthy, and what action is allowed next? A twin becomes infrastructure only when it can answer those questions with authority.",
        ],
      },
      {
        heading: "A Twin as a System of Record",
        body: [
          "An operational twin should define the estate, buildings, homes, rooms, assets, devices, cameras, utility points, incidents, and maintenance objects that make up the physical environment.",
          "When a device is assigned, a camera is placed, a room is created, or an incident is opened, the twin should preserve that relationship. This turns the model into infrastructure memory rather than presentation software.",
        ],
      },
      {
        heading: "Layers That Matter",
        body: [
          "A production twin needs layers: structure, devices, cameras, utilities, edge nodes, visitors, incidents, and maintenance. Each layer should be honest about source quality. Some layers may be live, some pending, and some intentionally unavailable.",
          "This is why Ochiga treats missing telemetry as a state, not a design problem to hide. Operators need to know when a source is real and when it is still awaiting integration.",
        ],
      },
      {
        heading: "From Model to Command Surface",
        body: [
          "The value of a twin increases when it becomes a command surface. Operators should be able to locate a room, inspect a camera, review an incident, understand a utility event, or trace a maintenance request from the same spatial context.",
          "That does not mean every object needs 3D coordinates on day one. It means every object needs a durable place in the infrastructure model, with placement states such as no location, location pending, and location assigned.",
        ],
      },
      {
        heading: "The Ochiga Position",
        body: [
          "Ochiga builds digital twins as operational infrastructure. Rendering is one layer. Authority, persistence, auditability, and workflow are the foundation.",
          "For estates and built environments, the twin should help teams operate better tomorrow than they did yesterday. If it cannot preserve state, explain source quality, or guide action, it is not yet an operational twin.",
        ],
      },
    ],
  },
  {
    slug: "infrastructure-operating-systems",
    title: "Infrastructure Operating Systems",
    subtitle: "A framework for governing physical environments as living systems.",
    summary:
      "Defines the Infrastructure OS category and explains why estates, facilities, and urban systems need persistent operational software, not isolated applications.",
    publishDate: "2026-06-04",
    author: "Ochiga Systems",
    category: "Infrastructure",
    readingTime: "9 min read",
    relatedPapers: ["digital-twins-operational", "infrastructure-intelligence", "smart-estates-beyond-access-control"],
    sections: [
      {
        heading: "The Missing Operating Layer",
        body: [
          "Most physical environments are built through projects but operated through improvisation. Access control, maintenance, power, water, payments, visitors, devices, and communications often sit in separate tools with separate ownership.",
          "An Infrastructure Operating System is the persistent layer that connects those domains after construction ends. It keeps the environment governable across residents, operators, vendors, devices, and time.",
        ],
      },
      {
        heading: "Not a Dashboard",
        body: [
          "Dashboards summarize. Operating systems coordinate. The difference matters because infrastructure fails through handoffs: the visitor pass that security cannot verify, the meter reading that finance cannot connect to a home, the device that exists but belongs to no room.",
          "A true operating layer must carry identity, authority, state, assignments, events, and audit history. It should know not only what is visible, but what is allowed.",
        ],
      },
      {
        heading: "Estate as the Operational Boundary",
        body: [
          "The estate is a practical unit of infrastructure governance. It contains homes, residents, shared assets, facilities, security policies, utility obligations, and community rules.",
          "Starting from the estate avoids a common failure mode: building software around devices rather than around the institution responsible for operating them.",
        ],
      },
      {
        heading: "Core Capabilities",
        body: [
          "Infrastructure OS capabilities include invite-first identity, resident context, home and room assignment, device registry, provider sync, access lifecycle, visitor verification, maintenance workflows, wallet and service operations, audit trails, and digital twin persistence.",
          "These capabilities are not independent modules; they form an operating model. A resident invite affects context. A home affects devices. A device affects scenes. A camera affects incidents. The system must preserve those relationships.",
        ],
      },
      {
        heading: "Why This Matters Now",
        body: [
          "As estates adopt connected devices, cameras, payment systems, resident apps, and AI interfaces, the cost of fragmentation rises. Without an operating layer, automation increases complexity instead of reducing it.",
          "Ochiga's position is that physical infrastructure needs software with memory, authority, and operational depth. That is the Infrastructure Operating System category.",
        ],
      },
    ],
  },
  {
    slug: "smart-estates-beyond-access-control",
    title: "Smart Estates Beyond Access Control",
    subtitle: "Why the next estate platform must connect residents, operators, devices, and services.",
    summary:
      "Explains why modern estates cannot stop at gates and visitor codes, and how access becomes one workflow inside a wider operating environment.",
    publishDate: "2026-06-04",
    author: "Ochiga Systems",
    category: "Smart Estates",
    readingTime: "7 min read",
    relatedPapers: ["digital-identity-for-physical-spaces", "infrastructure-operating-systems", "ai-for-built-environments"],
    sections: [
      {
        heading: "Access Was the First Problem",
        body: [
          "Many smart-estate conversations begin with gate control. That is understandable: visitors are visible, security pressure is immediate, and residents feel the friction every day.",
          "But once access is digitized, the estate quickly discovers adjacent problems. Who owns a home record? Which resident is active? Which visitor was verified? Which staff member approved entry? Which incident followed the access event?",
        ],
      },
      {
        heading: "The Estate Is a Service Environment",
        body: [
          "Residents experience an estate through services: maintenance, visitors, community notices, utilities, payments, security, devices, and support. Operators experience the same estate through queues, exceptions, audits, assignments, and escalations.",
          "A smart estate should connect both experiences without turning the resident app into an admin system or the facility console into a lifestyle interface.",
        ],
      },
      {
        heading: "Devices Need Assignment, Not Just Discovery",
        body: [
          "Importing devices from a provider is not enough. A device must belong to the right estate, home, room, resident context, and control policy. Otherwise the system creates visibility without governance.",
          "This is why smart-estate infrastructure needs a registry, assignment workflow, and safe command path rather than a simple device list.",
        ],
      },
      {
        heading: "Operational Trust",
        body: [
          "Residents trust systems that are predictable. Operators trust systems that are auditable. Smart estates require both: clean resident journeys and clear facility authority.",
          "A strong estate platform should make every access change, invite, device assignment, incident, and service request traceable without exposing sensitive internal data to the wrong person.",
        ],
      },
      {
        heading: "The Ochiga View",
        body: [
          "Smart estates are not defined by a gate app. They are defined by the ability to operate the estate as a connected environment.",
          "Access control remains important, but it becomes one workflow inside the larger system of identity, infrastructure, service delivery, and resident trust.",
        ],
      },
    ],
  },
  {
    slug: "ai-for-built-environments",
    title: "AI for Built Environments",
    subtitle: "How AI becomes useful when it is grounded in permissions, context, and operational state.",
    summary:
      "Frames AI as an operational interface for estates and facilities, with emphasis on scope, safety, context, and command reliability.",
    publishDate: "2026-06-04",
    author: "Ochiga Systems",
    category: "AI",
    readingTime: "8 min read",
    relatedPapers: ["infrastructure-operating-systems", "infrastructure-intelligence", "smart-estates-beyond-access-control"],
    sections: [
      {
        heading: "AI Without Context Is Theatre",
        body: [
          "Built environments are full of constraints. A resident can control some devices, not all devices. An operator can verify some actions, not every action. A visitor pass may be valid for one home, one estate, and one time window.",
          "AI becomes useful only when it understands those boundaries. Without context and permissions, it becomes a conversational layer floating above reality.",
        ],
      },
      {
        heading: "The Command Router Problem",
        body: [
          "Natural language is flexible, but infrastructure commands must be precise. Turning 'switch off the living room light' into a safe action requires device identity, room assignment, home context, capability mapping, and confirmation behavior.",
          "The AI layer should not invent a device, skip a permission check, or bypass the command path. It should resolve intent into the same operational route used by the rest of the system.",
        ],
      },
      {
        heading: "Resident AI and Operator AI Are Different",
        body: [
          "A resident assistant should help with home actions, visitor questions, maintenance, services, and community context. An operator assistant should prioritize queues, incidents, infrastructure posture, and administrative workflows.",
          "Both can share intelligence, but they should not share scope. Clear product boundaries are security boundaries.",
        ],
      },
      {
        heading: "AI as a Layer of Accountability",
        body: [
          "AI in infrastructure should explain what it did, what it could not do, and what source it used. Logs, confirmations, and audit trails matter more than novelty.",
          "If an AI cannot act safely, it should say so. If a source is missing, it should expose the limitation instead of smoothing it over.",
        ],
      },
      {
        heading: "The Ochiga View",
        body: [
          "Ochiga treats AI as an operational interface, not a replacement for governance. The system of record, permission model, audit ledger, and command router remain the foundation.",
          "The future of AI in built environments is not a chatbot pasted onto a dashboard. It is intelligence grounded in the real state of the place it serves.",
        ],
      },
    ],
  },
  {
    slug: "digital-identity-for-physical-spaces",
    title: "Digital Identity for Physical Spaces",
    subtitle: "Why homes, residents, operators, visitors, and assets need durable authority relationships.",
    summary:
      "Explores invite-first onboarding, role assignment, access lifecycle, and why physical infrastructure needs identity models that outlast individual apps.",
    publishDate: "2026-06-04",
    author: "Ochiga Systems",
    category: "Governance",
    readingTime: "8 min read",
    relatedPapers: ["smart-estates-beyond-access-control", "infrastructure-operating-systems", "digital-twins-operational"],
    sections: [
      {
        heading: "Physical Space Has Authority",
        body: [
          "A home is not just an address. It has owners, residents, guests, devices, services, bills, access rules, and obligations. An estate is not just a location. It has governance, staff, infrastructure, policies, and audit requirements.",
          "Digital identity for physical spaces must model those relationships directly rather than treating every user as a standalone account.",
        ],
      },
      {
        heading: "Invite-First Is an Infrastructure Pattern",
        body: [
          "Open signup works for public software. It is weaker for managed residential environments, where the facility must know who belongs to which home before access is granted.",
          "Invite-first onboarding lets the facility create the estate, home, resident record, role, and activation path before the resident enters the system. That gives the consumer experience a clean context from day one.",
        ],
      },
      {
        heading: "Roles Are Operational Boundaries",
        body: [
          "Owner, admin, resident, guest, operator, security staff, and maintenance staff are not labels for UI decoration. They determine what can be seen, changed, approved, revoked, and audited.",
          "A reliable identity layer must support role assignment, suspension, restoration, removal, and context switching without leaking other homes, estates, or internal facility data.",
        ],
      },
      {
        heading: "Identity Extends to Assets",
        body: [
          "Devices, cameras, edge nodes, rooms, buildings, and utility points also need identity. If a smart device can be renamed in a provider app, the infrastructure system still needs a stable identity that preserves assignment and audit history.",
          "The identity problem is therefore larger than people. It is the foundation for every operational object in the environment.",
        ],
      },
      {
        heading: "The Ochiga View",
        body: [
          "Ochiga treats identity as infrastructure. People, homes, roles, devices, rooms, and events need durable relationships that the system can verify.",
          "Without identity, automation becomes risky. With identity, infrastructure becomes governable.",
        ],
      },
    ],
  },
  {
    slug: "infrastructure-intelligence",
    title: "Infrastructure Intelligence",
    subtitle: "From dashboards to systems that understand operational state.",
    summary:
      "Defines infrastructure intelligence as the combination of telemetry, context, workflows, audit, and spatial relationships rather than generic analytics.",
    publishDate: "2026-06-04",
    author: "Ochiga Systems",
    category: "Technology",
    readingTime: "7 min read",
    relatedPapers: ["ai-for-built-environments", "digital-twins-operational", "infrastructure-operating-systems"],
    sections: [
      {
        heading: "Intelligence Is Not a Chart",
        body: [
          "Infrastructure intelligence is often reduced to analytics: graphs, counts, heatmaps, and trend lines. Those can help, but they are not enough to operate a place.",
          "A system is intelligent when it understands state, context, responsibility, urgency, history, and next action.",
        ],
      },
      {
        heading: "Source Quality Comes First",
        body: [
          "A serious infrastructure system must distinguish live telemetry from pending integration, no source configured, permission required, and backend unavailable. Treating all missing data as zero is dangerous.",
          "Honest source states protect operators from false confidence. They also make deployment work visible, which is essential for long-term system maturity.",
        ],
      },
      {
        heading: "Attention Over Analytics",
        body: [
          "Operators need to know what requires action: an offline edge node, a failed provider sync, an unassigned maintenance request, an expired invite, a camera warning, or a utility event.",
          "Infrastructure intelligence should produce attention queues and recommended actions before decorative dashboards.",
        ],
      },
      {
        heading: "Spatial and Operational Context",
        body: [
          "A device is more useful when the system knows its estate, home, room, provider, status, capability, and assignment history. An incident is more useful when it can be tied to a location, severity, owner, and timeline.",
          "This context turns raw events into operational knowledge.",
        ],
      },
      {
        heading: "The Ochiga View",
        body: [
          "Ochiga defines infrastructure intelligence as the ability to preserve context, identify risk, guide action, and learn from operational history.",
          "It is not a generic analytics layer. It is the intelligence that emerges when infrastructure has memory.",
        ],
      },
    ],
  },
];

export function getPaper(slug: string) {
  return papers.find((paper) => paper.slug === slug);
}

export function getRelatedPapers(paper: Paper) {
  return paper.relatedPapers
    .map((slug) => getPaper(slug))
    .filter((related): related is Paper => Boolean(related));
}

export function getPapersByCategory(category: PaperCategory) {
  return papers.filter((paper) => paper.category === category);
}

export const featuredPaper = papers[0];
