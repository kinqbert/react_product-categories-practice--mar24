import React, { useState } from 'react';
import './App.scss';

import { Table } from './components/Table';
import { UsersFilter } from './components/UsersFilter';
import { InputField } from './components/InputField';
import { CategoriesFilter } from './components/CategoriesFilter';

// import SortField from './utils/SortField';
import SortOrder from './utils/SortOrder';
import getProducts from './utils/getProducts';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // get visible products according to current filters
  const visibleProducts = getProducts(
    productsFromServer,
    categoriesFromServer,
    usersFromServer,
    selectedUserId,
    selectedCategoriesIds,
    query,
    sortField,
    sortOrder,
  );

  const handleCategoryClick = clickedCategoryId => {
    if (selectedCategoriesIds.includes(clickedCategoryId)) {
      const indexOfClickedCategory =
        selectedCategoriesIds.indexOf(clickedCategoryId);

      setSelectedCategoriesIds([
        ...selectedCategoriesIds.slice(0, indexOfClickedCategory),
        ...selectedCategoriesIds.slice(
          indexOfClickedCategory + 1,
          selectedCategoriesIds.length,
        ),
      ]);
    } else {
      setSelectedCategoriesIds([...selectedCategoriesIds, clickedCategoryId]);
    }
  };

  const handleSortClick = newSortField => {
    if (newSortField === sortField) {
      if (sortOrder === SortOrder.ASC) {
        setSortOrder(SortOrder.DESC);
      } else if (sortOrder === SortOrder.DESC) {
        setSortField('');
        setSortOrder('');
      }
    } else {
      setSortField(newSortField);
      setSortOrder(SortOrder.ASC);
    }
  };

  const handleReset = () => {
    setSelectedUserId(0);
    setSelectedCategoriesIds([]);
    setQuery('');
    setSortField('');
    setSortOrder('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UsersFilter
              usersFromServer={usersFromServer}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
            />

            <InputField query={query} setQuery={setQuery} />

            <CategoriesFilter
              categoriesFromServer={categoriesFromServer}
              selectedCategoriesIds={selectedCategoriesIds}
              setSelectedCategoriesIds={setSelectedCategoriesIds}
              handleCategoryClick={handleCategoryClick}
            />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={handleReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length > 0 ? (
            <Table
              products={visibleProducts}
              users={usersFromServer}
              categories={categoriesFromServer}
              sortField={sortField}
              sortOrder={sortOrder}
              handleSortClick={handleSortClick}
            />
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
