import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {Dialog} from '../../../components/Dialog';
import {Product, ProductUpdateForm} from '../../../types/products';
import {useProducts} from '../../../hooks/reactQuery/useProducts';
import EditProductForm from './EditProductForm';
import {useFile} from '../../../hooks/reactQuery/useFile';

interface Props {
  product: Product;
  openDialog: boolean;
  onClose: () => void;
}

const ProductEdit = ({product, openDialog, onClose}: Props) => {
  const {updateProduct} = useProducts();
  const {uploadFile} = useFile();

  const validationSchema = Yup.object().shape({
    name: Yup.string().nullable().required('Name is required'),
    url: Yup.string().nullable().required('Url is required'),
    currency: Yup.string().nullable().required('Currency is required'),
  });

  const formik = useFormik<ProductUpdateForm>({
    enableReinitialize: true,

    initialValues: {
      name: product.name,
      url: product.url,
      text: product.text,
      seoTitle: product.seoTitle,
      seoDescription: product.seoDescription,
      photoUrl: product.photoUrl,
      price: product.price,
      currency: product.currency,
      quantity: product.quantity,
      isActive: product.isActive,
      category: product.category?.id || null,
    },

    validationSchema,
    onSubmit: async () => {
      let uploadedFile;
      if (formik.values.image) {
        uploadedFile = await uploadFile(formik.values.image, 'products');
      }

      const body: ProductUpdateForm = {
        name: formik.values.name || '',
        url: formik.values.url || '',
        text: formik.values.text || '',
        seoTitle: formik.values.seoTitle || '',
        seoDescription: formik.values.seoDescription || '',
        photoUrl: uploadedFile || product.photoUrl,
        price: formik.values.price || null,
        currency: formik.values.currency || '',
        quantity: formik.values.quantity || '',
        isActive: formik.values.isActive,
        category: formik.values.category || null,
      };

      updateProduct(body, product.id, () => {
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
  }, [product]);

  return (
    <Dialog
      title="Edit Product Information"
      onCancel={handleClose}
      onSave={formik.submitForm}
      disableSaveBtn={!!Object.keys(formik.errors).length}
      dialogProps={{
        maxWidth: 'lg',
        open: openDialog || false,
      }}>
      <EditProductForm formik={formik} img={product.signedPhotoUrl} />
    </Dialog>
  );
};

export default ProductEdit;
