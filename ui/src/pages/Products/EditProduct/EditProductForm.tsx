import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {FormikProps} from 'formik';
import Box from '@mui/material/Box';

import FormInput from '../../../components/FormComponents/FormInput';
import {Switch} from '../../../components/Switch';
import CategoryPageAutocomplete from '../../../components/Autocompletes/CategoryPageAutocomplete';
import HTMLEditor from '../../../components/HTMLEditor';
import {ProductUpdateForm} from '../../../types/products';
import {FormSelect} from '../../../components/FormComponents/FormSelect';
import {currencies} from '../../../constants/menu';
import {UploadFile} from '../../../components/UploadFile';
import {Button} from '../../../components/Button';

interface Props {
  formik: FormikProps<ProductUpdateForm>;
  img: string;
}

const EditProductForm = ({formik, img}: Props) => {
  const [imgUrl, setImgUrl] = useState<string | null | ArrayBuffer>('');
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const defaultProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  const getLocalImg = async () => {
    if (formik.values.image && formik.values.image.length > 0) {
      const response = await fetch(formik.values.image[0].preview);
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
  }, [formik.values.image]);

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
                id: 'name',
                label: 'Name',
                placeholder: 'Name',
                value: formik.values.name,
                helperText: formik.touched.name && formik.errors.name,
                error: !!formik.errors.name && formik.touched.name,
                required: true,
              },
              {
                id: 'url',
                label: 'URL',
                placeholder: 'URL',
                value: formik.values.url,
                helperText: formik.touched.url && formik.errors.url,
                error: !!formik.errors.url && formik.touched.url,
                required: true,
              },
              {
                id: 'price',
                label: 'price',
                placeholder: 'price',
                value: formik.values.price,
                helperText: formik.touched.price && formik.errors.price,
                error: !!formik.errors.price && formik.touched.price,
              },
              {
                id: 'quantity',
                label: 'Quantity',
                placeholder: 'Quantity',
                value: formik.values.quantity,
                helperText: formik.touched.quantity && formik.errors.quantity,
                error: !!formik.errors.quantity && formik.touched.quantity,
              },
              {
                id: 'seoTitle',
                label: 'SEO Title',
                placeholder: 'Title',
                value: formik.values.seoTitle,
                helperText: formik.touched.seoTitle && formik.errors.seoTitle,
                error: !!formik.errors.seoTitle && formik.touched.seoTitle,
              },
              {
                id: 'seoDescription',
                label: 'SEO Description',
                placeholder: 'Description',
                value: formik.values.seoDescription,
                helperText:
                  formik.touched.seoDescription && formik.errors.seoDescription,
                error:
                  !!formik.errors.seoDescription &&
                  formik.touched.seoDescription,
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
            <Box>
              <CategoryPageAutocomplete
                getCategory={(value) => {
                  formik.setFieldValue('category', value);
                }}
                containerStyles={{mt: '0.5em'}}
                onlyParent={false}
                initialValue={formik.values?.category || null}
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
            </Box>
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
            <Box>
              <Typography
                variant="body1"
                sx={{color: 'text.primary', mt: '1em'}}>
                Product content:
              </Typography>
              <HTMLEditor
                initialValue={formik.values.text}
                onChange={(value) => formik.setFieldValue('text', value)}
              />
            </Box>
            <Box sx={{mt: '1em'}}>
              {img && !showUploadForm && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column">
                  <Box
                    sx={{
                      border: `1px solid text.disabled`,
                      padding: '0.5em',
                      height: '12.5em',
                      width: '12.5em',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Box
                      sx={{flexGrow: 1, height: 0, cursor: 'pointer'}}
                      onClick={() => window.open(img, '_blank')}>
                      <img
                        alt="product img"
                        src={(imgUrl as any) || img}
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'top',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </Box>
                  </Box>
                  <Button
                    label="Replace Image"
                    buttonProps={{
                      variant: 'outlined',
                      onClick: () => setShowUploadForm(true),
                      sx: {
                        mt: '1em',
                      },
                    }}
                  />
                </Box>
              )}
              {(!formik.values.photoUrl || showUploadForm) && (
                <UploadFile
                  getAcceptedFiles={(dropedFiles) => {
                    formik.setFieldValue('image', dropedFiles);
                    setShowUploadForm(false);
                  }}
                  isCropped
                  hints={[
                    'JPG, PNG or BMP only',
                    'File size less than 5MB only',
                  ]}
                  acceptedFileTypes="image/*"
                  maxFiles={1}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default EditProductForm;
