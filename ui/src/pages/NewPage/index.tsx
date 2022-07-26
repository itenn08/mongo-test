import {useEffect, useState} from 'react';
import {FormikErrors} from 'formik';
import {useNavigate} from 'react-router-dom';

import {Stepper} from '../../components/Stepper';
import {
  BasicSettingsFormModel,
  NewPageModel,
  SEOSettingsFormModel,
} from './model';
import {FlexContainer} from '../../components/FlexContainer';
import {useCreatePage} from '../../hooks/reactQuery/usePages';
import {BasicSettingsForm} from './BasicSettingsForm';
import {SeoSettingsForm} from './SeoSettingsForm';

const steps = ['Add basic information', 'SEO settings'];

export const NewPage = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [disableNextBtn, setDisableNextBtn] = useState(false);

  const [basicSettingsFormError, setBasicSettingsFormError] = useState<
    FormikErrors<BasicSettingsFormModel>
  >({});

  const [basicSettingsFormValues, setBasicSettingsFormValues] =
    useState<BasicSettingsFormModel>({
      title: '',
      url: '',
      content: '',
      date: null,
      isActive: true,
    });

  const [seoSettingsFormError, setSeoSettingsFormError] = useState<
    FormikErrors<SEOSettingsFormModel>
  >({});

  const [seoSettingsFormValues, setSeoSettingsFormValues] =
    useState<SEOSettingsFormModel>({
      seoTitle: '',
      seoDescription: '',
    });

  useEffect(() => {
    if (activeStep === 0 && Object.keys(basicSettingsFormError).length) {
      return setDisableNextBtn(true);
    }

    if (activeStep === 1 && Object.keys(seoSettingsFormError).length) {
      return setDisableNextBtn(true);
    }

    return setDisableNextBtn(false);
  }, [activeStep, basicSettingsFormError, seoSettingsFormError]);

  useEffect(() => {
    setActiveStep(0);
  }, []);

  const handleCancel = () => {
    setActiveStep(0);
  };

  const {mutateAsync: createServiceCompany, isLoading: isSubmitting} =
    useCreatePage('Page created successfully');

  const addNewPage = async () => {
    console.log('basicSettingsFormValues', basicSettingsFormValues);

    const body: NewPageModel = {
      title: basicSettingsFormValues.title,
      url: basicSettingsFormValues.url,
      content: basicSettingsFormValues.content,
      date: basicSettingsFormValues.date,
      isActive: basicSettingsFormValues.isActive,
      seoTitle: seoSettingsFormValues.seoTitle,
      seoDescription: seoSettingsFormValues.seoDescription,
    };

    const response = await createServiceCompany(body);

    if (response) {
      navigate(`/pages`, {replace: true});
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
