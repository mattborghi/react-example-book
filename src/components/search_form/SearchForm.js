import { Search } from '../search/Search';

export function SearchForm({ searchTerm, onSearchInput, onSearchSubmit }) {
    return (
        <form onSubmit={onSearchSubmit} className="seach-form">
            <Search value={searchTerm} onChange={onSearchInput} isFocused />
            <button type="submit" disabled={!searchTerm} className="button button_large">Submit</button>
        </form>
    )
}