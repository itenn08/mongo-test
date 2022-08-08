import React from 'react';
import {Grid, Typography} from '@mui/material';
import {FormikProps} from 'formik';
import Box from '@mui/material/Box';

import FormInput from '../../../components/FormComponents/FormInput';
import {Switch} from '../../../components/Switch';
import CategoryPageAutocomplete from '../../../components/Autocompletes/CategoryPageAutocomplete';
import HTMLEditor from '../../../components/HTMLEditor';
import {ProductUpdateForm} from '../../../types/products';
import {FormSelect} from '../../../components/FormComponents/FormSelect';
import {currencies} from '../../../constants/menu';
import {UploadFile} from '../../../components/UploadFile';

interface Props {
  formik: FormikProps<ProductUpdateForm>;
}

const EditProductForm = ({formik}: Props) => {
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
                id: 'name',
                label: 'Name',
                placeholder: 'Name',
                value: formik.values.name,
                helperText: formik.touched.name && formik.errors.name,
                error: !!formik.errors.name && formik.touched.name,
                required: true,
              },
              {
                id: 'url',
                label: 'URL',
                placeholder: 'URL',
                value: formik.values.url,
                helperText: formik.touched.url && formik.errors.url,
                error: !!formik.errors.url && formik.touched.url,
                required: true,
              },
              {
                id: 'photoUrl',
                label: 'Photo URL',
                placeholder: 'URL',
                value: formik.values.photoUrl,
                helperText: formik.touched.photoUrl && formik.errors.photoUrl,
                error: !!formik.errors.photoUrl && formik.touched.photoUrl,
              },
              {
                id: 'price',
                label: 'price',
                placeholder: 'price',
                value: formik.values.price,
                helperText: formik.touched.price && formik.errors.price,
                error: !!formik.errors.price && formik.touched.price,
              },
              {
                id: 'quantity',
                label: 'Quantity',
                placeholder: 'Quantity',
                value: formik.values.quantity,
                helperText: formik.touched.quantity && formik.errors.quantity,
                error: !!formik.errors.quantity && formik.touched.quantity,
              },
              {
                id: 'seoTitle',
                label: 'SEO Title',
                placeholder: 'Title',
                value: formik.values.seoTitle,
                helperText: formik.touched.seoTitle && formik.errors.seoTitle,
                error: !!formik.errors.seoTitle && formik.touched.seoTitle,
              },
              {
                id: 'seoDescription',
                label: 'SEO Description',
                placeholder: 'Description',
                value: formik.values.seoDescription,
                helperText:
                  formik.touched.seoDescription && formik.errors.seoDescription,
                error:
                  !!formik.errors.seoDescription &&
                  formik.touched.seoDescription,
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
            <FormSelect
              labelId="currencySelect-label"
              label="Currency"
              required
              containerStyles={{margin: '1em 0'}}
              options={currencies.map(({value, label}) => ({
                label,
                value,
              }))}
              selectProps={{
                id: 'currencySelect',
                value: formik.values.currency,
                error: !!(formik.touched.currency && formik.errors.currency),
                name: 'currency',
                ...defaultProps,
              }}
            />
            <Box>
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
            </Box>
            <Box display="flex" alignItems="center" sx={{mb: '0.625em'}}>
              <Typography
                variant="body1"
                sx={{color: 'text.primary', mr: '20px'}}>
                Product status:
              </Typography>
              <Switch
                value={formik.values.isActive}
                onChanged={(value) => formik.setFieldValue('isActive', value)}
              />
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{color: 'text.primary', mt: '1em'}}>
                Product content:
              </Typography>
              <HTMLEditor
                initialValue={formik.values.text}
                onChange={(value) => formik.setFieldValue('text', value)}
              />
            </Box>
            <Box sx={{mt: '1em'}}>
              <UploadFile
                getAcceptedFiles={(dropedFiles) => {
                  formik.setFieldValue('image', dropedFiles);
                  console.log('dropedFiles', dropedFiles);
                }}
                // isCropped
                hints={['JPG, PNG or BMP only', 'File size less than 5MB only']}
                acceptedFileTypes="image/*"
                maxFiles={1}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default EditProductForm;
