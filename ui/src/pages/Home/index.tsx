import {Grid} from '@mui/material';

import {TabContentContainer} from '../../components/TabContentContainer';
import {useQueryPages} from '../../hooks/reactQuery/usePages';
import {useQueryProducts} from '../../hooks/reactQuery/useProducts';
import {useQueryCategories} from '../../hooks/reactQuery/userCategories';
import {useQueryUsers} from '../../hooks/reactQuery/useUsers';
import {Page} from '../../types/misc';
import {Product} from '../../types/products';
import {User} from '../../types/users';
import {createEmptyResource} from '../../utils/paging';
import {PagesWidget} from './PagesGraphic';

const HomePage = () => {
  const {
    data: pagesResource = createEmptyResource<Page>(10000),
    isLoading: isLoadingPages,
  } = useQueryPages(
    {
      pageIndex: 0,
      pageSize: 10000,
      query: '',
    },
    {keepPreviousData: true},
  );

  const {
    data: userResource = createEmptyResource<User>(10000),
    isLoading: isLoadingUsers,
  } = useQueryUsers(
    {
      pageIndex: 0,
      pageSize: 10000,
      query: '',
    },
    {keepPreviousData: true},
  );

  const {
    data: productsResource = createEmptyResource<Product>(10000),
    isLoading: isLoadingProducts,
  } = useQueryProducts(
    {
      pageIndex: 0,
      pageSize: 10000,
      query: '',
    },
    {keepPreviousData: true},
  );

  const {data: categoriesData, isLoading: isLoadingCategories} =
    useQueryCategories();

  return (
    <TabContentContainer>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={4}>
          <PagesWidget
            pages={pagesResource.total || 0}
            categories={categoriesData?.total || 0}
            users={userResource.total || 0}
            products={productsResource.total || 0}
            loading={
              isLoadingPages ||
              isLoadingCategories ||
              isLoadingUsers ||
              isLoadingProducts
            }
          />
        </Grid>
      </Grid>
    </TabContentContainer>
  );
};

export default HomePage;
