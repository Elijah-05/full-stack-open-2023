const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      filter shown with{" "}
      <input name="search" value={search} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
