import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from '@retorquere/bibtex-parser';

export type PubType = 'Journal' | 'Conference' | 'Other';

export interface Publication {
  key: string;
  year: number | null;
  title: string;
  authors: string[];
  venue: string;
  type: PubType;
  url?: string;
  bibtex: string;
  citation: string;
}

const BIB_PATH = join(process.cwd(), 'public', 'publications.bib');

const TYPE_MAP: Record<string, PubType> = {
  article: 'Journal',
  inproceedings: 'Conference',
  conference: 'Conference',
  proceedings: 'Conference',
};

const VENUE_FIELDS = ['journal', 'booktitle', 'publisher', 'howpublished', 'school', 'institution'];

const initials = (given = '') =>
  given
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((n) => `${n[0].toUpperCase()}.`)
    .join(' ');

function formatAuthor(a: { lastName?: string; firstName?: string; name?: string }) {
  if (a.name) return a.name.normalize('NFC');
  const given = initials(a.firstName);
  return (given ? `${a.lastName}, ${given}` : `${a.lastName}`).normalize('NFC');
}

// Raw source of each entry, keyed by citation key, so "Cite" can show the original BibTeX.
function rawEntries(text: string): Map<string, string> {
  const raw = new Map<string, string>();
  for (const chunk of text.split(/^(?=@\w+\s*\{)/m)) {
    const key = chunk.match(/^@\w+\s*\{\s*([^,\s]+)/)?.[1];
    if (key) raw.set(key, chunk.trim());
  }
  return raw;
}

function load(): Publication[] {
  const source = readFileSync(BIB_PATH, 'utf8');
  const raw = rawEntries(source);
  const { entries, errors } = parse(source);
  if (errors.length) {
    throw new Error(`publications.bib: ${errors.map((e) => e.error).join('; ')}`);
  }

  return entries.map((e) => {
    const f = e.fields as Record<string, any>;
    const year = parseInt(f.year, 10) || null;
    if (!f.title) throw new Error(`publications.bib: entry "${e.key}" needs a title`);
    if (!year) console.warn(`publications.bib: entry "${e.key}" has no year; shown as "n.d."`);

    const venueField = VENUE_FIELDS.find((v) => f[v]);
    const doi = f.doi as string | undefined;

    const title = String(f.title).replace(/\s+/g, ' ').trim();
    const authors: string[] = (f.author ?? []).map(formatAuthor);
    const venue = venueField ? String(f[venueField]).replace(/\s+/g, ' ').trim() : '';

    return {
      key: e.key,
      year,
      title,
      authors,
      venue,
      type: TYPE_MAP[e.type] ?? 'Other',
      url: doi ? `https://doi.org/${doi}` : f.url,
      bibtex: raw.get(e.key) ?? '',
      citation: `${authors.join(', ')} (${year ?? 'n.d.'}). ${title}.${venue ? ` ${venue}.` : ''}`,
    };
  });
}

export const publications = load().sort((a, b) => (b.year ?? 9999) - (a.year ?? 9999) || a.title.localeCompare(b.title));

export const groups: { type: PubType; label: string; items: Publication[] }[] = (
  [
    ['Journal', 'Journal papers'],
    ['Conference', 'Conference papers'],
    ['Other', 'Other'],
  ] as const
)
  .map(([type, label]) => ({ type, label, items: publications.filter((p) => p.type === type) }))
  .filter((g) => g.items.length);

// Matches the surname spellings (accent, hyphen) with initial D so only the owner is highlighted.
export const isMe = (author: string) => /S[aá]nchez[- ]Gallegos, D/.test(author.normalize('NFC'));
