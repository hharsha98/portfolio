import type { ReactNode } from 'react'
import {
  about,
  education,
  experience,
  featured,
  languages,
  profile,
  publication,
  skills,
} from './data/profile'

const nav = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#education', label: 'Education' },
  { href: '#publication', label: 'Publication' },
  { href: '#skills', label: 'Skills' },
] as const

function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a href={href} className={className} rel="noreferrer" target="_blank">
      {children}
    </a>
  )
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className="mb-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/70">{kicker}</p>
      <h2 className="serif mt-1 text-2xl font-semibold tracking-tight text-navy-ink sm:text-3xl">{title}</h2>
    </header>
  )
}

export default function App() {
  return (
    <div className="min-h-dvh">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6">
          <img
            src={profile.photo}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover object-top ring-1 ring-navy/15"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-navy-ink">{profile.name}</p>
            <p className="truncate text-xs text-mute">Nürnberg · Open to roles below</p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-navy px-3.5 py-1.5 text-sm font-medium text-white hover:bg-navy-ink"
            >
              Email
            </a>
            <a
              href={`tel:${profile.phoneTel}`}
              className="rounded-full border border-navy/20 px-3.5 py-1.5 text-sm font-medium text-navy hover:bg-sky/50"
            >
              Call
            </a>
          </div>
        </div>
        <nav aria-label="On this page" className="border-t border-line/70 bg-card/70">
          <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 text-sm sm:px-6">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-3 py-1 text-mute hover:bg-sky/60 hover:text-navy"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(16rem,20rem)_1fr] lg:items-start lg:gap-14 lg:py-12">
        <aside className="lg:sticky lg:top-28">
          <figure className="identity-shadow overflow-hidden rounded-2xl bg-card ring-1 ring-navy/10">
            <img
              src={profile.photo}
              alt={`${profile.name}, professional portrait`}
              width={1200}
              height={1200}
              className="aspect-square w-full object-cover object-top"
            />
          </figure>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/60">
            Bewerbungsfoto · Nürnberg
          </p>

          <h1 className="serif mt-5 text-3xl font-semibold leading-tight tracking-tight text-navy-ink sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-mute">{profile.headline}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Open to">
            {profile.openTo.map((role) => (
              <li
                key={role}
                className="rounded-full bg-sky px-2.5 py-1 text-xs font-medium text-navy"
              >
                {role}
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-2 text-sm">
            <div>
              <dt className="sr-only">Email</dt>
              <dd>
                <a className="font-medium text-navy underline-offset-2 hover:underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Phone</dt>
              <dd>
                <a className="text-navy underline-offset-2 hover:underline" href={`tel:${profile.phoneTel}`}>
                  {profile.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Location</dt>
              <dd className="text-mute">{profile.location}</dd>
            </div>
          </dl>

          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
            <li>
              <ExternalLink className="text-navy underline-offset-2 hover:underline" href={profile.links.linkedin}>
                LinkedIn
              </ExternalLink>
            </li>
            <li>
              <ExternalLink className="text-navy underline-offset-2 hover:underline" href={profile.links.github}>
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink className="text-navy underline-offset-2 hover:underline" href={profile.links.huggingface}>
                Hugging Face
              </ExternalLink>
            </li>
            <li>
              <ExternalLink className="text-navy underline-offset-2 hover:underline" href={profile.links.studio}>
                Studio
              </ExternalLink>
            </li>
          </ul>
        </aside>

        <div className="space-y-16 pb-8 sm:space-y-20">
          <section id="about" aria-labelledby="about-heading">
            <SectionTitle kicker="About" title="The person, not the studio" />
            <h3 id="about-heading" className="sr-only">
              About
            </h3>
            <div className="space-y-4 text-[16px] leading-relaxed text-ink/90">
              {about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section id="experience" aria-labelledby="experience-heading">
            <SectionTitle kicker="Experience" title="Where I have worked" />
            <h3 id="experience-heading" className="sr-only">
              Experience
            </h3>
            <ol className="divide-y divide-line border-y border-line">
              {experience.map((job) => (
                <li key={`${job.org}-${job.dates}`} className="grid gap-1 py-6 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-navy/65">{job.dates}</p>
                  <div>
                    <h3 className="font-semibold text-navy-ink">{job.title}</h3>
                    <p className="mt-0.5 text-sm text-navy">{job.org}</p>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-mute">
                      {job.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="work" aria-labelledby="work-heading">
            <SectionTitle kicker="Featured work" title="Public systems on GitHub" />
            <h3 id="work-heading" className="sr-only">
              Featured work
            </h3>
            <p className="mb-6 text-sm text-mute">
              Repositories under{' '}
              <ExternalLink className="font-medium text-navy underline-offset-2 hover:underline" href={profile.links.github}>
                github.com/hharsha98
              </ExternalLink>
              . Industrial thesis code is not public.
            </p>
            <ul className="grid gap-3">
              {featured.map((item) => (
                <li key={item.repo} className="rounded-xl border border-line bg-card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-navy-ink">{item.name}</h3>
                    <code className="text-[11px] text-mute">{item.repo}</code>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{item.blurb}</p>
                  <p className="mt-3 flex flex-wrap gap-4 text-sm font-medium">
                    <ExternalLink className="text-navy underline-offset-2 hover:underline" href={item.href}>
                      GitHub
                    </ExternalLink>
                    {'extra' in item && item.extra ? (
                      <ExternalLink className="text-navy underline-offset-2 hover:underline" href={item.extra.href}>
                        {item.extra.label}
                      </ExternalLink>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section id="education" aria-labelledby="education-heading">
            <SectionTitle kicker="Education" title="Degrees" />
            <h3 id="education-heading" className="sr-only">
              Education
            </h3>
            <ol className="divide-y divide-line border-y border-line">
              {education.map((ed) => (
                <li key={ed.title} className="grid gap-1 py-6 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-navy/65">{ed.dates}</p>
                  <div>
                    <h3 className="font-semibold text-navy-ink">{ed.title}</h3>
                    <p className="mt-0.5 text-sm text-navy">{ed.org}</p>
                    {ed.note ? <p className="mt-2 text-sm text-mute">{ed.note}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="publication" aria-labelledby="publication-heading">
            <SectionTitle kicker="Publication" title="Peer-reviewed paper" />
            <h3 id="publication-heading" className="sr-only">
              Publication
            </h3>
            <article className="rounded-xl border border-line bg-card p-5 sm:p-6">
              <p className="text-sm text-mute">{publication.authors} ({publication.year}).</p>
              <h3 className="serif mt-2 text-xl font-semibold leading-snug text-navy-ink">
                {publication.title}
              </h3>
              <p className="mt-2 text-sm text-mute">
                {publication.venue}, {publication.series}, {publication.pages}.
              </p>
              <p className="mt-3">
                <ExternalLink className="text-sm font-medium text-navy underline-offset-2 hover:underline" href={publication.doiUrl}>
                  doi:{publication.doi}
                </ExternalLink>
              </p>
            </article>
          </section>

          <section id="skills" aria-labelledby="skills-heading">
            <SectionTitle kicker="Skills" title="Tools I actually use" />
            <h3 id="skills-heading" className="sr-only">
              Skills
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {skills.map((group) => (
                <div key={group.group}>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/65">{group.group}</h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-card px-2.5 py-1 text-xs text-ink/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="languages" aria-labelledby="languages-heading">
            <SectionTitle kicker="Languages" title="How I work with people" />
            <h3 id="languages-heading" className="sr-only">
              Languages
            </h3>
            <ul className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <li key={lang.name} className="rounded-xl border border-line bg-card px-4 py-3">
                  <p className="font-semibold text-navy-ink">{lang.name}</p>
                  <p className="text-sm text-mute">{lang.level}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="border-t border-line bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            {profile.name} · {profile.location}
          </p>
          <p>
            Work studio:{' '}
            <ExternalLink className="font-medium text-navy underline-offset-2 hover:underline" href={profile.links.studio}>
              agentic-systems-studio.com
            </ExternalLink>
            . This page is the person.
          </p>
        </div>
      </footer>
    </div>
  )
}
