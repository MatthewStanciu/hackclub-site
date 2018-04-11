import React, { Component, Fragment } from 'react'
import MarkdownBody from 'components/MarkdownBody'
import Editor from 'draft-js-plugins-editor'
import Prism from 'prismjs'
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw
} from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import createCodeEditorPlugin from 'draft-js-code-editor-plugin'
import createPrismPlugin from 'draft-js-prism-plugin'
import { mdToDraftjs, draftjsToMd } from 'draftjs-md-converter'
import { isEmpty, debounce } from 'lodash'

const plugins = [
  createMarkdownPlugin(),
  createPrismPlugin({ prism: Prism }),
  createCodeEditorPlugin()
]

export const LS_BODY_KEY = 'new-workshop-body'
export const LS_NAME_KEY = 'new-workshop-name'

class Composer extends Component {
  state = {
    body: EditorState.createEmpty(),
    plugins
  }

  componentDidMount() {
    let value = ''
    if (localStorage) {
      try {
        value = localStorage.getItem(LS_BODY_KEY)
      } catch (err) {
        localStorage.removeItem(LS_BODY_KEY)
      }
    }
    if (!isEmpty(value)) {
      const raw = mdToDraftjs(value)
      const body = EditorState.createWithContent(convertFromRaw(raw))
      this.setState({ body })
    }
  }

  onChange = body => {
    const raw = convertToRaw(body.getCurrentContent())
    const md = draftjsToMd(raw)
    if (this.props.onChange) this.props.onChange('body', md)
    if (localStorage) this.persistData(md)
    this.setState({ body })
  }

  persistData = next => {
    try {
      const stored = localStorage.getItem(LS_BODY_KEY)
      if (isEmpty(next) && !isEmpty(stored)) {
      } else {
        localStorage.setItem(LS_BODY_KEY, next)
      }
    } catch (err) {
      localStorage.removeItem(LS_BODY_KEY)
    }
  }

  render() {
    const { saved, body } = this.state
    return (
      <MarkdownBody>
        <Editor
          editorState={body}
          plugins={this.state.plugins}
          spellCheck={true}
          autoCapitalize="sentences"
          autoComplete="on"
          autoCorrect="on"
          stripPastedStyles={true}
          id="body"
          placeholder="Write in Markdown…"
          {...this.props}
          onChange={this.onChange}
        />
      </MarkdownBody>
    )
  }
}

export default Composer
