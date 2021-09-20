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
import { cdn_url } from '../../helpers/config'

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
    this.upload = this.upload.bind(this)
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
  }

  handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  upload = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    this.setState({
      loading: true,
    });

    if (files.length === 1) {
      const { dispatch } = this.props;
      dispatch(upload(files[0].file))
          .then((req, res) => {
            this.setState({
              message: res.message,
              imageName: res.imageName,
              imageUrl: res.imageUrl,
              loading: false
            })
          })
          .catch((error) => {
            console.error(error)
            this.setState({
              loading: false
            });
          })
    }
    allFiles.forEach(f => f.remove())
  }

  render() {
    const { imageName, imageUrl } = this.props;

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
          onSubmit={this.upload}
          accept="image/*"
          inputContent={(files, extra) => (extra.reject ? 'Image files only' : 'Drag Files')}
          styles={{
            dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
            inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
          }}
          maxFiles={1}
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
  console.log(state)
  const { imageName, imageUrl } = state.uploadFile
  const output = {
    imageUrl,
    imageName,
  }

  console.log('mapStateToProps', state, output)
  return output
}

export default connect(mapStateToProps)(UploadFile);
