import {useEffect} from 'react';
import {FormikErrors, useFormik} from 'formik';
import * as Yup from 'yup';
import {Box} from '@mui/system';
import Grid from '@mui/material/Grid';

import {PriceSettingsFormModel} from './model';
import {PageCard} from '../../components/PageCard';
import FormInput from '../../components/FormComponents/FormInput';
import {FormSelect} from '../../components/FormComponents/FormSelect';
import {currencies} from '../../constants/menu';

interface Props {
  getPriceSettingsFormErrors?: (
    val: FormikErrors<PriceSettingsFormModel>,
  ) => void;
  getPriceSettingsFormValues?: (val: PriceSettingsFormModel) => void;
  initialValues: PriceSettingsFormModel;
}

const validationSchema = Yup.object().shape({
  price: Yup.string().nullable().required('Price is required'),
  currency: Yup.string().nullable().required('Currency is required'),
});

export const PriceSettingsForm = ({
  getPriceSettingsFormErrors,
  getPriceSettingsFormValues,
  initialValues,
}: Props) => {
  const formik = useFormik<PriceSettingsFormModel>({
    initialValues: {
      quantity: initialValues?.quantity || '',
      price: initialValues?.price || '',
      currency: initialValues?.currency || '',
    },
    onSubmit: () => {},
    validationSchema,
  });

  useEffect(() => {
    if (getPriceSettingsFormErrors) {
      getPriceSettingsFormErrors(formik.errors);
    }

    if (getPriceSettingsFormValues) {
      getPriceSettingsFormValues(formik.values);
    }
  }, [formik]);

  useEffect(() => {
    formik.validateForm();
  }, []);

  const defaultProps = {
    InputLabelProps: {shrink: true},
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  return (
    <PageCard
      headerLabel="Price Information"
      containerStyles={{flexGrow: 1}}
      headerStyles={{mt: '0.5em'}}>
      <Box sx={{mt: '0.5em'}} component="form">
        <Grid container spacing={2}>
          <Grid item md={5}>
            <FormInput
              props={{
                size: 'small',
                placeholder: 'Price of product',
                label: 'Price',
                name: 'price',
                value: formik.values.price,
                helperText: formik.touched.price && formik.errors.price,
                error: !!formik.errors.price && formik.touched.price,
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
                placeholder: 'e.g 100',
                label: 'Quantity',
                name: 'quantity',
                value: formik.values.quantity,
                helperText: formik.touched.quantity && formik.errors.quantity,
                error: !!formik.errors.quantity && formik.touched.quantity,
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
          </Grid>
        </Grid>
      </Box>
    </PageCard>
  );
};
