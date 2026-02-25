'use client';

import { useState, memo } from 'react';
import styles from './VocabularyCard.module.css';

interface VocabularyCardProps {
    word: {
        hanzi: string;
        pinyin: string;
        translations: string[];
    };
    index: number;
}

function VocabularyCard({ word, index }: VocabularyCardProps) {
    const [revealed, setRevealed] = useState(false);

    const playAudio = () => {
        const utterance = new SpeechSynthesisUtterance(word.hanzi);
        utterance.lang = 'zh-CN';
        window.speechSynthesis.cancel();
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
            style={{ '--delay-index': index } as React.CSSProperties}
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

export default memo(VocabularyCard);
