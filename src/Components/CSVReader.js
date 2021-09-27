import React, { } from 'react'
import { CSVReader } from 'react-papaparse'


class CSVReader1 extends React.Component{

  constructor(props) {
    super(props); 
    this.buttonRef = React.createRef()
  }

  handleOpenDialog = (e) => {
    if (this.buttonRef.current) {
      this.buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data) => {
    this.props.callbackFunc(data)
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
  }

  handleRemoveFile = (e) => {
    if (this.buttonRef.current) {
      this.buttonRef.current.removeFile(e)
    }
  }

  render() {
    return (
      <>
        <h5>Basic Upload</h5>
        <CSVReader
          ref={this.buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10
              }}
            >
              <button
                type='button'
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: '40%',
                  paddingLeft: 0,
                  paddingRight: 0
                }}
              >
                Browse file
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: '60%'
                }}
              >
                {file && file.name}
              </div>
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
                onClick={this.handleRemoveFile}
              >
                Remove
              </button>
            </aside>
          )}
        </CSVReader>
      </>
    )
  }
}

export default CSVReader1;