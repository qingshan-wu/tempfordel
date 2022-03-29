import React, { useEffect, useState } from 'react'
import './App.css';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import Layout from './Layout';

function App() {
  const [state, setState] = useState({
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
    outputHTML: '<p></p>'
  })

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
    }))
  }, [])

  const hdChange = (editorState) => {
    setState({
      editorState,
      outputHTML: editorState.toHTML()
    })
  }

  return (
    <div className="App">
      <Layout>
        <div className='editor-top'>
          <div className="output-content">{state.outputHTML}</div>
          <h5>👆输出内容</h5>
        </div>
        <div className="editor-wrapper">
          <BraftEditor
            controls={[]}
            value={state.editorState}
            onChange={hdChange}
            contentStyle={{ height: 200 }}
          />
        </div>
      </Layout>
    </div>
  );
}

export default App;
