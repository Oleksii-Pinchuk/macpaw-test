import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import "./UploadModal.scss";

type Props = {
  setOpenModal: Dispatch<SetStateAction<boolean>>,
};

const UploadModal: React.FC<Props> = ({ setOpenModal }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadErrorExist, setUploadErrorExist] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadErrorExist(false);
    setUploaded(false);
  };

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setUploaded(false);
    let image = event.dataTransfer.files[0];
    handleFile(image);
  };

  const uploadImage = async (image: File) => {
    const data = new FormData()
    data.append('file', image)
    data.append('sub_id', 'User-123')

    const response = await fetch('https://api.thecatapi.com/v1/images/upload',
      {
        headers: {
          'x-api-key': 'c03feea5-7160-4ef0-a72f-c7e33b4c4895',
        },
        method: 'POST',
        body: data,
      });

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  };

  const onSubmitUpload = async () => {
    setUploading(true);

    try {
      await uploadImage(imageFile as File);
      setImageFile(null);
      setPreviewUrl('');
      setUploaded(true);
      setUploadErrorExist(false);
    } catch (error) {
      setUploaded(false);
      setUploadErrorExist(true);
    }

    setUploading(false);
  };

  const onHandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      return handleFile(event.target.files[0]);
    }
  }

  const onHandleInputClick = () => fileInput.current?.click();

  const onHandleCloseButton = () => {
    setOpenModal(false);

    const body = document.querySelector("body") as HTMLBodyElement;
    body.style.overflow = "auto";
  };

  return (
    <div className="upload__background">
      <div className="upload__container">
        <h2 className="upload__title">
          {`Upload a .jpg or .png Cat Image`}
        </h2>
        <p className="upload__description">Any uploads must comply with the upload guidelines or face deletion.</p>

        <div
          className="upload__area area"
          onDragOver={handleOnDragOver}
          onDrop={handleOnDrop}
          onClick={onHandleInputClick}
        >
          <input
            hidden
            type="file"
            accept='image/*'
            ref={fileInput}
            onChange={onHandleInputChange}
          />
          {previewUrl ? (
            <img src={previewUrl} alt="preview" className="upload__preview" />
          ) : (
            <p className="upload__instruction">
              <span className="upload__instruction--highlited">Drag here</span> your file or <span className="upload__instruction--highlited">Click here</span> to upload
            </p>
          )}
        </div>

        {!imageFile && (
          <p className="upload__selected">No file selected</p>
        )}

        {imageFile && (
          <p className="upload__selected">{`Image File Name: ${imageFile?.name}`}</p>
        )}

        {(imageFile && !uploading && !uploadErrorExist) && (
          <button
            className="upload__button upload__button--upload"
            onClick={onSubmitUpload}
          >
            upload photo
          </button>
        )}

        {(imageFile && uploading) && (
          <button className="upload__button upload__button--uploading">
            <span className="spiner spiner--small"></span>
            uploading
          </button>
        )}

        {(!uploadErrorExist && uploaded) && (<p className="upload__status upload__status--found">Thanks for the Upload - Cat found!</p>)}

        {(uploadErrorExist && imageFile) && (<p className="upload__status upload__status--not-found" >No Cat found - try a different one</p>)}

        <button className="upload__button upload__button--close" onClick={onHandleCloseButton}></button>
      </div>
    </div >
  );
};

export default UploadModal;