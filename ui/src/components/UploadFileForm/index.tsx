import Box from '@mui/material/Box';
import {useState} from 'react';
import {FileWithPath} from 'react-dropzone';
import {Button} from '../Button';

import {UploadFile} from '../UploadFile';

export interface FileWithPreview extends FileWithPath {
  preview: string;
}
interface Props {
  getFiles?: (val: FileWithPreview[]) => void;
  hints?: string[];
  acceptedFileTypes?: 'image/*' | 'application/pdf' | '*';
  maxFiles?: number;
  isCropped?: boolean;
  image?: string | null | ArrayBuffer;
}

const UploadFileForm = ({
  getFiles,
  acceptedFileTypes,
  hints,
  isCropped,
  maxFiles,
  image,
}: Props) => {
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);

  return (
    <Box className="container" component="section">
      {image && !showUploadForm && (
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
              onClick={() => window.open(image && (image as string), '_blank')}>
              <img
                alt="product img"
                src={image as any}
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
      {(!image || showUploadForm) && (
        <UploadFile
          getAcceptedFiles={(dropedFiles: any) => {
            if (getFiles) {
              getFiles(dropedFiles);
            }
            setShowUploadForm(false);
          }}
          isCropped={isCropped}
          hints={hints}
          acceptedFileTypes={acceptedFileTypes}
          maxFiles={maxFiles}
        />
      )}
    </Box>
  );
};

export default UploadFileForm;
