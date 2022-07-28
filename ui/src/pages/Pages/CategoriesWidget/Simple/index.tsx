/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {Button} from '@mui/material';
import {Box} from '@mui/system';

import {Category, CategoryChild} from '../../../../types/categories';
import CategoryItem from './CategoryItem';

type Props = {
  categories: Category[];
  onUpdateCategories: (items: Category[]) => void;
};

const CategoriesWidgetNew = ({categories, onUpdateCategories}: Props) => {
  const [sortedCategories, setSortedCategories] = useState<Category[]>([]);
  const sortByOrder = (a: CategoryChild, b: CategoryChild) => a.order - b.order;

  useEffect(() => {
    setSortedCategories(categories.sort(sortByOrder));
  }, []);

  return (
    <Box>
      {sortedCategories.length > 0 &&
        sortedCategories.map((categoryParent: Category, index) => (
          <Box sx={{border: '1px solid #e1e1e1'}} key={categoryParent.id}>
            <Box sx={{background: '#fbfbfb', padding: '10px 5px'}}>
              Parent: {categoryParent.name}
            </Box>
            {categoryParent.children.length > 0 &&
              categoryParent.children
                .sort(sortByOrder)
                .map((categoryChild, i) => (
                  <CategoryItem data={categoryChild} index={i} />
                ))}
          </Box>
        ))}
      <Button
        onClick={() => onUpdateCategories(sortedCategories)}
        variant="contained">
        Save
      </Button>
    </Box>
  );
};

export default CategoriesWidgetNew;
