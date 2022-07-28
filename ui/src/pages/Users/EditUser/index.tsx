import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {User, UserUpdateForm} from '../../../types/users';
import {useUsers} from '../../../hooks/reactQuery/useUsers';
import EditUserForm from './EditUserForm';
import {Dialog} from '../../../components/Dialog';

interface Props {
  user: User;
  openDialog: boolean;
  onClose: () => void;
}

const UserEdit = ({user, openDialog, onClose}: Props) => {
  const {updateUser} = useUsers();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().nullable().required('First name is required'),
    lastName: Yup.string().nullable().required('Last name is required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
  });

  const formik = useFormik<UserUpdateForm>({
    enableReinitialize: true,

    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
      country: user.country,
      city: user.city,
    },
    validationSchema,
    onSubmit: () => {
      const body: UserUpdateForm = {
        email: user.email,
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        role: formik.values.role || 'user',
        dateOfBirth: formik.values.dateOfBirth || null,
        city: formik.values.city || '-',
        country: formik.values.country || '-',
        password: formik.values.password,
      };

      updateUser(body, user.id, () => {
        formik.resetForm();
        onClose();
      });
    },
    validateOnMount: true,
  });

  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  useEffect(() => {
    formik.validateForm();

    return () => {};
  }, [user]);

  return (
    <Dialog
      title="Edit User Information"
      onCancel={handleClose}
      onSave={formik.submitForm}
      disableSaveBtn={!!Object.keys(formik.errors).length}
      dialogProps={{
        maxWidth: 'md',
        open: openDialog || false,
      }}>
      <EditUserForm formik={formik} />
    </Dialog>
  );
};

export default UserEdit;
