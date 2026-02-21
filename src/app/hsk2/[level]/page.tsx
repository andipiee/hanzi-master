import { getVocabularyByLevel, isValidLevel } from '@/lib/api';
import VocabularyCard from '@/components/VocabularyCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
    params: {
        level: string;
    };
}

// Updated: Now includes levels 8 and 9
export async function generateStaticParams() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => ({
        level: level.toString(),
    }));
}

export default async function Hsk2LevelPage({ params }: PageProps) {
    if (!isValidLevel('v2', params.level)) {
        notFound();
    }

    const words = await getVocabularyByLevel('v2', params.level);

    const colorVar = `var(--hsk${params.level})`;

    return (
        <div>
            <div className="level-page-nav">
                <Link href="/hsk2" className="level-page-back-link">
                    ← Back to HSK 2.0 Levels
                </Link>
                <span className="level-page-badge" style={{ background: colorVar }}>
                    {words.length} Words
                </span>
            </div>

            <h2 className="level-page-heading" style={{ color: colorVar }}>
                HSK 2.0 - Level {params.level}
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