import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {ChangeEvent} from 'react';
import useTheme from '@mui/material/styles/useTheme';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import {CheckCircleRounded} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import FormInput from '../FormComponents/FormInput';
import {FileWithPreview} from '.';

interface Props {
  oneMbInByes: number;
  onKbinBytes: number;
  file: FileWithPreview;
  onNameChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isEditingFileName: boolean;
  currentEditingFileName: string;
  newFileName: string;
  onDeleteFile: () => void;
  onCancelEdit: () => void;
  onSaveFileName: () => void;
  onEditClick: () => void;
}

export const Thumb = ({
  oneMbInByes,
  onKbinBytes,
  file,
  onNameChange,
  isEditingFileName,
  currentEditingFileName,
  newFileName,
  onCancelEdit,
  onSaveFileName,
  onEditClick,
  onDeleteFile,
}: Props) => {
  const theme = useTheme();
  return (
    <Box sx={{mr: '1em', display: 'flex', mt: '0.3em'}}>
      {file.type.split('/')[0] === 'image' ? (
        <img alt="" width={80} height={80} src={file.preview} />
      ) : (
        <FileCopyIcon
          sx={{fontSize: '4rem', color: theme.palette.text.secondary}}
        />
      )}

      <Box
        sx={{
          mx: '1em',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        {isEditingFileName && file.name === currentEditingFileName ? (
          <Box sx={{display: 'flex'}}>
            <FormInput
              props={{
                value: newFileName,
                size: 'small',
                fullWidth: true,
                type: 'text',
                onChange: onNameChange,
              }}
            />
            <IconButton
              onClick={onSaveFileName}
              edge="start"
              sx={{mt: '0.7em', ml: '0.2em'}}>
              <CheckCircleRounded
                sx={{mt: '-0.8em', color: theme.palette.primary.main}}
              />
            </IconButton>

            <IconButton
              onClick={onCancelEdit}
              edge="start"
              sx={{mt: '0.7em', ml: '0.1em'}}>
              <CancelIcon
                sx={{mt: '-0.8em', color: theme.palette.primary.main}}
              />
            </IconButton>
          </Box>
        ) : (
          <Typography>{file.name}</Typography>
        )}

        <Typography>
          {file.size >= oneMbInByes
            ? `${(file.size / oneMbInByes).toFixed(2)} Mb`
            : `${(file.size / onKbinBytes).toFixed(2)} Kb`}
        </Typography>
      </Box>

      {!isEditingFileName ? (
        <>
          <IconButton onClick={onEditClick} edge="start">
            <EditIcon sx={{mt: '-0.8em'}} />
          </IconButton>
          <IconButton onClick={onDeleteFile} edge="start">
            <DeleteIcon sx={{ml: '1em'}} />
          </IconButton>
        </>
      ) : null}
    </Box>
  );
};
