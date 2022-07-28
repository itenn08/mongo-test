import React from 'react';
import {Grid, Typography} from '@mui/material';
import {FormikProps} from 'formik';
import Box from '@mui/material/Box';

import FormInput from '../../../components/FormComponents/FormInput';
import {DatePicker} from '../../../components/FormComponents/DatePicker';
import {PageUpdateForm} from '../../../types/pages';
import {Switch} from '../../../components/Switch';

interface Props {
  formik: FormikProps<PageUpdateForm>;
}

const EditUserForm = ({formik}: Props) => {
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
                id: 'title',
                label: 'Title',
                placeholder: 'Title',
                value: formik.values.title,
                helperText: formik.touched.title && formik.errors.title,
                error: !!formik.errors.title && formik.touched.title,
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
                id: 'content',
                label: 'Content',
                placeholder: 'Content',
                value: formik.values.content,
                helperText: formik.touched.content && formik.errors.content,
                error: !!formik.errors.content && formik.touched.content,
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
            <DatePicker
              defaultDate={formik.values.date}
              getSelectedDate={(newValue) => {
                if (newValue) formik.setFieldValue('date', newValue);
              }}
              textFieldProps={{
                label: 'Date',
                name: 'date',
                error: !!(formik.touched.date && formik.errors.date),
                onBlur: formik.handleBlur,
              }}
              maxDate={new Date()}
              containerStyles={{margin: '1em 0'}}
            />
            <Box display="flex" alignItems="center" sx={{mb: '0.625em'}}>
              <Typography
                variant="body1"
                sx={{color: 'text.primary', mr: '20px'}}>
                Page status:
              </Typography>
              <Switch
                value={formik.values.isActive}
                onChanged={(value) => formik.setFieldValue('isActive', value)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default EditUserForm;
