/* eslint-disable jsx-a11y/accessible-emoji */

import SORT_FIELD from '../../utils/sortField';

export const Table = ({ products, users, categories, handleSortClick }) => (
  <table
    data-cy="ProductTable"
    className="table is-striped is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            ID
            <a href="#/" onClick={() => handleSortClick(SORT_FIELD.ID)}>
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Product
            <a href="#/" onClick={() => handleSortClick(SORT_FIELD.PRODUCT)}>
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Category
            <a href="#/" onClick={() => handleSortClick(SORT_FIELD.CATEGORY)}>
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            User
            <a href="#/" onClick={() => handleSortClick(SORT_FIELD.USER)}>
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>
      </tr>
    </thead>

    <tbody>
      {products.map(product => {
        const productCategory = categories.find(
          category => product.categoryId === category.id,
        );
        const productUser = users.find(
          user => user.id === productCategory.ownerId,
        );

        return (
          <tr data-cy="Product" key={product.id}>
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>

            <td data-cy="ProductName">{product.name}</td>
            <td data-cy="ProductCategory">{`${productCategory.icon} - ${productCategory.title}`}</td>

            <td
              data-cy="ProductUser"
              className={
                productUser.sex === 'm' ? 'has-text-link' : 'has-text-danger'
              }
            >
              {productUser.name}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
