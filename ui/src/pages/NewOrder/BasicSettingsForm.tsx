import {useEffect} from 'react';
import {FormikErrors, useFormik} from 'formik';
import * as Yup from 'yup';
import {Box} from '@mui/system';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';

import {BasicSettingsFormModel} from './model';
import {PageCard} from '../../components/PageCard';
import FormInput from '../../components/FormComponents/FormInput';
import HTMLEditor from '../../components/HTMLEditor';
import {orderStatuses} from '../../constants/menu';
import {FormSelect} from '../../components/FormComponents/FormSelect';

interface Props {
  getBasicSettingsFormErrors?: (
    val: FormikErrors<BasicSettingsFormModel>,
  ) => void;
  getBasicSettingsFormValues?: (val: BasicSettingsFormModel) => void;
  initialValues: BasicSettingsFormModel;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().nullable().required('First name is required'),
  lastName: Yup.string().nullable().required('Last name is required'),
  number_phone: Yup.string().nullable().required('Number phone is required'),
  address: Yup.string().nullable().required('address is required'),
  status: Yup.string().nullable().required('status is required'),
});

export const BasicSettingsForm = ({
  getBasicSettingsFormErrors,
  getBasicSettingsFormValues,
  initialValues,
}: Props) => {
  const formik = useFormik<BasicSettingsFormModel>({
    initialValues: {
      firstName: initialValues?.firstName || '',
      lastName: initialValues?.lastName || '',
      text: initialValues?.text || '',
      address: initialValues?.address || '',
      status: initialValues?.status || 'open',
      number_phone: initialValues?.number_phone || '',
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
                placeholder: 'First Name',
                label: 'First Name',
                name: 'firstName',
                value: formik.values.firstName,
                helperText: formik.touched.firstName && formik.errors.firstName,
                error: !!formik.errors.firstName && formik.touched.firstName,
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
                placeholder: 'Last Name',
                label: 'Last Name',
                name: 'lastName',
                value: formik.values.lastName,
                helperText: formik.touched.lastName && formik.errors.lastName,
                error: !!formik.errors.lastName && formik.touched.lastName,
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
                placeholder: 'Phone Number',
                label: 'Phone Number',
                name: 'number_phone',
                value: formik.values.number_phone,
                helperText:
                  formik.touched.number_phone && formik.errors.number_phone,
                error:
                  !!formik.errors.number_phone && formik.touched.number_phone,
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
                placeholder: 'Address',
                label: 'Address',
                name: 'address',
                value: formik.values.address,
                helperText: formik.touched.address && formik.errors.address,
                error: !!formik.errors.address && formik.touched.address,
                required: true,
                sx: {
                  mt: '0.5em',
                },
                ...defaultProps,
              }}
            />
          </Grid>
          <Grid item md={5}>
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
          </Grid>
          <Grid item md={10}>
            <Typography variant="body1" sx={{color: 'text.primary', mt: '1em'}}>
              Additional information
            </Typography>
            <HTMLEditor
              initialValue={formik.values.text}
              onChange={(value) => formik.setFieldValue('text', value)}
            />
          </Grid>
        </Grid>
      </Box>
    </PageCard>
  );
};
