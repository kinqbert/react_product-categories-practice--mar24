export const CategoriesFilter = ({
  categoriesFromServer,
  selectedCategoriesIds,
  setSelectedCategoriesIds,
  handleCategoryClick,
}) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      href="#/"
      data-cy="AllCategories"
      className={`button is-success mr-6 ${selectedCategoriesIds.length === 0 ? '' : 'is-outlined'}`}
      onClick={() => setSelectedCategoriesIds([])}
    >
      All
    </a>

    {categoriesFromServer.map(category => (
      <a
        data-cy="Category"
        className={`button mr-2 my-1 ${selectedCategoriesIds.includes(category.id) ? 'is-info' : ''}`}
        href="#/"
        onClick={() => handleCategoryClick(category.id)}
        key={category.id}
      >
        {category.title}
      </a>
    ))}
  </div>
);
