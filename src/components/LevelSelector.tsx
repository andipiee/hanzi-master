import Link from 'next/link';
import styles from './LevelSelector.module.css';

interface Level {
    level: number;
    name: string;
    color: string;
    count: number;
    description: string;
}

interface LevelSelectorProps {
    levels: Level[];
    baseRoute: string;
}

export default function LevelSelector({ levels, baseRoute }: LevelSelectorProps) {
    return (
        <div className={styles.grid}>
            {levels.map((l, index) => (
                <Link href={`/${baseRoute}/${l.level}`} key={l.level} className={styles.card} style={{ '--theme-color': l.color, animationDelay: `${index * 60}ms` } as React.CSSProperties}>
                    <div className={styles.cardInner}>
                        <h2 className={styles.levelName}>{l.name}</h2>
                        <p className={styles.description}>{l.description}</p>
                        <div className={styles.bottomBar}>
                            <span className={styles.wordCount}>{l.count} words</span>
                            <span className={styles.arrow}>→</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
