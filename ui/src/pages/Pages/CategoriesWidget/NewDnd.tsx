import {Button} from '@mui/material';
import React, {useState} from 'react';
import {ReactSortable} from 'react-sortablejs';

import {Category} from '../../../types/categories';
import BlockWrapper from './BlockWrapper';

export const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
  group: 'shared',
};

type Props = {
  categories: Category[];
  onUpdateCategories: (items: Category[]) => void;
};

const NewDnd = ({categories, onUpdateCategories}: Props) => {
  //   const [blocks, setBlocks] = useState([
  //     {
  //       id: 1,
  //       content: 'item 1',
  //       parent_id: null,
  //       type: 'container',
  //       children: [
  //         {
  //           id: 2,
  //           content: 'item 2',
  //           width: 3,
  //           type: 'text',
  //           parent_id: 1,
  //         },
  //         {
  //           id: 3,
  //           content: 'item 3',
  //           width: 3,
  //           type: 'text',
  //           parent_id: 1,
  //         },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       content: 'item 2',
  //       parent_id: null,
  //       type: 'container',
  //       children: [
  //         {
  //           id: 5,
  //           content: 'item 5',
  //           width: 3,
  //           parent_id: 2,
  //           type: 'container',
  //           children: [
  //             {id: 8, content: 'item 8', width: 6, type: 'text', parent_id: 5},
  //             {id: 9, content: 'item 9', width: 6, type: 'text', parent_id: 5},
  //           ],
  //         },
  //         {
  //           id: 6,
  //           content: 'item 6',
  //           width: 2,
  //           type: 'text',
  //           parent_id: 2,
  //         },
  //         {
  //           id: 7,
  //           content: 'item 7',
  //           width: 2,
  //           type: 'text',
  //           parent_id: 2,
  //         },
  //       ],
  //     },
  //   ]);
  const [blocks, setBlocks] = useState(categories);
  console.log('blocks', blocks);
  return (
    <div>
      <ReactSortable list={blocks} setList={setBlocks} {...sortableOptions}>
        {blocks
          .filter((block) => block !== null)
          .map((block, blockIndex) => (
            <BlockWrapper
              key={block.id}
              block={block}
              blockIndex={[blockIndex]}
              setBlocks={setBlocks}
            />
          ))}
      </ReactSortable>
      <Button onClick={() => onUpdateCategories(blocks)} variant="contained">
        Save
      </Button>
    </div>
  );
};

export default NewDnd;
