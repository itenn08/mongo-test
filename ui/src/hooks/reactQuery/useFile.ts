// import {axiosClient} from '../../utils/axios';
import {useSnackbar} from '../useSnackbar';
import {BASE_URL} from '../../config';
import {FileWithPreview} from '../../components/UploadFile';
import API from '../../utils/api';

// const uploadFileToServer = async (file: any[]): Promise<StringValue> => {
//   console.log('file upload', file);
// const response = await axiosClient.post<any>(`${BASE_URL}/file/upload`, {
//   file: {
//     ...file[0],
//   },
// });
// return response.data;
// };

const getArrayBuffer = (file: FileWithPreview) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const uploadAndSave = async (file: FileWithPreview, uploadPath: string) => {
  console.log('uploadPath', uploadPath);
  // const [arrayBuffer] = await Promise.all([
  //   getArrayBuffer(file) as unknown as ArrayBuffer,
  // ]);
  const arrayBuffer = await getArrayBuffer(file);
  console.log('arrayBuffer', arrayBuffer);

  const formData = new FormData();
  console.log('file', file);

  await formData.append('file', file, file.name);

  console.log('file.type', file.type);

  const AxiosConfig = {
    url: `${BASE_URL}/file/upload/`,
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'Content-Type': file.type,
    },
    data: formData,
  };

  const {response} = await API(AxiosConfig);

  // const response = await axiosClient({
  //   headers: {
  //     'Content-Type': file.type,
  //   },
  // }).post<any>(`${BASE_URL}/file/upload`, {
  //   body: {
  //     file: arrayBuffer,
  //   },
  // });
  // console.log('response', response);
  return response.data;

  // await fetch(`${BASE_URL}/file/upload`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': file.type,
  //   },
  //   body: arrayBuffer,
  // });
};

export const uploadImages = async (
  files: FileWithPreview[],
  uploadPath: string,
) => Promise.all(files.map((item) => uploadAndSave(item, uploadPath)));

export const useFile = () => {
  const {enqueueSnackbar} = useSnackbar();

  const uploadFile = async (files: FileWithPreview[]): Promise<void> => {
    try {
      await uploadImages(files, 'products/');

      //   if (status === 200) {
      //     enqueueSnackbar(`order ${id} updated successfully!`, {
      //       variant: 'success',
      //     });
      //     queryClient.invalidateQueries(queryKeys.getOrders);
      //     if (onSuccess) {
      //       onSuccess();
      //     }
      //   }
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
