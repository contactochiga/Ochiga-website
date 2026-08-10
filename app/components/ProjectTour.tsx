"use client";

// Generic, data-driven project-tour shell shared by every Ochiga
// development tour (currently Havana Residences and Green Gardens).
// The chapter rail/navigator is visible from the moment the route
// loads, with "Introduction" already selected. Until the visitor
// clicks Start Tour, that chapter's own stage image sits behind an
// elegant blur/dim veil carrying the project name and the Start Tour
// action; clicking it smoothly clears the veil in place rather than
// swapping to a different page or layout. Manual chapter navigation
// (rail, mobile pills, prev/next) works throughout and also counts as
// starting the tour. The stage's visual slot is a plain image today
// (via AbstractSurface); a later digital-twin/WebGL experience can
// occupy the same slot without touching the rail/stage architecture
// around it.
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

  const goToChapter = (index: number) => {
    setActiveChapter(index);
    setStarted(true);
  };

  const chapter = project.chapters[activeChapter];
  const isIntroVeiled = !started && activeChapter === 0;

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
        {/* Compact chapter navigator — mobile/tablet only, visible from
            the start so the guided-story structure is obvious on arrival. */}
        <nav aria-label="Tour chapters" role="tablist" className="flex gap-2 overflow-x-auto pb-2 md:hidden">
          {project.chapters.map((item, index) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={index === activeChapter}
              aria-controls={PANEL_ID}
              onClick={() => goToChapter(index)}
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

        {/* Chapter rail — desktop only, same visibility rule as above. */}
        <nav aria-label="Tour chapters" role="tablist" className="hidden w-64 flex-shrink-0 md:block">
          <ol className="sticky top-32 flex flex-col gap-1 border-l border-ochiga-white/10">
            {project.chapters.map((item, index) => (
              <li key={item.key}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === activeChapter}
                  aria-controls={PANEL_ID}
                  onClick={() => goToChapter(index)}
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
          <div className="relative overflow-hidden rounded border border-ochiga-white/10">
            <div className={`transition-[filter] duration-cinematic ease-editorial ${isIntroVeiled ? "blur-md scale-105" : ""}`}>
              <AbstractSurface
                tone={chapter.tone || "charcoal"}
                aspect="aspect-[16/9]"
                src={chapter.image?.src}
                alt={chapter.image?.alt}
                objectPosition={chapter.image?.position}
                label={chapter.image ? undefined : chapter.title}
              />
            </div>

            {isIntroVeiled ? (
              <div className="absolute inset-0 flex flex-col items-start justify-end bg-ochiga-black/50 p-6 md:p-10">
                <p className="text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">
                  {project.typeLine} · {project.location}
                </p>
                <h1 className="mt-4 max-w-md font-display text-3xl leading-[1.05] tracking-tight text-ochiga-white md:text-5xl">
                  {project.name}
                </h1>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ochiga-white/70 md:text-base">{project.oneLiner}</p>
                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  className="mt-6 inline-flex items-center justify-center rounded bg-ochiga-red px-6 py-2.5 text-sm font-medium text-ochiga-white transition-colors duration-base hover:bg-ochiga-red-bright"
                >
                  Start Tour →
                </button>
              </div>
            ) : null}
          </div>

          {!isIntroVeiled ? (
            <>
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
                  onClick={() => goToChapter(activeChapter - 1)}
                  disabled={activeChapter === 0}
                  className="text-sm text-ochiga-white/55 transition-colors duration-base hover:text-ochiga-white disabled:opacity-30 disabled:hover:text-ochiga-white/55"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => goToChapter(activeChapter + 1)}
                  disabled={activeChapter === project.chapters.length - 1}
                  className="text-sm text-ochiga-white/55 transition-colors duration-base hover:text-ochiga-white disabled:opacity-30 disabled:hover:text-ochiga-white/55"
                >
                  Next →
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
