import React, { useState } from 'react';
import './App.scss';

import { Table } from './components/Table';
import { UsersFilter } from './components/UsersFilter';
import { InputField } from './components/InputField';
import { CategoriesFilter } from './components/CategoriesFilter';

import SORT_FIELD from './utils/sortField';
import SORT_ORDER from './utils/sortOrder';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function getProducts(
  products,
  selectedUserId,
  selectedCategoriesId,
  query,
  sortField,
  sortOrder,
) {
  let result = [...products];

  // filtering by user
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

  // filtering by category
  if (selectedCategoriesId.length > 0) {
    result = result.filter(product =>
      selectedCategoriesId.includes(product.categoryId),
    );
  }

  // filtering by query
  if (query) {
    result = result.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD.ID:
        result.sort((product1, product2) => product1.id - product2.id);
        break;
      case SORT_FIELD.PRODUCT:
        result.sort((product1, product2) =>
          product1.name
            .toLowerCase()
            .localeCompare(product2.name.toLowerCase()),
        );
        break;
      case SORT_FIELD.CATEGORY:
        result.sort((product1, product2) => {
          const productCategory1 = categoriesFromServer
            .find(category => product1.categoryId === category.id)
            .title.toLowerCase();
          const productCategory2 = categoriesFromServer
            .find(category => product2.categoryId === category.id)
            .title.toLowerCase();

          return productCategory1.localeCompare(productCategory2);
        });
        break;

      case SORT_FIELD.USER:
        result.sort((product1, product2) => {
          const productCategory1 = categoriesFromServer.find(
            category => product1.categoryId === category.id,
          );
          const productCategory2 = categoriesFromServer.find(
            category => product2.categoryId === category.id,
          );

          const productUser1 = usersFromServer
            .find(user => user.id === productCategory1.ownerId)
            .name.toLowerCase();
          const productUser2 = usersFromServer
            .find(user => user.id === productCategory2.ownerId)
            .name.toLowerCase();

          return productUser1.localeCompare(productUser2);
        });
        break;

      default:
        break;
    }
  }

  if (sortOrder === SORT_ORDER.DESC) {
    result.reverse();
  }

  return result;
}

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // get visible products according to current filters
  const visibleProducts = getProducts(
    productsFromServer,
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
      if (sortOrder === SORT_ORDER.ASC) {
        setSortOrder(SORT_ORDER.DESC);
      } else if (sortOrder === SORT_ORDER.DESC) {
        setSortField('');
        setSortOrder('');
      }
    } else {
      setSortField(newSortField);
      setSortOrder(SORT_ORDER.ASC);
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
              // sortField={sortField}
              // sortOrder={sortOrder}
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
