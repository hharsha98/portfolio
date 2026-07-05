# What I learned building CareerAgent in a two-week sprint
_2026-07-05_

I built and deployed a multi-agent AI platform — RAG chat with citations, a web-research
agent, CV tailoring, evals, cost metering — on entirely free infrastructure. Here is what
actually mattered, including the parts that broke.

## Deploy on day one, not day fourteen

The skeleton was live on Hugging Face Spaces and Cloudflare Pages before it could do
anything useful. Every feature after that shipped into a working pipeline instead of a
"we'll deploy it later" pile. When the final deploy happened, there was no final deploy —
it had been deploying all along.

## No agent framework, on purpose

The three patterns that make an "agent" turned out to be about a hundred lines of plain
Python: a `while` loop around function-calling (the tool loop), JSON mode plus Pydantic
validation with one self-correction retry (structured output), and a second provider to
fall back to (resilience). I can explain every line, which was the point. Frameworks are
next — but now I know what they are abstracting.

## The fallback fired on its first day

During the very first live test of the CV-tailoring agent, Groq failed mid-run. The code
fell back to Mistral and finished the job; I only noticed because the artifact recorded a
different model name than expected. Resilience you have actually watched work is worth
more than resilience you designed.

## Evals turn "it seems fine" into a number

An LLM-as-judge suite runs real questions through the real pipeline — including a trap
question the documents cannot answer, where only *"I couldn't find that"* counts as a
pass. Scoring 6/6 matters less than being able to re-run the suite after every change and
watch for regressions. It also produces the single most useful sentence for interviews:
a number.

## Security is a feature you can point at

While analyzing similar portfolio projects, I noticed most leave their FastAPI `/docs`
page open in production — the entire API surface, public. CareerAgent disables it, pins
CORS to one origin, rate-limits by IP, and sandboxes the demo away from real data. None
of that took more than an hour. All of it comes up in conversations.

## What broke and what it taught me

A stale git lock file blocked the first ever commit (interrupted processes leave things
behind). A hand-pasted API key turned out to be the wrong key entirely (verify secrets
against the live API before debugging anything else). The mobile layout was an
afterthought until someone actually opened it on a phone (it always is — test it first).

The live demo, the code, and the numbers: this site's front page.
