import React from "react";
import { upload } from "../../actions/upload-file";
import './upload-file.css'
import { connect } from 'react-redux'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import {
  Image,
  Container
} from 'react-bootstrap'
import { cdn_url } from '../../config'

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: undefined,
      imageName: undefined,
      imageUrl: undefined,
      message: "",
      loading: false,
    };
    this.uploadHandle = this.uploadHandle.bind(this)
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
  }

  handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  uploadHandle = (files, allFiles) => {
    console.log(files.map(f => f.meta))

    if (files.length === 1) {
      const { dispatch, imageName } = this.props;
      dispatch(upload(files[0].file, imageName))
    }
    allFiles.forEach(f => f.remove())
  }

  render() {
    const { imageName, imageUrl, message } = this.props;
    const input_message = message ? `${message}. Replace File` : 'Drag a new file'

    return (
      <Container>
        {
          imageName && imageUrl ?
          <Image src={imageUrl} name={imageName} thumbnail/>
          :
          <Image src={`${cdn_url}/static/burger.jpg`} name='no image' thumbnail/>
        }
        <Dropzone
          onChangeStatus={this.handleChangeStatus}
          onSubmit={this.uploadHandle}
          accept="image/*"
          inputContent={(files, extra) => (extra.reject ? 'Image files only' : input_message)}
          styles={{
            dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
            inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
          }}
          maxFiles={1}
          maxSizeBytes = {512 * 1024}
          inputWithFilesContent={files => `${1 - files.length} more`}
          submitButtonDisabled={files => files.length < 1}
          submitButtonContent='Upload'
          disabled={files => files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status))}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { imageName, imageUrl } = state.uploadFile
  const { message } = state.message
  const output = {
    imageUrl,
    imageName,
    message
  }

  return output
}

export default connect(mapStateToProps)(UploadFile);
