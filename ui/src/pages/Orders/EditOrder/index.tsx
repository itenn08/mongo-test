import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {Dialog} from '../../../components/Dialog';
import {OrderView, OrderViewForm} from '../../../types/orders';
import {useOrders} from '../../../hooks/reactQuery/useOrders';
import EditOrderForm from './EditOrderForm';

interface Props {
  order: OrderView;
  openDialog: boolean;
  onClose: () => void;
}

const OrderEdit = ({order, openDialog, onClose}: Props) => {
  const {updateOrder} = useOrders();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().nullable().required('First name is required'),
    lastName: Yup.string().nullable().required('Last name is required'),
    number_phone: Yup.string().nullable().required('Number phone is required'),
    address: Yup.string().nullable().required('address is required'),
    status: Yup.string().nullable().required('status is required'),
  });

  const formik = useFormik<OrderView>({
    enableReinitialize: true,

    initialValues: {
      firstName: order.firstName || '',
      lastName: order.lastName || '',
      number_phone: order.number_phone || '',
      address: order.address || '',
      status: order.status || '',
      text: order.text || '',
      products: order.products || [],
    },
    validationSchema,
    onSubmit: () => {
      const body: OrderViewForm = {
        firstName: formik.values.firstName || '',
        lastName: formik.values.lastName || '',
        number_phone: formik.values.number_phone || '',
        address: formik.values.address || '',
        status: formik.values.status,
        text: formik.values.text || '',
        products: formik.values.products
          .filter((product) => product.product.id !== '')
          .map((product) => ({
            product: product.product?.id,
            quantity: product.quantity,
          })),
      };

      updateOrder(body, order.id!, () => {
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
  }, [order]);

  return (
    <Dialog
      title="Edit Order"
      onCancel={handleClose}
      onSave={formik.submitForm}
      disableSaveBtn={!!Object.keys(formik.errors).length}
      dialogProps={{
        maxWidth: 'lg',
        open: openDialog || false,
      }}>
      <EditOrderForm formik={formik} />
    </Dialog>
  );
};

export default OrderEdit;
