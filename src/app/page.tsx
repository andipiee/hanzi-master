import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.grid}>
      <Link href="/hsk2" className="home-card-link">
        <div className={styles.card}>
          <h2 className="home-card-title">HSK 2.0</h2>
          <p className="home-card-description">The classic 6-level Mandarin proficiency test standard. (Levels 1-6)</p>
        </div>
      </Link>

      <Link href="/hsk3" className="home-card-link">
        <div className={styles.card}>
          <h2 className="home-card-title">HSK 3.0</h2>
          <p className="home-card-description">The new comprehensive 9-level Mandarin proficiency standard. (Levels 1-9)</p>
        </div>
      </Link>
    </div>
  );
}