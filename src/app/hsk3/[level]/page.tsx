import { getVocabularyByLevel, isValidLevel } from '@/lib/api';
import VocabularyCard from '@/components/VocabularyCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
    params: {
        level: string;
    };
}

// Next.js static generation
export async function generateStaticParams() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => ({
        level: level.toString(),
    }));
}

export default async function Hsk3LevelPage({ params }: PageProps) {
    if (!isValidLevel('v3', params.level)) {
        notFound();
    }

    const words = await getVocabularyByLevel('v3', params.level);

    // use a generic color for level 7 since it's an advanced bundle
    const colorVar = parseInt(params.level) <= 6 ? `var(--hsk${params.level})` : '#1e293b';

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <Link href="/hsk3" style={{ color: 'var(--text-muted)', marginRight: 'auto', textDecoration: 'none', fontWeight: 500 }}>
                    ← Back to HSK 3.0 Levels
                </Link>
                <span style={{
                    background: colorVar,
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    fontWeight: 'bold'
                }}>
                    {words.length} Words
                </span>
            </div>

            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: colorVar }}>
                HSK 3.0 - Level {params.level}
            </h2>

            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>
                Click on any card to reveal and hear its pronunciation.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {words.map((word, idx) => (
                    <VocabularyCard key={word.hanzi + idx} word={word} index={idx} />
                ))}
            </div>

            {words.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem' }}>
                    No vocabulary found for this level.
                </div>
            )}
        </div>
    );
}
