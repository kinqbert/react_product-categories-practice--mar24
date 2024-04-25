import React, { useState } from 'react';
import './App.scss';

import { Table } from './components/Table';
import { UsersFilter } from './components/UsersFilter';
import { InputField } from './components/InputField';
import { CategoriesFilter } from './components/CategoriesFilter';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function getProducts(products, selectedUserId, selectedCategoriesId, query) {
  let result = [...products];

  if (selectedUserId) {
    result = result.filter(product => {
      const productCategory = categoriesFromServer.find(
        category => product.categoryId === category.id,
      );
      const productUser = usersFromServer.find(
        user => user.id === productCategory.ownerId,
      );

      return productUser.id === selectedUserId;
    });
  }

  if (selectedCategoriesId.length > 0) {
    result = result.filter(product =>
      selectedCategoriesId.includes(product.categoryId),
    );
  }

  if (query) {
    result = result.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return result;
}

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [query, setQuery] = useState('');

  // get visible products according to current filters
  const visibleProducts = getProducts(
    productsFromServer,
    selectedUserId,
    selectedCategoriesIds,
    query,
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

  const handleReset = () => {
    setSelectedUserId(0);
    setSelectedCategoriesIds([]);
    setQuery('');
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
              setSelectedCategoriesIds={selectedCategoriesIds}
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
