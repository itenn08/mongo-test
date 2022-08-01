import {Delete, Edit} from '@mui/icons-material';
import {Box} from '@mui/system';

import {Category} from '../../../types/categories';

type Props = {
  category: Category;
  index: number;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (category: Category) => void;
};

const CategoryItem = ({
  category,
  onEditCategory,
  onDeleteCategory,
  index,
}: Props) => (
  <Box
    sx={{
      background: `${index % 2 ? '#f1f1f1' : '#c1c0c05e'}`,
      padding: '15px 20px 15px 40px',
      border: '1px solid #e3e3e35e',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    <Box>{category.name}</Box>
    <Box sx={{display: 'flex'}}>
      <Box onClick={() => onEditCategory(category)} sx={{mr: '1em'}}>
        <Edit sx={{color: 'text.secondary', cursor: 'pointer'}} />
      </Box>
      <Box onClick={() => onDeleteCategory(category)}>
        <Delete sx={{color: 'text.secondary', cursor: 'pointer'}} />
      </Box>
    </Box>
  </Box>
);

export default CategoryItem;
