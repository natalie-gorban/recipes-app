import http from "../helpers/http-common";
import authHeader from './auth-header';

class UploadFileService {
  upload(file, name) {
    let formData = new FormData();

    formData.append("file", file);
    console.log('formdata from UploadFileService', formData.getAll('originalname'))
    if (name) {
      formData.set("originalname", name)
    }
    return http.post("/upload", formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    })
  }
}

export default new UploadFileService();
