import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from '@retorquere/bibtex-parser';

export type PubType = 'Journal' | 'Conference' | 'Other';

export interface Publication {
  key: string;
  year: number;
  title: string;
  authors: string[];
  venue: string;
  type: PubType;
  url?: string;
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

function load(): Publication[] {
  const { entries, errors } = parse(readFileSync(BIB_PATH, 'utf8'));
  if (errors.length) {
    throw new Error(`publications.bib: ${errors.map((e) => e.error).join('; ')}`);
  }

  return entries.map((e) => {
    const f = e.fields as Record<string, any>;
    const year = parseInt(f.year, 10);
    if (!f.title || !year) throw new Error(`publications.bib: entry "${e.key}" needs a title and a year`);

    const venueField = VENUE_FIELDS.find((v) => f[v]);
    const doi = f.doi as string | undefined;

    return {
      key: e.key,
      year,
      title: String(f.title).replace(/\s+/g, ' ').trim(),
      authors: (f.author ?? []).map(formatAuthor),
      venue: venueField ? String(f[venueField]).replace(/\s+/g, ' ').trim() : '',
      type: TYPE_MAP[e.type] ?? 'Other',
      url: doi ? `https://doi.org/${doi}` : f.url,
    };
  });
}

export const publications = load().sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

export const groups: { type: PubType; label: string; items: Publication[] }[] = (
  [
    ['Journal', 'Journal papers'],
    ['Conference', 'Conference papers'],
    ['Other', 'Other'],
  ] as const
)
  .map(([type, label]) => ({ type, label, items: publications.filter((p) => p.type === type) }))
  .filter((g) => g.items.length);

// Matches both spellings of the surname so the owner is always highlighted.
export const isMe = (author: string) => /S[aá]nchez-Gallegos/.test(author.normalize('NFC'));
