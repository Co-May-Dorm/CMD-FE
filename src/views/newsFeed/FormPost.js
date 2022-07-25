import React, { useState } from "react";
import { Formik } from "formik";
import { Modal, Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import clsx from "clsx";
import { addPost, updatePost } from "~/redux/postsSlice";
import postsApi from "../../api/postsApi";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const refresh = {
  title: undefined,
  content: "",
  isPulished: true,
};
export default function FormPost(props) {
  const dispatch = useDispatch();
  const [contentPost, setContentPost] = useState({
    title: props.id ? props.title : undefined,
    content: props.id ? props.content : "",
    isPulished: true,
  });
  const handleClose = () => {
    props.setShow();
  };
  function uploadAdapter(loader) {
    const body = new FormData();
    return {
      upload: () => {
        return new Promise((resolve) => {
          loader.file.then((file) => {
            body.append("image", file);
            return postsApi.uploadImages(body).then((q) => {
              resolve({
                default: `http://222.255.238.159:9090/api/get-image/${q.data.data}`,
              });
            });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  const deletePlugin = (images) => {
    console.log(images);
  };
  // add new post
  const newPost = () => {
    dispatch(addPost(contentPost));
    handleClose();
    setContentPost(refresh);
  };
  //update a post
  const postUpdate = () => {
    dispatch(updatePost({ id: props.id, ...contentPost }));
    handleClose();
  };
  /* Xử lý Form với Formik */
  let initialValues = { title: "", content: "" };
  if (props.id) {
    
    initialValues = {
      title: props.title,
      content: props.content,
      isPulised: true,
    };
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Vui lòng nhập tên bài viết."),
    content: Yup.string().required("Vui lòng nhập nội dung bài viết"),
  });

  return (
    <Modal scrollable show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.id ? "CẬP NHẬT BÀI VIẾT" : "TẠO MỚI BÀI VIẾT"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, touched, errors, handleBlur, handleChange }) => (
            <Form>
              <div className="mb-4">
                <Form.Label>Tên công việc:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Tên công việc"
                  className={clsx({
                    "is-invalid": contentPost.title === "",
                  })}
                  value={contentPost.title}
                  onChange={(event) => {
                    setContentPost({
                      ...contentPost,
                      title: event.target.value,
                    });
                  }}
                  onBlur={handleBlur}
                />
                {contentPost.title === "" && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>
              <div className="mb-4">
                <Form.Label>Nội dung:</Form.Label>
                <CKEditor
                  config={{
                    extraPlugins: [uploadPlugin],
                  }}
                  editor={ClassicEditor}
                  data={contentPost.content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    // console.log(editor);
                    setContentPost({ ...contentPost, content: data });
                    // console.log({ event, editor, data });
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!contentPost.title}
          onClick={props.id ? postUpdate : newPost}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
