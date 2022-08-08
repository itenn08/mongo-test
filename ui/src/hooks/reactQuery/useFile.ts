import {useSnackbar} from '../useSnackbar';
import {BASE_URL} from '../../config';
import {FileWithPreview} from '../../components/UploadFile';
import API from '../../utils/api';

const uploadAndSave = async (file: FileWithPreview, uploadPath: string) => {
  const formData = new FormData();

  await formData.append('file', file, file.name);

  const AxiosConfig = {
    url: `${BASE_URL}/file/upload/`,
    method: 'POST',
    headers: {
      'Content-Type': file.type,
    },
    params: {
      category: uploadPath,
    },
    data: formData,
  };

  const {response} = await API(AxiosConfig);

  return response.data;
};

export const uploadImages = async (
  files: FileWithPreview[],
  uploadPath: string,
) => Promise.all(files.map((item) => uploadAndSave(item, uploadPath)));

export const useFile = () => {
  const {enqueueSnackbar} = useSnackbar();

  const uploadFile = async (files: FileWithPreview[], path: string) => {
    try {
      let filePath = '';
      if (files.length === 1) {
        filePath = await uploadAndSave(files[0], `${path}`);
      } else {
        await uploadImages(files, `${path}`);
      }

      return filePath || '';
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(
        error.response?.message ||
          'Sorry! Unable to save changes right now. Please try again.',
        {
          variant: 'error',
        },
      );
    }
  };

  return {
    uploadFile,
  };
};
