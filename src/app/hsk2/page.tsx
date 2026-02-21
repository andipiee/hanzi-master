import LevelSelector from '@/components/LevelSelector';

const levels = [
    { level: 1, name: 'HSK 1', color: 'var(--hsk1)', count: 150, description: 'Beginner' },
    { level: 2, name: 'HSK 2', color: 'var(--hsk2)', count: 147, description: 'Elementary' },
    { level: 3, name: 'HSK 3', color: 'var(--hsk3)', count: 298, description: 'Intermediate' },
    { level: 4, name: 'HSK 4', color: 'var(--hsk4)', count: 598, description: 'Upper Intermediate' },
    { level: 5, name: 'HSK 5', color: 'var(--hsk5)', count: 1298, description: 'Advanced' },
    { level: 6, name: 'HSK 6', color: 'var(--hsk6)', count: 2500, description: 'Proficient' },
];

export default function Hsk2Page() {
    return (
        <div>
            <h2 className="level-list-heading">HSK 2.0 Levels</h2>
            <LevelSelector levels={levels} baseRoute="hsk2" />
        </div>
    );
}
