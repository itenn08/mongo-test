import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import EditUserForm from './EditPageForm';
import {Dialog} from '../../../components/Dialog';
import {Page, PageUpdateForm} from '../../../types/pages';
import {usePages} from '../../../hooks/reactQuery/usePages';

interface Props {
  page: Page;
  openDialog: boolean;
  onClose: () => void;
}

const PageEdit = ({page, openDialog, onClose}: Props) => {
  const {updatePage} = usePages();

  const validationSchema = Yup.object().shape({
    title: Yup.string().nullable().required('First name is required'),
    url: Yup.string().nullable().required('Last name is required'),
  });

  const formik = useFormik<PageUpdateForm>({
    enableReinitialize: true,

    initialValues: {
      title: page.title,
      url: page.url,
      content: page.content,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      date: page.date,
      isActive: page.isActive,
    },
    validationSchema,
    onSubmit: () => {
      const body: PageUpdateForm = {
        title: formik.values.title || '',
        url: formik.values.url || '',
        content: formik.values.content || '',
        seoTitle: formik.values.seoTitle || '',
        seoDescription: formik.values.seoDescription || '',
        date: formik.values.date || new Date(),
        isActive: formik.values.isActive,
      };

      updatePage(body, page.id, () => {
        formik.resetForm();
        onClose();
      });
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
  }, [page]);

  return (
    <Dialog
      title="Edit Page Information"
      onCancel={handleClose}
      onSave={formik.submitForm}
      disableSaveBtn={!!Object.keys(formik.errors).length}
      dialogProps={{
        maxWidth: 'md',
        open: openDialog || false,
      }}>
      <EditUserForm formik={formik} />
    </Dialog>
  );
};

export default PageEdit;
