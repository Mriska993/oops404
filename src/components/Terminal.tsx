import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { SITE } from '../data/site';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Line = { kind: 'in' | 'out' | 'ok' | 'err'; text: string };

const BANNER: Line[] = [
  { kind: 'ok', text: 'oops404 shell v4.0.4 — conectat.' },
  { kind: 'out', text: 'scrie `help` ca să vezi ce poți face. `exit` ca să pleci.' },
];

const HELP = [
  'help        — lista asta',
  'whoami      — cine suntem',
  'work        — proiectele din portofoliu',
  'stack       — cu ce lucrăm',
  'pricing     — de la cât pornim',
  'contact     — cum ne găsești',
  'joke        — un banc de programator (scuze)',
  'sudo        — nu.',
  '404         — ?',
  'clear       — curăță ecranul',
  'exit        — închide terminalul',
];

const JOKES = [
  'De ce nu se ceartă developerii pe dark mode? Pentru că lumina i-ar arăta cum arată bug-urile.',
  'Merge perfect pe laptopul meu. Îl livrăm pe el atunci.',
  'Un QA intră într-un bar. Comandă 1 bere. 0 beri. 999999 beri. O bere de tip șopârlă. -1 bere.',
  '99 de bug-uri mici în cod. Repari unul, compilezi din nou... 127 de bug-uri mici în cod.',
];

export const TerminalModal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 60);
  }, [isOpen]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const push = (...l: Line[]) => setLines((prev) => [...prev, ...l]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    push({ kind: 'in', text: raw });

    switch (cmd) {
      case '':
        break;
      case 'help':
        push(...HELP.map((text) => ({ kind: 'out' as const, text })));
        break;
      case 'whoami':
        push(
          { kind: 'ok', text: 'Oops404 — doi developeri, zero intermediari.' },
          { kind: 'out', text: 'Construim site-uri de prezentare, aplicații web și magazine online.' },
          { kind: 'out', text: `Motto: "${SITE.slogan}"` }
        );
        break;
      case 'work':
        push(
          ...PROJECTS_DATA.map((p) => ({
            kind: 'out' as const,
            text: `${p.status === 'live' ? '●' : '○'} ${p.title.padEnd(22)} ${p.categoryLabel}`,
          })),
          { kind: 'ok', text: `${PROJECTS_DATA.length} proiecte. Scroll pe pagină pentru detalii.` }
        );
        break;
      case 'stack':
        push(
          { kind: 'out', text: 'front  : React · TypeScript · Tailwind · Next.js · Motion' },
          { kind: 'out', text: 'back   : Node.js · PostgreSQL · Supabase · Prisma' },
          { kind: 'out', text: 'infra  : Docker · Vercel · Cloudflare · Linux' },
          { kind: 'out', text: 'design : Figma · prea mult timp pe kerning' }
        );
        break;
      case 'pricing':
        push(
          { kind: 'out', text: 'site prezentare  : de la  600 €  (~1.5 săpt)' },
          { kind: 'out', text: 'magazin online   : de la 1000 €  (~2.5 săpt)' },
          { kind: 'out', text: 'aplicație / SaaS : de la 1400 €  (~3.5 săpt)' },
          { kind: 'ok', text: 'calculator complet: secțiunea „Buget" de pe pagină.' }
        );
        break;
      case 'contact':
        push(
          { kind: 'out', text: `email    : ${SITE.email}` },
          ...SITE.phones.map((p) => ({ kind: 'out' as const, text: `telefon  : ${p.display}` })),
          { kind: 'ok', text: 'răspundem în maximum 24h.' }
        );
        break;
      case 'joke':
        push({ kind: 'out', text: JOKES[Math.floor(Math.random() * JOKES.length)] });
        break;
      case 'sudo':
      case 'sudo su':
      case 'sudo rm -rf /':
        push({ kind: 'err', text: 'Frumoasă încercare. Nici noi nu avem sudo aici.' });
        break;
      case '404':
        push(
          { kind: 'err', text: '404 — resursa nu a fost găsită.' },
          { kind: 'ok', text: '...dar cumva tot funcționează. Ăsta e tot brandul, de fapt.' }
        );
        break;
      case 'clear':
        setLines([]);
        return;
      case 'exit':
      case 'quit':
        push({ kind: 'ok', text: 'pa!' });
        setTimeout(onClose, 320);
        break;
      default:
        push({
          kind: 'err',
          text: `comanda "${cmd}" nu există. încearcă \`help\`.`,
        });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    if (input.trim()) setHistory((h) => [input, ...h]);
    setHIdx(-1);
    setInput('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      if (next >= 0) {
        setHIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = hIdx - 1;
      setHIdx(next);
      setInput(next >= 0 ? history[next] : '');
    }
  };

  if (!isOpen) return null;

  const color: Record<Line['kind'], string> = {
    in: 'text-white',
    out: 'text-muted',
    ok: 'text-white',
    err: 'text-ember-soft/80',
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Terminal Oops404"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-[min(72vh,560px)] w-full max-w-2xl flex-col overflow-hidden rounded-none border border-line bg-[#0A0A0D] shadow-[0_30px_120px_-30px_rgba(255,255,255,0.15)]"
      >
        {/* bara de titlu */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/45" />
          <span className="size-2.5 rounded-full bg-white/70" />
          <span className="ml-2 font-mono text-[11px] text-muted">oops404 — zsh</span>
          <button
            onClick={onClose}
            className="ml-auto text-muted transition-colors hover:text-white"
            aria-label="Închide terminalul"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* corp */}
        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          className="flex-1 cursor-text space-y-1 overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed"
        >
          {lines.map((l, i) => (
            <div key={i} className={`whitespace-pre-wrap break-words ${color[l.kind]}`}>
              {l.kind === 'in' && <span className="text-ember">➜ </span>}
              {l.text}
            </div>
          ))}

          <form onSubmit={onSubmit} className="flex items-center gap-2 pt-1">
            <span className="text-ember">➜</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent font-mono text-[12.5px] text-white outline-none placeholder:text-white/20"
              placeholder="scrie o comandă..."
              aria-label="Comandă"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
