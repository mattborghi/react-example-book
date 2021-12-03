import { Search } from '../search/Search';

export function SearchForm({ searchTerm, onSearchInput, onSearchSubmit }) {
    return (
        <form onSubmit={onSearchSubmit}>
            <Search value={searchTerm} onChange={onSearchInput} isFocused />
            <button type="submit" disabled={!searchTerm}>Submit</button>
        </form>
    )
}