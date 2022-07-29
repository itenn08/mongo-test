import {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';

import {Category} from '../../../types/categories';
import {
  useCategories,
  useQueryCategories,
} from '../../../hooks/reactQuery/userCategories';
import {InfoCard} from '../../../components/InfoCard';
import Categories from './Categories';
import CategoryEdit from './CategoryEdit';
import DeleteModal from '../../../components/DeleteModal';

export const CategoriesWidget = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialogCreation, setOpenDialogCreation] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const {data: categoriesData, isFetched} = useQueryCategories();

  const sortByPosition = (a: Category, b: Category) => a.order - b.order;

  useEffect(() => {
    if (categoriesData?.data && isFetched) {
      setCategories(categoriesData?.data.sort(sortByPosition));
    }
  }, [categoriesData, isFetched]);

  const {deleteCategory} = useCategories();

  const onDeleteCategory = async () => {
    await deleteCategory(selectedCategory?.id || '', () => {
      setOpenDialogDelete(false);
    });
  };

  const onCreateCategory = () => {
    setSelectedCategory(null);
    setOpenDialogCreation(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenDialogDelete(true);
  };

  const onEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenDialogCreation(true);
  };

  return (
    <Box>
      <InfoCard
        header={<Typography variant="subtitle1">Categories</Typography>}
        containerStyles={{flexGrow: 1}}
        headerStyles={{mt: '0.5em'}}
        handleAction={onCreateCategory}
        headerActionIcon={<Typography color="info.main">+ Add</Typography>}
        showHeaderBackground>
        <Box>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              onEditCategory={onEditCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}
        </Box>
        {openDialogCreation && (
          <CategoryEdit
            type={selectedCategory ? 'edit' : 'create'}
            category={selectedCategory}
            openDialog={openDialogCreation}
            onClose={() => setOpenDialogCreation(false)}
          />
        )}
        <DeleteModal
          open={openDialogDelete}
          onConfirm={onDeleteCategory}
          onClose={() => setOpenDialogDelete(false)}
          title="Delete category"
          content="Do you want to delete this category?"
        />
      </InfoCard>
    </Box>
  );
};
