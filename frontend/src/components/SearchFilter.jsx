export default function SearchFilter({ search, setSearch, category, setCategory, minPrice, setMinPrice, maxPrice, setMaxPrice }) {
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    margin: "1rem 0"
  };

  const inputStyle = {
    border: "1px solid #ccc",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.25rem",
    width: "12rem"
  };

  const selectStyle = {
    border: "1px solid #ccc",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.25rem",
    width: "12rem"
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        placeholder="Search sweets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={inputStyle}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={selectStyle}
      >
        <option value="">All Categories</option>
        <option value="Indian">Indian</option>
        <option value="Foreign">Foreign</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}
