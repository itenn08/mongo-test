import {useEffect, useState} from 'react';
import {FormikErrors, useFormik} from 'formik';
import * as Yup from 'yup';
import {Box} from '@mui/system';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';

import {BasicSettingsFormModel} from './model';
import {PageCard} from '../../components/PageCard';
import FormInput from '../../components/FormComponents/FormInput';
import {Switch} from '../../components/Switch';
import CategoryPageAutocomplete from '../../components/Autocompletes/CategoryPageAutocomplete';
import HTMLEditor from '../../components/HTMLEditor';
import UploadFileForm from '../../components/UploadFileForm';

interface Props {
  getBasicSettingsFormErrors?: (
    val: FormikErrors<BasicSettingsFormModel>,
  ) => void;
  getBasicSettingsFormValues?: (val: BasicSettingsFormModel) => void;
  initialValues: BasicSettingsFormModel;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().nullable().required('Name is required'),
  url: Yup.string().nullable().required('URL is required'),
});

export const BasicSettingsForm = ({
  getBasicSettingsFormErrors,
  getBasicSettingsFormValues,
  initialValues,
}: Props) => {
  const [imgUrl, setImgUrl] = useState<string | null | ArrayBuffer>('');

  const formik = useFormik<BasicSettingsFormModel>({
    initialValues: {
      name: initialValues?.name || '',
      url: initialValues?.url || '',
      text: initialValues?.text || '',
      photoUrl: initialValues?.photoUrl || null,
      isActive: initialValues?.isActive || true,
      category: initialValues?.category || null,
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

  const getLocalImg = async () => {
    if (formik.values.photoUrl && formik.values.photoUrl.length > 0) {
      const fetchUrl = formik.values.photoUrl[0] as any;
      const response = await fetch(fetchUrl.preview);
      const imageBlob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setImgUrl(base64data);
      };
    }
  };

  useEffect(() => {
    getLocalImg();
  }, [formik.values.photoUrl]);

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
                placeholder: 'Name of product',
                label: 'Name',
                name: 'name',
                value: formik.values.name,
                helperText: formik.touched.name && formik.errors.name,
                error: !!formik.errors.name && formik.touched.name,
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
            <CategoryPageAutocomplete
              getCategory={(value) => {
                formik.setFieldValue('category', value);
              }}
              containerStyles={{mt: '0.5em'}}
              onlyParent={false}
              initialValue={
                (formik.values?.category && formik.values?.category) || null
              }
              textFieldProps={{
                error: !!(formik.errors.category && formik.touched.category),
                helperText:
                  formik.errors.category && formik.touched.category
                    ? formik.errors.category
                    : '',
                label: 'Category',
                onBlur: formik.handleBlur,
              }}
            />
          </Grid>
          <Grid item md={10}>
            <Box display="flex" alignItems="center" sx={{mb: '0.625em'}}>
              <Typography
                variant="body1"
                sx={{color: 'text.primary', mr: '20px'}}>
                Product status:
              </Typography>
              <Switch
                value={formik.values.isActive}
                onChanged={(value) => formik.setFieldValue('isActive', value)}
              />
            </Box>
          </Grid>
          <Grid item md={10}>
            <Typography variant="body1" sx={{color: 'text.primary'}}>
              Product image:
            </Typography>
            <UploadFileForm
              getFiles={(dropedFiles) => {
                formik.setFieldValue('photoUrl', dropedFiles);
              }}
              image={imgUrl || null}
              isCropped
              hints={['JPG, PNG or BMP only', 'File size less than 5MB only']}
              acceptedFileTypes="image/*"
              maxFiles={1}
            />
          </Grid>
          <Grid item md={10}>
            <Typography variant="body1" sx={{color: 'text.primary', mt: '1em'}}>
              Product text:
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
