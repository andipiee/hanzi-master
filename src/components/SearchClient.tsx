'use client';

import { useState, useMemo } from 'react';
import VocabularyCard from './VocabularyCard';
import styles from './SearchClient.module.css';

interface WordWithSource {
    hanzi: string;
    pinyin: string;
    translations: string[];
    hskVersion: string;
    level: string;
}

type SearchMode = 'hanzi' | 'pinyin' | 'meaning';

function stripTones(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const placeholders: Record<SearchMode, string> = {
    hanzi: 'Search by hanzi, e.g. 你好',
    pinyin: 'Search by pinyin, e.g. nǐ hǎo',
    meaning: 'Search by meaning, e.g. hello',
};

export default function SearchClient({ allWords }: { allWords: WordWithSource[] }) {
    const [query, setQuery] = useState('');
    const [mode, setMode] = useState<SearchMode>('hanzi');

    const results = useMemo(() => {
        const trimmed = query.trim();
        if (!trimmed) return [];

        const lower = trimmed.toLowerCase();
        const toneless = stripTones(trimmed);

        return allWords.filter((word) => {
            switch (mode) {
                case 'hanzi':
                    return word.hanzi.includes(trimmed);
                case 'pinyin':
                    return stripTones(word.pinyin).includes(toneless);
                case 'meaning':
                    return word.translations.some((t) => t.toLowerCase().includes(lower));
            }
        });
    }, [query, allWords, mode]);

    return (
        <div>
            <div className={styles.searchBox}>
                <div className={styles.modeToggle}>
                    {(['hanzi', 'pinyin', 'meaning'] as const).map((m) => (
                        <button
                            key={m}
                            className={`${styles.modeButton} ${mode === m ? styles.modeActive : ''}`}
                            onClick={() => setMode(m)}
                        >
                            {m === 'hanzi' ? '汉字 Hanzi' : m === 'pinyin' ? '拼音 Pinyin' : '意思 Meaning'}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    className={styles.input}
                    placeholder={placeholders[mode]}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
            </div>

            {query.trim() && (
                <p className={styles.resultCount}>
                    {results.length} result{results.length !== 1 ? 's' : ''} found
                </p>
            )}

            <div className="vocabulary-grid">
                {results.map((word, idx) => (
                    <div key={`${word.hskVersion}-${word.level}-${word.hanzi}-${idx}`} className={styles.cardWrapper}>
                        <span className={styles.badge}>
                            {word.hskVersion} Lv.{word.level}
                        </span>
                        <VocabularyCard word={word} index={idx} />
                    </div>
                ))}
            </div>

            {!query.trim() && (
                <p className={styles.hint}>
                    Search across all HSK 2.0 and HSK 3.0 vocabulary.
                </p>
            )}
        </div>
    );
}
