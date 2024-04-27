import SortField from './SortField';
import SortOrder from './SortOrder';

export default function getProducts(
  productsFromServer,
  categoriesFromServer,
  usersFromServer,
  selectedUserId,
  selectedCategoriesId,
  query,
  sortField,
  sortOrder,
) {
  let result = [...productsFromServer];

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
      case SortField.ID:
        result.sort((product1, product2) => product1.id - product2.id);
        break;
      case SortField.PRODUCT:
        result.sort((product1, product2) =>
          product1.name
            .toLowerCase()
            .localeCompare(product2.name.toLowerCase()),
        );
        break;
      case SortField.CATEGORY:
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

      case SortField.USER:
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

  if (sortOrder === SortOrder.DESC) {
    result.reverse();
  }

  return result;
}
