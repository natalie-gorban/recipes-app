import http from "../helpers/http-common";
import authHeader from './auth-header';

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload", formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFileUrl(file) {
    return http.get(`/file_url/:${file}`);
  }

  download(file) {
    return http.get(`/file/:${file}`);
  }
}

export default new UploadFilesService();
