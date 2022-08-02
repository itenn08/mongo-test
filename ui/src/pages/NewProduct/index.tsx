import {useEffect, useState} from 'react';
import {FormikErrors} from 'formik';
import {useNavigate} from 'react-router-dom';

import {Stepper} from '../../components/Stepper';
import {
  BasicSettingsFormModel,
  NewProductModel,
  PriceSettingsFormModel,
  SEOSettingsFormModel,
} from './model';
import {FlexContainer} from '../../components/FlexContainer';
import {BasicSettingsForm} from './BasicSettingsForm';
import {SeoSettingsForm} from './SeoSettingsForm';
import {useCreateProduct} from '../../hooks/reactQuery/useProducts';
import {PriceSettingsForm} from './PriceSettingsForm';

const steps = ['Add basic information', 'Price settings', 'SEO settings'];

export const NewProduct = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [disableNextBtn, setDisableNextBtn] = useState(false);

  const [basicSettingsFormError, setBasicSettingsFormError] = useState<
    FormikErrors<BasicSettingsFormModel>
  >({});

  const [basicSettingsFormValues, setBasicSettingsFormValues] =
    useState<BasicSettingsFormModel>({
      name: '',
      url: '',
      text: '',
      photoUrl: '',
      isActive: true,
      category: null,
    });

  const [seoSettingsFormError, setSeoSettingsFormError] = useState<
    FormikErrors<SEOSettingsFormModel>
  >({});

  const [seoSettingsFormValues, setSeoSettingsFormValues] =
    useState<SEOSettingsFormModel>({
      seoTitle: '',
      seoDescription: '',
    });

  const [priceSettingsFormError, setPriceSettingsFormError] = useState<
    FormikErrors<PriceSettingsFormModel>
  >({});

  const [priceSettingsFormValues, setPriceSettingsFormValues] =
    useState<PriceSettingsFormModel>({
      price: '',
      currency: '',
      quantity: '',
    });

  useEffect(() => {
    if (activeStep === 0 && Object.keys(basicSettingsFormError).length) {
      return setDisableNextBtn(true);
    }

    if (activeStep === 1 && Object.keys(priceSettingsFormError).length) {
      return setDisableNextBtn(true);
    }

    if (activeStep === 2 && Object.keys(seoSettingsFormError).length) {
      return setDisableNextBtn(true);
    }

    return setDisableNextBtn(false);
  }, [
    activeStep,
    basicSettingsFormError,
    seoSettingsFormError,
    priceSettingsFormError,
  ]);

  useEffect(() => {
    setActiveStep(0);
  }, []);

  const handleCancel = () => {
    setActiveStep(0);
  };

  const {mutateAsync: createProduct, isLoading: isSubmitting} =
    useCreateProduct('Product created successfully');

  const addNewPage = async () => {
    const body: NewProductModel = {
      name: basicSettingsFormValues.name,
      url: basicSettingsFormValues.url,
      text: basicSettingsFormValues.text,
      category: basicSettingsFormValues.category,
      photoUrl: basicSettingsFormValues.photoUrl,
      isActive: basicSettingsFormValues.isActive,
      seoTitle: seoSettingsFormValues.seoTitle,
      seoDescription: seoSettingsFormValues.seoDescription,
      currency: priceSettingsFormValues.currency,
      price: priceSettingsFormValues.price,
      quantity: priceSettingsFormValues.quantity,
    };

    const response = await createProduct(body);

    if (response) {
      navigate(`/products`, {replace: true});
    }
  };

  return (
    <Stepper
      handleCancel={handleCancel}
      handleSubmit={addNewPage}
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
            <PriceSettingsForm
              getPriceSettingsFormErrors={(errors) =>
                setPriceSettingsFormError(errors)
              }
              getPriceSettingsFormValues={(values) =>
                setPriceSettingsFormValues(values)
              }
              initialValues={priceSettingsFormValues}
            />
          </FlexContainer>
        )}
        {activeStep === 2 && (
          <FlexContainer containerStyle={{mt: '2em'}}>
            <SeoSettingsForm
              getSeoSettingsFormErrors={(errors) =>
                setSeoSettingsFormError(errors)
              }
              getSeoSettingsFormValues={(values) =>
                setSeoSettingsFormValues(values)
              }
              initialValues={seoSettingsFormValues}
            />
          </FlexContainer>
        )}
      </FlexContainer>
    </Stepper>
  );
};
