import { Search } from "../search/Search";

type SearchFormProps = {
  searchTerm: string;
//   React.SyntheticEvent could be using instead of React.FormEvent or React.ChangeEvent
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function SearchForm({ searchTerm, onSearchInput, onSearchSubmit } : SearchFormProps) {
  return (
    <form onSubmit={onSearchSubmit} className="seach-form">
      <Search value={searchTerm} onChange={onSearchInput} isFocused />
      <button
        type="submit"
        disabled={!searchTerm}
        className="button button_large"
      >
        Submit
      </button>
    </form>
  );
}
