import React from 'react';
import {Grid} from '@mui/material';
import {FormikProps} from 'formik';
import Box from '@mui/material/Box';

import FormInput from '../../../components/FormComponents/FormInput';
import {Category} from '../../../types/categories';
import {FormSelect} from '../../../components/FormComponents/FormSelect';
import {typeOfCategory} from '../../../constants/menu';

interface Props {
  formik: FormikProps<Category>;
}

const CategoryForm = ({formik}: Props) => {
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
                id: 'link',
                label: 'Link',
                placeholder: 'Link',
                value: formik.values.link,
                helperText: formik.touched.link && formik.errors.link,
                error: !!formik.errors.link && formik.touched.link,
                required: true,
              },
              {
                id: 'parent_id',
                label: 'Parent Category',
                placeholder: 'Parent Category ID',
                value: formik.values.parent_id,
                helperText: formik.touched.parent_id && formik.errors.parent_id,
                error: !!formik.errors.parent_id && formik.touched.parent_id,
              },
              {
                id: 'order',
                label: 'Order',
                placeholder: '1-10',
                type: 'number',
                value: formik.values.order,
                helperText: formik.touched.order && formik.errors.order,
                error: !!formik.errors.order && formik.touched.order,
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
              labelId="typeSelect-label"
              label="Type of link"
              required
              containerStyles={{margin: '1em 0'}}
              options={typeOfCategory.map(({value, label}) => ({
                label,
                value,
              }))}
              selectProps={{
                id: 'typeSelect',
                value: formik.values.type,
                error: !!(formik.touched.type && formik.errors.type),
                name: 'type',
                required: true,
                ...defaultProps,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default CategoryForm;
