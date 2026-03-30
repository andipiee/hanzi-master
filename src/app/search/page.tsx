import { getAllVocabulary } from '@/lib/api';
import SearchClient from '@/components/SearchClient';

export default async function SearchPage() {
    const allWords = await getAllVocabulary();

    return (
        <div>
            <h2 className="level-list-heading">Search Vocabulary</h2>
            <SearchClient allWords={allWords} />
        </div>
    );
}
