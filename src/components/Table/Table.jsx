/* eslint-disable jsx-a11y/accessible-emoji */
import cn from 'classnames';

import SortField from '../../utils/SortField';
import SortOrder from '../../utils/SortOrder';

export const Table = ({
  products,
  users,
  categories,
  sortField,
  sortOrder,
  handleSortClick,
}) => (
  <table
    data-cy="ProductTable"
    className="table is-striped is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            ID
            <a href="#/" onClick={() => handleSortClick(SortField.ID)}>
              <span className="icon">
                <i
                  data-cy="SortIcon"
                  className={cn({
                    fas: true,
                    'fa-sort': sortField !== SortField.ID,
                    'fa-sort-up':
                      sortField === SortField.ID && sortOrder === SortOrder.ASC,
                    'fa-sort-down':
                      sortField === SortField.ID &&
                      sortOrder === SortOrder.DESC,
                  })}
                />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Product
            <a href="#/" onClick={() => handleSortClick(SortField.PRODUCT)}>
              <span className="icon">
                <i
                  data-cy="SortIcon"
                  className={cn({
                    fas: true,
                    'fa-sort': sortField !== SortField.PRODUCT,
                    'fa-sort-up':
                      sortField === SortField.PRODUCT &&
                      sortOrder === SortOrder.ASC,
                    'fa-sort-down':
                      sortField === SortField.PRODUCT &&
                      sortOrder === SortOrder.DESC,
                  })}
                />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Category
            <a href="#/" onClick={() => handleSortClick(SortField.CATEGORY)}>
              <span className="icon">
                <i
                  data-cy="SortIcon"
                  className={cn({
                    fas: true,
                    'fa-sort': sortField !== SortField.CATEGORY,
                    'fa-sort-up':
                      sortField === SortField.CATEGORY &&
                      sortOrder === SortOrder.ASC,
                    'fa-sort-down':
                      sortField === SortField.CATEGORY &&
                      sortOrder === SortOrder.DESC,
                  })}
                />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            User
            <a href="#/" onClick={() => handleSortClick(SortField.USER)}>
              <span className="icon">
                <i
                  data-cy="SortIcon"
                  className={cn({
                    fas: true,
                    'fa-sort': sortField !== SortField.USER,
                    'fa-sort-up':
                      sortField === SortField.USER &&
                      sortOrder === SortOrder.ASC,
                    'fa-sort-down':
                      sortField === SortField.USER &&
                      sortOrder === SortOrder.DESC,
                  })}
                />
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
