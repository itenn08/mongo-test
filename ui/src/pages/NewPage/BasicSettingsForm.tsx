import {useEffect} from 'react';
import {FormikErrors, useFormik} from 'formik';
import * as Yup from 'yup';
import {Box} from '@mui/system';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';

import {BasicSettingsFormModel} from './model';
import {PageCard} from '../../components/PageCard';
import FormInput from '../../components/FormComponents/FormInput';
import {Switch} from '../../components/Switch';
import {DatePicker} from '../../components/FormComponents/DatePicker';

interface Props {
  getBasicSettingsFormErrors?: (
    val: FormikErrors<BasicSettingsFormModel>,
  ) => void;
  getBasicSettingsFormValues?: (val: BasicSettingsFormModel) => void;
  initialValues: BasicSettingsFormModel;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().nullable().required('Title is required'),
  url: Yup.string().nullable().required('URL is required'),
});

export const BasicSettingsForm = ({
  getBasicSettingsFormErrors,
  getBasicSettingsFormValues,
  initialValues,
}: Props) => {
  const formik = useFormik<BasicSettingsFormModel>({
    initialValues: {
      title: initialValues?.title || '',
      url: initialValues?.url || '',
      content: initialValues?.content || '',
      date: initialValues?.date || null,
      isActive: initialValues?.isActive || true,
    },
    onSubmit: () => {},
    validationSchema,
  });

  useEffect(() => {
    if (getBasicSettingsFormErrors) {
      getBasicSettingsFormErrors(formik.errors);
    }

    if (getBasicSettingsFormValues) {
      getBasicSettingsFormValues(formik.values);
    }
  }, [formik]);

  const defaultProps = {
    InputLabelProps: {shrink: true},
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  return (
    <PageCard
      headerLabel="Basic Information"
      containerStyles={{flexGrow: 1}}
      headerStyles={{mt: '0.5em'}}>
      <Box sx={{mt: '0.5em'}} component="form">
        <Grid container spacing={2}>
          <Grid item md={5}>
            <FormInput
              props={{
                size: 'small',
                placeholder: '1&1 Drillisch AG',
                label: 'Title',
                name: 'title',
                value: formik.values.title,
                helperText: formik.touched.title && formik.errors.title,
                error: !!formik.errors.title && formik.touched.title,
                required: true,
                sx: {
                  mt: '0.5em',
                },
                ...defaultProps,
              }}
            />
          </Grid>
          <Grid item md={5}>
            <FormInput
              props={{
                size: 'small',
                placeholder: 'e.g test-page-url',
                label: 'URL',
                name: 'url',
                value: formik.values.url,
                helperText: formik.touched.url && formik.errors.url,
                error: !!formik.errors.url && formik.touched.url,
                required: true,
                sx: {
                  mt: '0.5em',
                },
                ...defaultProps,
              }}
            />
          </Grid>

          <Grid item md={5}>
            <FormInput
              props={{
                size: 'small',
                placeholder: 'Enter content',
                label: 'Content',
                name: 'content',
                value: formik.values.content,
                helperText: formik.errors.content,
                error: !!formik.errors.content,
                sx: {
                  mt: '0.5em',
                },
                ...defaultProps,
              }}
            />
          </Grid>
          <Grid item md={5}>
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
              containerStyles={{mt: '0.5em'}}
            />
          </Grid>
          <Grid item md={10}>
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
          </Grid>
        </Grid>
      </Box>
    </PageCard>
  );
};
