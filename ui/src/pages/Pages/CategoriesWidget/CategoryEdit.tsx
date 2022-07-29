import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {Category} from '../../../types/categories';
import {useCategories} from '../../../hooks/reactQuery/userCategories';
import {Dialog} from '../../../components/Dialog';
import CategoryForm from './CategoryForm';

interface Props {
  openDialog: boolean;
  category: Category | null;
  type: 'create' | 'edit';
  onClose: () => void;
}

const CategoryEdit = ({category, openDialog, type, onClose}: Props) => {
  const {createCategory, updateCategory} = useCategories();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    link: Yup.string().required('Link is required'),
    type: Yup.string().required('Type is required'),
    order: Yup.string().matches(/^[0-9]+$/, 'Order is not valid'),
  });
  console.log('category', category);
  const formik = useFormik<Category>({
    enableReinitialize: true,
    initialValues: {
      id: category?.id || '',
      name: category?.name || '',
      link: category?.link || '',
      parent_id: category?.parent_id || '',
      order: category?.order || 1,
      type: category?.type || '',
    },
    validationSchema,
    onSubmit: () => {
      if (type === 'create') {
        createCategory(formik.values, () => {
          formik.resetForm();
          onClose();
        });
      } else {
        updateCategory(formik.values, category?.id!, () => {
          formik.resetForm();
          onClose();
        });
      }
    },
    validateOnMount: true,
  });

  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  useEffect(() => {
    formik.validateForm();

    return () => {};
  }, [category]);

  return (
    <Dialog
      title={
        type === 'create' ? 'Creating a new category' : 'Editing the category'
      }
      onCancel={handleClose}
      onSave={formik.submitForm}
      disableSaveBtn={!!Object.keys(formik.errors).length}
      dialogProps={{
        maxWidth: 'md',
        open: openDialog || false,
      }}>
      <CategoryForm formik={formik} />
    </Dialog>
  );
};

export default CategoryEdit;
