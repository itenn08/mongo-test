import {Box} from '@mui/system';

import {CategoryChild} from '../../../../types/categories';

type Props = {
  data: CategoryChild;
  index: number;
};

const CategoryItem = ({data, index}: Props) => (
  <Box
    sx={{
      background: `${index % 2 ? '#f1f1f1' : '#c1c0c05e'}`,
      padding: '10px 5px 10px 20px',
      border: '1px solid #e3e3e35e',
    }}>
    Child: {data.name}
  </Box>
);

export default CategoryItem;
