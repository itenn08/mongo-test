import React from 'react';
import {Grid} from '@mui/material';
import {FormikProps} from 'formik';
import Box from '@mui/material/Box';

import {UserUpdateForm} from '../../../types/users';
import FormInput from '../../../components/FormComponents/FormInput';
import {DatePicker} from '../../../components/FormComponents/DatePicker';
import {FormSelect} from '../../../components/FormComponents/FormSelect';
import {roles} from '../../../constants/menu';

interface Props {
  formik: FormikProps<UserUpdateForm>;
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
                id: 'firstName',
                label: 'First Name',
                placeholder: 'Blake',
                value: formik.values.firstName,
                helperText: formik.touched.firstName && formik.errors.firstName,
                error: !!formik.errors.firstName && formik.touched.firstName,
                required: true,
              },
              {
                id: 'lastName',
                label: 'Last Name',
                placeholder: 'Norton',
                value: formik.values.lastName,
                helperText: formik.touched.lastName && formik.errors.lastName,
                error: !!formik.errors.lastName && formik.touched.lastName,
                required: true,
              },
              {
                id: 'city',
                label: 'City',
                placeholder: 'Kyiv',
                value: formik.values.city,
                helperText: formik.touched.city && formik.errors.city,
                error: !!formik.errors.city && formik.touched.city,
              },
              {
                id: 'country',
                label: 'Country',
                placeholder: 'Ukraine',
                value: formik.values.country,
                helperText: formik.touched.country && formik.errors.country,
                error: !!formik.errors.country && formik.touched.country,
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
              defaultDate={formik.values.dateOfBirth}
              getSelectedDate={(newValue) => {
                if (newValue) formik.setFieldValue('dateOfBirth', newValue);
              }}
              textFieldProps={{
                label: 'Date of birth',
                name: 'dateOfBirth',
                error: !!(
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                ),
                onBlur: formik.handleBlur,
              }}
              maxDate={new Date()}
              containerStyles={{margin: '1em 0'}}
            />
            <FormSelect
              labelId="roleSelect-label"
              label="Roles"
              containerStyles={{margin: '1em 0'}}
              options={roles.map(({value}) => ({
                label: value,
                value,
              }))}
              selectProps={{
                id: 'roleSelect',
                value: formik.values.role,
                error: !!(formik.touched.role && formik.errors.role),
                name: 'role',
                ...defaultProps,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default EditUserForm;
