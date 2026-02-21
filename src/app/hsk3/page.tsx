import LevelSelector from '@/components/LevelSelector';

const levels = [
    { level: 1, name: 'HSK 1', color: 'var(--hsk1)', count: 506, description: 'Beginner' },
    { level: 2, name: 'HSK 2', color: 'var(--hsk2)', count: 750, description: 'Elementary' },
    { level: 3, name: 'HSK 3', color: 'var(--hsk3)', count: 953, description: 'Intermediate' },
    { level: 4, name: 'HSK 4', color: 'var(--hsk4)', count: 972, description: 'Upper Intermediate' },
    { level: 5, name: 'HSK 5', color: 'var(--hsk5)', count: 1059, description: 'Advanced' },
    { level: 6, name: 'HSK 6', color: 'var(--hsk6)', count: 1123, description: 'Proficient' },
    { level: 7, name: 'HSK 7-9', color: '#1e293b', count: 5606, description: 'Mastery' },
];

export default function Hsk3Page() {
    return (
        <div>
            <h2 className="level-list-heading">HSK 3.0 Levels</h2>
            <LevelSelector levels={levels} baseRoute="hsk3" />
        </div>
    );
}
