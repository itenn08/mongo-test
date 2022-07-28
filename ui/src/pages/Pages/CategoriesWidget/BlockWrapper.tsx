import {Box} from '@mui/system';
import Container from './Container';

const BlockWrapper = ({block, blockIndex, setBlocks}: any) => {
  // console.log(block);
  if (!block) return null;
  if (block.type === 'container') {
    return (
      <Box
        sx={{
          position: 'relative',
          background: 'white',
          padding: '20px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #00000017',
        }}>
        Parent: {block.name}
        <Container
          block={block}
          setBlocks={setBlocks}
          blockIndex={blockIndex}
        />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        position: 'relative',
        background: '#f7f7f7',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '4px',
        border: '1px dashed #00000017',
      }}>
      text: {block.name}
    </Box>
  );
};

export default BlockWrapper;
