import React from 'react';
import {Button, Grid, IconButton, Typography} from '@mui/material';
import {FieldArray, FormikProps, FormikProvider} from 'formik';
import {Add, Remove} from '@mui/icons-material';
import Box from '@mui/material/Box';

import FormInput from '../../../components/FormComponents/FormInput';
import HTMLEditor from '../../../components/HTMLEditor';
import {FormSelect} from '../../../components/FormComponents/FormSelect';
import ProductAutocomplete from '../../../components/Autocompletes/ProductAutocomplete';
import {OrderView} from '../../../types/orders';
import {orderStatuses} from '../../../constants/menu';

interface Props {
  formik: FormikProps<OrderView>;
}

const EditOrderForm = ({formik}: Props) => {
  const defaultProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  const initialProduct = {
    product: null,
    quantity: 1,
  };

  return (
    <Grid
      component="form"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between">
      <Box flexGrow={1}>
        <Box display="flex" gap="1em" justifyContent="space-between">
          <Box>
            {[
              {
                id: 'firstName',
                label: 'First Name',
                placeholder: 'First Name',
                value: formik.values.firstName,
                helperText: formik.touched.firstName && formik.errors.firstName,
                error: !!formik.errors.firstName && formik.touched.firstName,
                required: true,
              },
              {
                id: 'lastName',
                label: 'Last Name',
                placeholder: 'Last Name',
                value: formik.values.lastName,
                helperText: formik.touched.lastName && formik.errors.lastName,
                error: !!formik.errors.lastName && formik.touched.lastName,
                required: true,
              },
              {
                id: 'number_phone',
                label: 'Phone Number',
                placeholder: 'Phone Number',
                value: formik.values.number_phone,
                helperText:
                  formik.touched.number_phone && formik.errors.number_phone,
                error:
                  !!formik.errors.number_phone && formik.touched.number_phone,
                required: true,
              },
              {
                id: 'address',
                label: 'Address',
                placeholder: 'Address',
                value: formik.values.address,
                helperText: formik.touched.address && formik.errors.address,
                error: !!formik.errors.address && formik.touched.address,
                required: true,
              },
            ].map((item, index) => (
              <FormInput
                key={index}
                containerStyles={{margin: '1em 0'}}
                props={{
                  ...item,
                  ...defaultProps,
                }}
              />
            ))}
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
                          <IconButton
                            onClick={() => arrayHelpers.remove(index)}>
                            <Remove />
                          </IconButton>
                          <IconButton
                            onClick={() => arrayHelpers.push(initialProduct)}>
                            <Add />
                          </IconButton>
                        </Box>
                      ))
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => arrayHelpers.push(initialProduct)}>
                        Add a product
                      </Button>
                    )}
                  </Box>
                )}
              />
            </FormikProvider>
            <Box>
              <FormSelect
                labelId="statusSelect-label"
                label="Order status"
                required
                containerStyles={{margin: '1em 0'}}
                options={orderStatuses.map(({value, label}) => ({
                  label,
                  value,
                }))}
                selectProps={{
                  id: 'statusSelect',
                  value: formik.values.status,
                  error: !!(formik.touched.status && formik.errors.status),
                  name: 'status',
                  ...defaultProps,
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{color: 'text.primary', mt: '1em'}}>
                Additional information:
              </Typography>
              <HTMLEditor
                initialValue={formik.values.text || ''}
                onChange={(value) => formik.setFieldValue('text', value)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default EditOrderForm;
