import fs from 'fs';
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
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error(`Failed to load vocabulary for ${version} level ${level}:`, error);
        return [];
    }
}

export function isValidLevel(version: 'v2' | 'v3', level: string): boolean {
    if (version === 'v2') {
        return ['1', '2', '3', '4', '5', '6'].includes(level);
    } else {
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(level);
    }
}
