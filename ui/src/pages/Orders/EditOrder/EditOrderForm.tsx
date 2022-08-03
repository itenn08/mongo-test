import React from 'react';
import {Grid, Typography} from '@mui/material';
import {FormikProps} from 'formik';
import Box from '@mui/material/Box';

import FormInput from '../../../components/FormComponents/FormInput';
import HTMLEditor from '../../../components/HTMLEditor';
import {OrderView} from '../../../types/orders';
import {FormSelect} from '../../../components/FormComponents/FormSelect';
import {orderStatuses} from '../../../constants/menu';

interface Props {
  formik: FormikProps<OrderView>;
}

const EditOrderForm = ({formik}: Props) => {
  const defaultProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
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
            {/* <Box>
              <CategoryPageAutocomplete
                getCategory={(value) => {
                  formik.setFieldValue('category', value);
                }}
                containerStyles={{mt: '0.5em'}}
                onlyParent={false}
                initialValue={formik.values?.category || null}
                textFieldProps={{
                  error: !!(formik.errors.category && formik.touched.category),
                  helperText:
                    formik.errors.category && formik.touched.category
                      ? formik.errors.category
                      : '',
                  label: 'Category',
                  onBlur: formik.handleBlur,
                }}
              />
            </Box> */}

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
