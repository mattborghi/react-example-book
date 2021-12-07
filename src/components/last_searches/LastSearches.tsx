type LastSearchesProps = {
  lastSearches: string[];
  onLastSearch: (searchTerm: string) => void;
};

export function LastSearches({
  lastSearches,
  onLastSearch,
}: LastSearchesProps) {
  return (
    <>
      {lastSearches.map((searchTerm, index) => (
        <button
          key={searchTerm + index}
          type="button"
          onClick={() => onLastSearch(searchTerm)}
        >
          {searchTerm}
        </button>
      ))}
    </>
  );
}
