import Link from "next/link";
import Section from "@/app/components/Section";

const papers = [
  {
    slug: "identity-as-infrastructure",
    title: "Identity as the Foundation of Smart Infrastructure",
  },
  {
    slug: "digital-twins-at-scale",
    title: "Digital Twins for Multi-Estate Systems",
  },
];

export default function Papers() {
  return (
    <Section title="Papers">
      <ul>
        {papers.map((p) => (
          <li key={p.slug}>
            <Link href={`/papers/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </Section>
  ); 
}
