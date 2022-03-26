export interface File {
  id: string;
  senderFirstName: string;
  senderLastName: string;
  name: string;
  createdAt: Date;
  url: string;
}

export interface FileResponse {
  id: string;
  senderFirstName: string;
  senderLastName: string;
  name: string;
  createdAt: string;
  url: string;
}

export interface UpdateFile {
  formData: FormData;
  fromId: string;
  toId: string;
  name: string;
  senderFirstName: string;
  senderLastName: string;
}

export interface UpdateFileResponse {
  id: string;
  url: string;
}
