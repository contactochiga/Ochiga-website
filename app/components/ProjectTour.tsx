"use client";

// Generic, data-driven project-tour shell shared by every Ochiga
// development tour (currently Havana Residences and Green Gardens).
// Cinematic intro cover -> chapter rail (desktop) / compact chapter
// pills (mobile) + a single stage panel. The stage's visual slot is a
// plain image today (via AbstractSurface); a later digital-twin/WebGL
// experience can occupy the same slot without touching the rail/stage
// architecture around it.
import { useState } from "react";
import Link from "next/link";
import AbstractSurface from "@/app/components/AbstractSurface";
import ProjectStatusStepper from "@/app/components/ProjectStatusStepper";

export type TourChapter = {
  key: string;
  title: string;
  body: string[];
  image?: { src: string; alt: string; position?: string };
  tone?: "black" | "charcoal" | "red";
  disclaimer?: string;
  statusStepper?: { stages: string[]; activeIndex: number };
};

export type ProjectTourData = {
  name: string;
  typeLine: string;
  location: string;
  status: string;
  oneLiner: string;
  chapters: TourChapter[];
};

const PANEL_ID = "tour-chapter-panel";

export default function ProjectTour({
  project,
  backHref = "/development",
}: {
  project: ProjectTourData;
  backHref?: string;
}) {
  const [started, setStarted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const cover = project.chapters[0];

  if (!started) {
    return (
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden border-b border-ochiga-white/10 bg-ochiga-black px-6 pb-20 pt-40 md:px-10 md:pb-24">
        <div aria-hidden className="absolute inset-0">
          <AbstractSurface
            tone={cover.tone || "charcoal"}
            aspect="h-full w-full"
            src={cover.image?.src}
            alt={cover.image?.alt}
            objectPosition={cover.image?.position}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ochiga-black via-ochiga-black/60 to-ochiga-black/20" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-cinematic">
          <p className="mb-6 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">
            {project.typeLine} · {project.location}
          </p>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ochiga-white md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ochiga-white/65">{project.oneLiner}</p>
          <span className="mt-6 inline-block rounded-sm border border-ochiga-red/40 px-2.5 py-1 text-[11px] uppercase tracking-wide text-ochiga-red">
            {project.status}
          </span>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="inline-flex items-center justify-center rounded bg-ochiga-red px-7 py-3 text-sm font-medium text-ochiga-white transition-colors duration-base hover:bg-ochiga-red-bright"
            >
              Start Tour
            </button>
            <Link
              href={backHref}
              className="text-sm text-ochiga-white/55 underline decoration-ochiga-red/60 underline-offset-4 hover:text-ochiga-white"
            >
              ← Back to Development
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const chapter = project.chapters[activeChapter];

  return (
    <main className="bg-ochiga-black">
      <div className="border-b border-ochiga-white/10 px-6 pb-6 pt-32 md:px-10 md:pt-40">
        <Link href={backHref} className="text-xs uppercase tracking-eyebrow text-ochiga-white/45 hover:text-ochiga-white">
          ← Development
        </Link>
        <p className="mt-4 text-xs uppercase tracking-wide text-ochiga-red">
          {project.typeLine} · {project.location}
        </p>
        <p className="mt-1 font-display text-2xl text-ochiga-white">{project.name}</p>
      </div>

      <div className="mx-auto flex max-w-wide flex-col gap-8 px-6 py-10 md:flex-row md:gap-12 md:px-10 md:py-14">
        {/* Compact chapter navigator — mobile/tablet only */}
        <nav aria-label="Tour chapters" role="tablist" className="flex gap-2 overflow-x-auto pb-2 md:hidden">
          {project.chapters.map((item, index) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={index === activeChapter}
              aria-controls={PANEL_ID}
              onClick={() => setActiveChapter(index)}
              className={`flex-shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-wide transition-colors duration-base ${
                index === activeChapter
                  ? "border-ochiga-red bg-ochiga-red/10 text-ochiga-white"
                  : "border-ochiga-white/15 text-ochiga-white/50 hover:border-ochiga-white/30"
              }`}
            >
              {index + 1}. {item.title}
            </button>
          ))}
        </nav>

        {/* Chapter rail — desktop only */}
        <nav aria-label="Tour chapters" role="tablist" className="hidden w-64 flex-shrink-0 md:block">
          <ol className="sticky top-32 flex flex-col gap-1 border-l border-ochiga-white/10">
            {project.chapters.map((item, index) => (
              <li key={item.key}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === activeChapter}
                  aria-controls={PANEL_ID}
                  onClick={() => setActiveChapter(index)}
                  className={`-ml-px block w-full border-l px-5 py-3 text-left text-sm transition-colors duration-base ${
                    index === activeChapter
                      ? "border-ochiga-red text-ochiga-white"
                      : "border-transparent text-ochiga-white/45 hover:text-ochiga-white/75"
                  }`}
                >
                  <span className="mr-2 text-ochiga-white/30">{String(index + 1).padStart(2, "0")}</span>
                  {item.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* Stage */}
        <div id={PANEL_ID} role="tabpanel" key={chapter.key} className="min-w-0 flex-1 animate-hero-in">
          <div className="overflow-hidden rounded border border-ochiga-white/10">
            <AbstractSurface
              tone={chapter.tone || "charcoal"}
              aspect="aspect-[16/9]"
              src={chapter.image?.src}
              alt={chapter.image?.alt}
              objectPosition={chapter.image?.position}
              label={chapter.image ? undefined : chapter.title}
            />
          </div>
          <h2 className="mt-8 font-display text-2xl text-ochiga-white md:text-4xl">{chapter.title}</h2>
          <div className="mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-ochiga-white/65">
            {chapter.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {chapter.statusStepper ? (
            <div className="mt-8 max-w-md">
              <ProjectStatusStepper stages={chapter.statusStepper.stages} activeIndex={chapter.statusStepper.activeIndex} />
            </div>
          ) : null}
          {chapter.disclaimer ? <p className="mt-8 max-w-2xl text-xs text-ochiga-white/35">{chapter.disclaimer}</p> : null}

          <div className="mt-10 flex items-center gap-6 border-t border-ochiga-white/10 pt-6">
            <button
              type="button"
              onClick={() => setActiveChapter(activeChapter - 1)}
              disabled={activeChapter === 0}
              className="text-sm text-ochiga-white/55 transition-colors duration-base hover:text-ochiga-white disabled:opacity-30 disabled:hover:text-ochiga-white/55"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={() => setActiveChapter(activeChapter + 1)}
              disabled={activeChapter === project.chapters.length - 1}
              className="text-sm text-ochiga-white/55 transition-colors duration-base hover:text-ochiga-white disabled:opacity-30 disabled:hover:text-ochiga-white/55"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
