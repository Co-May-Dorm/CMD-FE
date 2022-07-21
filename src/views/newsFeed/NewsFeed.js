import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Modal, Button } from "react-bootstrap";
import AppSearch from "~/components/AppSearch";
import Post from "./Post";
import { postsSelector } from "~/redux/selectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "~/redux/postsSlice";
import Loading from "~/components/Loading";
import icon_edit from "../../assets/icons/edit.svg";
// import img from "/var/lib/jenkins/workspace/CMD-image/testimage.jpg"
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { uploadImages } from "~/redux/postsSlice";
import { addPost } from "~/redux/postsSlice";
// import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
const hastags = [
  { nameHastag: "hastag1", numFeeds: 123 },
  { nameHastag: "hastag2", numFeeds: 13 },
  { nameHastag: "hastag3", numFeeds: 12 },
  { nameHastag: "hastag4", numFeeds: 2 },
];

export default function NewsFeed() {
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector).posts;
  const status = useSelector(postsSelector).status;
  const [filter, setFilter] = useState({ content: "" });
  const [contentPost, setContentPost] = useState({title:"", content:"", isPulised:true})
  // console.log("từ reducer", posts);
  useEffect(() => {
    dispatch(fetchPosts(filter)); // Dispatch action fetchEmployees với tham số truyền vào là filters
  }, []);
  //search posts
  useEffect(() => {
    const search = setTimeout(() => {
      dispatch(fetchPosts(filter));
    }, 1000);
    return () => clearTimeout(search);
  }, [filter]);
  const searchPost = (input) => {
    setFilter({ ...filter, content: input });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // //upload adapter
  // const uploadAdapter = (loader) => {
  //   const body = new FormData();
  //   loader.file.then((file) => {
  //     body.append("uploadImages", file);
  //     uploadImages(body);
  //   });
  //   return;
  // };
  // //upload plugin
  // const uploadPlugin = (editor) => {
  //   editor.plugins.get("FileReponsitory").createUploadAdapter = (loader) => {
  //     return uploadAdapter(loader);
  //   };
  // };
  const API_URl = "https://noteyard-backend.herokuapp.com";
  // const UPLOAD_ENDPOINT = "api/blogs/uploadImg";
  const UPLOAD_ENDPOINT="/post/add"
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("uploadImg", file);
            fetch(`${API_URl}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: `${API_URl}/${res.url}` });
                console.log("body", body)
              })
              .catch((err) => {
                reject(err);
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
  const them=()=>{
    addPost(contentPost)
  }
  return (
    <Container fluid>
      <Container fluid>
        <div className="row justify-content-xl-between justify-content-end align-items-center">
          <Modal scrollable show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>TẠO MỚI BÀI VIẾT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CKEditor
                // plugins={[CKFinder]}
                config={{
                  // ckfinder: {
                  //   uploadUrl: "https://noteyard-backend.herokuapp.com/api/blogs/uploadImg",
                  // },
                  extraPlugins: [uploadPlugin],
                }}
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContentPost({...contentPost, content: data})
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={them}>OK</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <hr />
      </Container>
      <Container style={{ marginTop: "-15px" }}>
        <div
          className="row"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="col-sm-3 d-none d-sm-none d-md-block bg-white h-100"
            style={{ height: "100vh", position: "fixed", left: 0 }}
          >
            <div className="mt-3 h-100">
              <img src="/var/lib/jenkins/workspace/CMD-image/testimage.jpg"></img>
              <Row>
                <AppSearch value={filter.content} onSearch={searchPost} />
              </Row>
              <Row className="mt-4 px-4">
                <Row className="fw-bold fs-5 pe-auto">Hashtag nổi bật</Row>
                {hastags.map((i, key) => (
                  <Row
                    key={key}
                    className="fw-bold ps-0 mt-1 mb-1"
                    style={{ cursor: "pointer" }}
                  >
                    <Col>#{i.nameHastag}</Col>
                    <Col className="text-grayBlue fw-light">{i.numFeeds}</Col>
                  </Row>
                ))}
              </Row>
            </div>
          </div>
          <div className="col-md-6" style={{ position: "sticky" }}>
            <div className="mainNews">
              {status === "loading" ? (
                <Loading />
              ) : status === "error" ? (
                <div className="text-center py-3">
                  Có lỗi trong quá trình lấy dữ liệu từ Server
                </div>
              ) : (
                posts.map((post) => {
                  return (
                    <Post
                      myKey={post.id}
                      creator={post.creator}
                      html={post.content}
                      createDate={post.createDate}
                    />
                  );
                })
              )}
            </div>
          </div>
          <div
            className="col-md-3 d-none d-sm-none d-md-block p-4"
            style={{ height: "100vh", position: "fixed", right: 0 }}
          >
            <div className="create_post d-flex">
              <button className="bg-gradient" onClick={handleShow}>
                <img alt="icon_edit" src={icon_edit}></img>
              </button>
              <div className="fw-bold fs-5">Tạo bài viết mới</div>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
}
