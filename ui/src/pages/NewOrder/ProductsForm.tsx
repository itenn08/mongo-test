import {useEffect} from 'react';
import {FieldArray, FormikErrors, FormikProvider, useFormik} from 'formik';
import {Box} from '@mui/system';
import Grid from '@mui/material/Grid';
import {Add, Remove} from '@mui/icons-material';
import {Button, IconButton} from '@mui/material';

import {PageCard} from '../../components/PageCard';
import FormInput from '../../components/FormComponents/FormInput';
import ProductAutocomplete from '../../components/Autocompletes/ProductAutocomplete';
import {initialAutocompleteProduct} from '../Orders/EditOrder/EditOrderForm';
import {ProductFormModel} from './model';

interface Props {
  getProductFormErrors?: (val: FormikErrors<ProductFormModel>) => void;
  getProductFormValues?: (val: ProductFormModel) => void;
  initialValues: ProductFormModel;
}

export const ProductsForm = ({
  getProductFormErrors,
  getProductFormValues,
  initialValues,
}: Props) => {
  const formik = useFormik<ProductFormModel>({
    initialValues: {
      products: initialValues?.products || [],
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    if (getProductFormErrors) {
      getProductFormErrors(formik.errors);
    }

    if (getProductFormValues) {
      getProductFormValues(formik.values);
    }
  }, [formik]);

  const defaultProps = {
    InputLabelProps: {shrink: true},
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  return (
    <PageCard
      headerLabel="SEO Settings"
      containerStyles={{flexGrow: 1}}
      headerStyles={{mt: '0.5em'}}>
      <Box sx={{mt: '0.5em'}} component="form">
        <Grid container spacing={2}>
          <FormikProvider value={formik}>
            <FieldArray
              name="products"
              render={(arrayHelpers) => (
                <Box>
                  {formik.values.products &&
                  formik.values.products.length > 0 ? (
                    formik.values.products.map((product, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        margin="1em 0">
                        <Box>
                          <ProductAutocomplete
                            getProduct={(value) => {
                              formik.setFieldValue(
                                `products.${index}.product.id`,
                                value || '',
                              );
                            }}
                            containerStyles={{minWidth: '25em'}}
                            initialValue={
                              formik.values?.products[index]?.product?.id ||
                              null
                            }
                            textFieldProps={{
                              label: 'Product',
                              onBlur: formik.handleBlur,
                            }}
                          />
                        </Box>
                        <FormInput
                          containerStyles={{
                            maxWidth: '150px',
                            ml: '0.5em',
                          }}
                          props={{
                            id: `products.${index}.quantity`,
                            label: 'Quantity',
                            placeholder: 'Quantity',
                            type: 'number',
                            value: formik.values.products[index].quantity,
                            required: true,
                            ...defaultProps,
                          }}
                        />
                        <IconButton onClick={() => arrayHelpers.remove(index)}>
                          <Remove />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            arrayHelpers.push(initialAutocompleteProduct)
                          }>
                          <Add />
                        </IconButton>
                      </Box>
                    ))
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() =>
                        arrayHelpers.push(initialAutocompleteProduct)
                      }>
                      Add a product
                    </Button>
                  )}
                </Box>
              )}
            />
          </FormikProvider>
        </Grid>
      </Box>
    </PageCard>
  );
};
