import {useEffect, useState} from 'react';
import {FormikErrors} from 'formik';
import {useNavigate} from 'react-router-dom';

import {Stepper} from '../../components/Stepper';
import {BasicSettingsFormModel, ProductFormModel} from './model';
import {FlexContainer} from '../../components/FlexContainer';
import {useCreateOrder} from '../../hooks/reactQuery/useOrders';
import {BasicSettingsForm} from './BasicSettingsForm';
import {ProductsForm} from './ProductsForm';
import {OrderViewForm} from '../../types/orders';

const steps = ['Add basic information', 'Select products'];

export const NewOrder = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [disableNextBtn, setDisableNextBtn] = useState(false);

  const [basicSettingsFormError, setBasicSettingsFormError] = useState<
    FormikErrors<BasicSettingsFormModel>
  >({});

  const [basicSettingsFormValues, setBasicSettingsFormValues] =
    useState<BasicSettingsFormModel>({
      firstName: '',
      lastName: '',
      number_phone: '',
      address: '',
      status: '',
      text: '',
    });

  const [productsFormError, setProductsFormError] = useState<
    FormikErrors<ProductFormModel>
  >({});

  const [productsFormValues, setProductsFormValues] =
    useState<ProductFormModel>({
      products: [],
    });

  useEffect(() => {
    if (activeStep === 0 && Object.keys(basicSettingsFormError).length) {
      return setDisableNextBtn(true);
    }

    if (activeStep === 1 && Object.keys(productsFormError).length) {
      return setDisableNextBtn(true);
    }

    return setDisableNextBtn(false);
  }, [activeStep, basicSettingsFormError, productsFormError]);

  useEffect(() => {
    setActiveStep(0);
  }, []);

  const handleCancel = () => {
    setActiveStep(0);
  };

  const {mutateAsync: createOrder, isLoading: isSubmitting} = useCreateOrder(
    'Page created successfully',
  );

  const addNewOrder = async () => {
    const body: OrderViewForm = {
      firstName: basicSettingsFormValues.firstName,
      lastName: basicSettingsFormValues.lastName,
      text: basicSettingsFormValues.text,
      address: basicSettingsFormValues.address,
      status: basicSettingsFormValues.status,
      number_phone: basicSettingsFormValues.number_phone,
      products: productsFormValues.products
        .filter((product) => product.product.id !== '')
        .map((product) => ({
          product: product.product?.id,
          quantity: product.quantity,
        })),
    };

    const response = await createOrder(body);

    if (response) {
      navigate(`/orders`, {replace: true});
    }
  };

  return (
    <Stepper
      handleCancel={handleCancel}
      handleSubmit={addNewOrder}
      disableNextBtn={disableNextBtn || isSubmitting}
      submitting={isSubmitting}
      initialActiveStep={0}
      getActiveStep={(val) => setActiveStep(val)}
      steps={steps}
      containerStyles={{
        flexGrow: 1,
        ml: '0',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <FlexContainer>
        {activeStep === 0 && (
          <FlexContainer containerStyle={{mt: '2em'}}>
            <BasicSettingsForm
              getBasicSettingsFormErrors={(errors) =>
                setBasicSettingsFormError(errors)
              }
              getBasicSettingsFormValues={(values) =>
                setBasicSettingsFormValues(values)
              }
              initialValues={basicSettingsFormValues}
            />
          </FlexContainer>
        )}
        {activeStep === 1 && (
          <FlexContainer containerStyle={{mt: '2em'}}>
            <ProductsForm
              getProductFormErrors={(errors) => setProductsFormError(errors)}
              getProductFormValues={(values) => setProductsFormValues(values)}
              initialValues={productsFormValues}
            />
          </FlexContainer>
        )}
      </FlexContainer>
    </Stepper>
  );
};
