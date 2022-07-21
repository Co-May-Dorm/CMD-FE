import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import swal from "sweetalert";
import postsApi from "~/api/postsApi";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    posts: [],
    pagination: {
      page: 1,
      limit: 10,
      totalItem: 0,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        if (state.status !== "success") {
          state.status = "loading";
        }
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.pagination = action.payload.pagination;
        state.status = "success";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        // Nếu thêm bài viết thành công
        if (action.payload.status === "OK") {
          if (state.pagination.page === 1) {
            // Kiểm tra nếu ở trang 1 thì mới hiển thị bài viết vừa thêm lên giao diện
            // Thực hiện thêm bài viết đó vào đầu mảng dữ liệu trên redux và xóa bài viết ở cuối mảng để số bài viết trên 1 trang luôn đúng
            state.posts.unshift(action.payload.data);
            state.posts.pop();
          }

          // Hiển thị thông báo thêm bài viết thành công
          swal({
            title: "Thêm bài viết",
            text: action.payload.message,
            icon: "success",
            button: "OK",
          });
        }

        // Nếu có dữ liệu không hợp lệ
        else {
          // Hiển thị thông báo dữ liệu thông hợp lệ
          swal({
            title: "Thêm bài viết",
            text: action.payload.message,
            icon: "warning",
            button: "OK",
          });
        }
      })
      .addCase(addPost.rejected, (state, action) => {
        // Hiển thị thông báo nếu gửi request thất bại
        swal({
          title: "Thêm bài viết",
          text: action.error.message,
          icon: "error",
          button: "OK",
        });
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        // Nếu gửi request thêm bài viết thành công lên Server
        if (action.payload.status === "OK") {
          // Tìm kiếm id bài viết và thực hiện cập nhật thông tin mới cho bài viết đó
          state.posts.forEach((post, index, array) => {
            if (post.id === action.payload.id) {
              array[index] = action.payload;
            }
          });

          // Hiển thị thông báo chỉnh sửa bài viết thành công
          swal({
            title: "Chỉnh sửa bài viết",
            text: action.payload.message,
            icon: "success",
            button: "OK",
          });
        }

        // Nếu có dữ liệu không hợp lệ
        else {
          // Hiển thị thông báo dữ liệu thông hợp lệ
          swal({
            title: "Chỉnh sửa bài viết",
            text: action.payload.message,
            icon: "warning",
            button: "OK",
          });
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        // Hiển thị thông báo nếu gửi request thất bại
        swal({
          title: "Chỉnh sửa bài viết",
          text: action.error.message,
          icon: "error",
          button: "OK",
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        // Nếu gửi request xoắ bài viết thành công lên Server
        if (action.payload.status === "OK") {
          // Thực hiện lọc ra những bài viết có id khác với id bài viết cần xóa
          state.posts = state.posts.filter(
            (post) => post.id !== action.payload.id
          );

          // Hiển thị thông báo xóa bài viết thành công
          swal({
            title: "Xóa bài viết",
            text: action.payload.message,
            icon: "success",
            button: "OK",
          });
        }

        // Nếu không thể xóa bài viết
        else {
          // Hiển thị cảnh báo không thể xóa bài viết
          swal({
            title: "Xóa bài viết",
            text: action.payload.message,
            icon: "warning",
            button: "OK ",
          });
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        // Hiển thị thông báo nếu gửi request thất bại
        swal({
          title: "Xóa bài viết",
          text: action.payload.message,
          icon: "error",
          button: "OK ",
        });
      })
  },
});
export default postsSlice;

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params) => {
    const response = await postsApi.getAll(params);
    return response.data.data;
  }
);
export const addPost = createAsyncThunk("posts/addPost", async (postInfo) => {
  const response = await postsApi.add(postInfo);
  return response.data;
});
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postInfo) => {
    const response = await postsApi.update(postInfo);
    return response.data;
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    const response = await postsApi.delete(postId);
    return response.data;
  }
);
export const uploadImages = createAsyncThunk("posts/uploadImages", async (data) => {
  const response = await postsApi.uploadImages(data);
  return response.data;
});