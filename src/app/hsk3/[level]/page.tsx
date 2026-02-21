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
            <div className="level-page-nav">
                <Link href="/hsk3" className="level-page-back-link">
                    ← Back to HSK 3.0 Levels
                </Link>
                <span className="level-page-badge" style={{ background: colorVar }}>
                    {words.length} Words
                </span>
            </div>

            <h2 className="level-page-heading" style={{ color: colorVar }}>
                HSK 3.0 - Level {params.level}
            </h2>

            <p className="level-page-description">
                Click on any card to reveal and hear its pronunciation.
            </p>

            <div className="vocabulary-grid">
                {words.map((word, idx) => (
                    <VocabularyCard key={word.hanzi + idx} word={word} index={idx} />
                ))}
            </div>

            {words.length === 0 && (
                <div className="level-page-empty">
                    No vocabulary found for this level.
                </div>
            )}
        </div>
    );
}
