'use client';

import { useState } from 'react';
import styles from './VocabularyCard.module.css';

interface VocabularyCardProps {
    word: {
        hanzi: string;
        pinyin: string;
        translations: string[];
    };
    index: number;
}

export default function VocabularyCard({ word, index }: VocabularyCardProps) {
    const [revealed, setRevealed] = useState(false);

    const playAudio = () => {
        const utterance = new SpeechSynthesisUtterance(word.hanzi);
        utterance.lang = 'zh-CN'; // Mandarin Chinese
        window.speechSynthesis.cancel(); // Stop any currently playing audio
        window.speechSynthesis.speak(utterance);
    };

    const handleClick = () => {
        setRevealed(!revealed);
        playAudio();
    };

    return (
        <div
            className={styles.card}
            onClick={handleClick}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className={styles.hanzi}>{word.hanzi}</div>
            <div className={`${styles.pinyin} ${revealed ? styles.visible : ''}`}>
                {word.pinyin}
            </div>
            <div className={`${styles.translation} ${revealed ? styles.visible : ''}`}>
                {word.translations.join(', ')}
            </div>
            {!revealed && (
                <div className={styles.hint}>
                    Click to reveal meaning
                </div>
            )}
        </div>
    );
}
