'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname() || '/';
    const onHsk2 = pathname === '/hsk2' || pathname.startsWith('/hsk2/');
    const onHsk3 = pathname === '/hsk3' || pathname.startsWith('/hsk3/');
    const onSearch = pathname === '/search' || pathname.startsWith('/search/');

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.hanzi}>中文</span> Hanzi Master
                </Link>
                <div className={styles.links}>
                    {!onSearch && <Link href="/search" className={styles.link}>Search</Link>}
                    {!onHsk2 && <Link href="/hsk2" className={styles.link}>HSK 2.0</Link>}
                    {!onHsk3 && <Link href="/hsk3" className={styles.link}>HSK 3.0</Link>}
                </div>
            </div>
        </nav>
    );
}
