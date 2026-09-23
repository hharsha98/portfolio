# Agent OS is Download / local

Agent OS is a single-machine local app, in the same class as Agent Grid and Vibespace. Hermes and OpenClaw seats, skills, memory on disk, the scheduler, and optional shell or exec only make sense when the process and the files live on one machine.

- Catalog status is **Download / local** (`status: 'download'`), not Live.
- Primary CTA: clone and run locally from [github.com/hharsha98/agent-os](https://github.com/hharsha98/agent-os) on `127.0.0.1:8090`.
- An optional private self-host for the owner can keep that same loopback port. This is not a hosted multi-tenant SaaS.
- The public Contabo Live demo is retired. Do not re-add a public sslip URL or a public Caddy route.
- [hharsha98.github.io/agent-os](https://hharsha98.github.io/agent-os/) remains a static gallery only.
- AgentOps Studio stays Live. Agent Fleet and the other Contabo labs stay as they are.
- `os.agentic-systems-studio.com` stays a planned name in copy. Do not attach it in Cloudflare DNS from this repo.
