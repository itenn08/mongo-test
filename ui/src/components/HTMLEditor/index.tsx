import {useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {convertToRaw, ContentState, EditorState} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styles from './style.module.scss';

interface Props {
  initialValue: string;
  onChange: (value: string) => void;
}

const HTMLEditor = ({onChange, initialValue}: Props) => {
  const prepareDraft = (value: string) => {
    const draft = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);

    return editorState;
  };

  const [editorState, setEditorState] = useState(
    initialValue ? prepareDraft(initialValue) : EditorState.createEmpty(),
  );

  const onEditorStateChange = (value: EditorState) => {
    const forFormik = draftToHtml(convertToRaw(value.getCurrentContent()));
    onChange(forFormik);

    setEditorState(value);
  };

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName={styles.editorWrapper}
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default HTMLEditor;
