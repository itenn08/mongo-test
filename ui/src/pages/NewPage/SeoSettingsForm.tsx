import {useEffect} from 'react';
import {FormikErrors, useFormik} from 'formik';
import {Box} from '@mui/system';
import Grid from '@mui/material/Grid';

import {PageCard} from '../../components/PageCard';
import FormInput from '../../components/FormComponents/FormInput';
import {SEOSettingsFormModel} from './model';

interface Props {
  getSeoSettingsFormErrors?: (val: FormikErrors<SEOSettingsFormModel>) => void;
  getSeoSettingsFormValues?: (val: SEOSettingsFormModel) => void;
  initialValues: SEOSettingsFormModel;
}

export const SeoSettingsForm = ({
  getSeoSettingsFormErrors,
  getSeoSettingsFormValues,
  initialValues,
}: Props) => {
  const formik = useFormik<SEOSettingsFormModel>({
    initialValues: {
      seoDescription: initialValues?.seoDescription || '',
      seoTitle: initialValues?.seoTitle || '',
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    if (getSeoSettingsFormErrors) {
      getSeoSettingsFormErrors(formik.errors);
    }

    if (getSeoSettingsFormValues) {
      getSeoSettingsFormValues(formik.values);
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
          <Grid item md={5}>
            <FormInput
              props={{
                size: 'small',
                placeholder: 'e.g example title',
                label: 'SEO Title',
                name: 'seoTitle',
                value: formik.values.seoTitle,
                helperText: formik.touched.seoTitle && formik.errors.seoTitle,
                error: !!formik.errors.seoTitle && formik.touched.seoTitle,
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
                placeholder: 'e.g example description',
                label: 'SEO Description',
                name: 'seoDescription',
                value: formik.values.seoDescription,
                helperText:
                  formik.touched.seoDescription && formik.errors.seoDescription,
                error:
                  !!formik.errors.seoDescription &&
                  formik.touched.seoDescription,
                required: true,
                sx: {
                  mt: '0.5em',
                },
                ...defaultProps,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </PageCard>
  );
};
