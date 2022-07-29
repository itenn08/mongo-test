import {Box} from '@mui/system';
import {Delete, Edit} from '@mui/icons-material';

import {Category} from '../../../types/categories';
import CategoryItem from './CategoryItem';

type Props = {
  categories: Category[];
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (category: Category) => void;
};

const Categories = ({categories, onEditCategory, onDeleteCategory}: Props) => {
  const sortByOrder = (a: Category, b: Category) => a.order - b.order;

  return (
    <Box>
      {categories.length > 0 &&
        categories.map((categoryParent: Category) => (
          <Box
            sx={{border: '1px solid #e1e1e1', mb: '10px'}}
            key={categoryParent.id}>
            <Box
              sx={{
                background: '#fbfbfb',
                padding: '15px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Box>{categoryParent.name}</Box>
              <Box sx={{display: 'flex'}}>
                <Box
                  onClick={() => onEditCategory(categoryParent)}
                  sx={{mr: '1em'}}>
                  <Edit sx={{color: 'text.secondary', cursor: 'pointer'}} />
                </Box>
                <Box onClick={() => onDeleteCategory(categoryParent)}>
                  <Delete sx={{color: 'text.secondary', cursor: 'pointer'}} />
                </Box>
              </Box>
            </Box>
            {categoryParent?.children &&
              categoryParent?.children.length > 0 &&
              categoryParent.children
                .sort(sortByOrder)
                .map((categoryChild, i) => (
                  <CategoryItem
                    key={categoryChild.id}
                    category={categoryChild}
                    index={i}
                    onEditCategory={onEditCategory}
                    onDeleteCategory={onDeleteCategory}
                  />
                ))}
          </Box>
        ))}
    </Box>
  );
};

export default Categories;
