import {ReactSortable} from 'react-sortablejs';
import BlockWrapper from './BlockWrapper';
import {sortableOptions} from './NewDnd';

const Container = ({block, blockIndex, setBlocks}: any) => (
  <div>
    <ReactSortable
      key={block.id}
      list={block.children}
      setList={(currentList: any) => {
        setBlocks((sourceList: any) => {
          const tempList = [...sourceList];
          const _blockIndex = [...blockIndex];
          const lastIndex = _blockIndex.pop();
          const lastArr = _blockIndex.reduce(
            (arr, i) => arr[i].children,
            tempList,
          );
          console.log(lastIndex);
          lastArr[lastIndex].children = currentList;
          return tempList;
        });
      }}
      {...sortableOptions}>
      {block.children &&
        block.children
          .filter((child: any) => child !== null)
          .map((childBlock: any, index: any) => (
            <BlockWrapper
              key={childBlock.id}
              block={childBlock}
              blockIndex={[...blockIndex, index]}
              setBlocks={setBlocks}
            />
          ))}
    </ReactSortable>
  </div>
);

export default Container;
