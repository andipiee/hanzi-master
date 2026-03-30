import fs from 'fs/promises';
import path from 'path';

export interface Word {
    hanzi: string;
    pinyin: string;
    translations: string[];
}

export async function getVocabularyByLevel(version: 'v2' | 'v3', level: string): Promise<Word[]> {
    const filePrefix = version === 'v2' ? 'hsk2' : 'hsk3';
    const filePath = path.join(process.cwd(), `src/lib/data/${filePrefix}-${level}.json`);
    try {
        const fileContents = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error(`Failed to load vocabulary for ${version} level ${level}:`, error);
        return [];
    }
}

export interface WordWithSource extends Word {
    hskVersion: string;
    level: string;
}

export async function getAllVocabulary(): Promise<WordWithSource[]> {
    const allWords: WordWithSource[] = [];

    const versions: { version: 'v2' | 'v3'; levels: string[]; label: string }[] = [
        { version: 'v2', levels: ['1', '2', '3', '4', '5', '6'], label: 'HSK 2.0' },
        { version: 'v3', levels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], label: 'HSK 3.0' },
    ];

    for (const { version, levels, label } of versions) {
        for (const level of levels) {
            const words = await getVocabularyByLevel(version, level);
            for (const word of words) {
                allWords.push({ ...word, hskVersion: label, level });
            }
        }
    }

    return allWords;
}

export function isValidLevel(version: 'v2' | 'v3', level: string): boolean {
    const validLevels = version === 'v2' 
        ? ['1', '2', '3', '4', '5', '6']
        : ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return validLevels.includes(level);
}
