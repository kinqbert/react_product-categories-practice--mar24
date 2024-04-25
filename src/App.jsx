import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import { Table } from './components/Table/Table';

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
    result = result.filter(product => product.name.includes(query));
  }

  return result;
}

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [query, setQuery] = useState('');

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

  const resetFilters = () => {
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

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => setSelectedUserId(0)}
                className={cn({
                  'is-active': selectedUserId === 0,
                })}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterAllUsers"
                  href="#/"
                  onClick={() => setSelectedUserId(user.id)}
                  key={user.id}
                  className={cn({
                    'is-active': selectedUserId === user.id,
                  })}
                >
                  {user.name}
                </a>
              ))}
            </p>

            {/* <a data-cy="FilterUser" href="#/" className="is-active">
              User 2
            </a> */}

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

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

              {/* <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a> */}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
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
