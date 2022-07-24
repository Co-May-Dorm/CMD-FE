import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import swal from "sweetalert"

import proposalsApi from "~/api/proposalsApi"

const proposalsSlice = createSlice({
    name: "proposals",
    initialState: {
        status: "idle",
        proposals: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0,
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProposalList.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getProposalList.fulfilled, (state, action) => {
                state.proposals = action.payload.proposals
                state.pagination = action.payload.pagination
                state.status = "success"
            })
            .addCase(getProposalList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(getProposalListCreatedByMe.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getProposalListCreatedByMe.fulfilled, (state, action) => {
                state.proposals = action.payload.proposals
                state.pagination = action.payload.pagination
                state.status = "success"
            })
            .addCase(getProposalListCreatedByMe.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(getProposalListApproveByMe.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getProposalListApproveByMe.fulfilled, (state, action) => {
                state.proposals = action.payload.proposals
                state.pagination = action.payload.pagination
                state.status = "success"
            })
            .addCase(getProposalListApproveByMe.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addProposal.fulfilled, (state, action) => {
                // Nếu thêm đề xuất thành công
                if (action.payload.status === "OK") {
                    if (state.pagination.page === 1) {  // Kiểm tra nếu ở trang 1 thì mới hiển thị đề xuất vừa thêm lên giao diện
                        // Thực hiện thêm đề xuất đó vào đầu mảng dữ liệu trên redux và xóa đề xuất ở cuối mảng để số đề xuất trên 1 trang luôn đúng
                        state.proposals.unshift(action.payload.data)
                        state.proposals.pop()
                    }

                    // Hiển thị thông báo thêm đề xuất thành công
                    swal({
                        title: "Thêm đề xuất",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Thêm đề xuất",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK",
                    })
                }
            })
            .addCase(addProposal.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi proposal thất bại
                swal({
                    title: "Thêm đề xuất",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(updateProposal.fulfilled, (state, action) => {
                // Nếu gửi proposal thêm đề xuất thành công lên Server
                if (action.payload.status === "OK") {
                    // Tìm kiếm id đề xuất và thực hiện cập nhật thông tin mới cho đề xuất đó
                    state.proposals.forEach((proposal, index, array) => {
                        if (proposal.id === action.payload.id) {
                            array[index] = action.payload
                        }
                    })

                    // Hiển thị thông báo chỉnh sửa đề xuất thành công
                    swal({
                        title: "Chỉnh sửa đề xuất",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Chỉnh sửa đề xuất",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK",
                    })
                }
            })
            .addCase(updateProposal.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi proposal thất bại
                swal({
                    title: "Chỉnh sửa đề xuất",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(deleteProposal.fulfilled, (state, action) => {
                // Nếu gửi proposal xoắ đề xuất thành công lên Server
                if (action.payload.status === "OK") {
                    // Thực hiện lọc ra những đề xuất có id khác với id đề xuất cần xóa
                    state.proposals = state.proposals.filter((proposal) => proposal.id !== action.payload.data)

                    // Hiển thị thông báo xóa đề xuất thành công
                    swal({
                        title: "Xóa đề xuất",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu không thể xóa đề xuất
                else {
                    // Hiển thị cảnh báo không thể xóa đề xuất
                    swal({
                        title: "Xóa đề xuất",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK ",
                    })
                }
            })
            .addCase(deleteProposal.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi proposal thất bại
                swal({
                    title: "Xóa đề xuất",
                    text: action.payload.message,
                    icon: "error",
                    button: "OK ",
                })
            })
    },
})
export default proposalsSlice

export const getProposalList = createAsyncThunk("proposals/getProposalList", async (params) => {
    const response = await proposalsApi.getProposalList(params.params, params.filters)
    return response.data.data
})
export const getProposalListCreatedByMe = createAsyncThunk("proposals/getProposalListCreatedByMe", async (params) => {
    const response = await proposalsApi.getProposalListCreatedByMe(params.filtersBase, params.filtersAdvanced)
    return response.data.data
})
export const getProposalListApproveByMe = createAsyncThunk("proposals/getProposalListApproveByMe", async (params) => {
    const response = await proposalsApi.getProposalListApproveByMe(params.params, params.filters)
    return response.data.data
})
export const addProposal = createAsyncThunk("proposals/addProposal", async (proposalInfo) => {
    const response = await proposalsApi.addProposal(proposalInfo)
    return response.data
})
export const updateProposal = createAsyncThunk("proposals/updateProposal", async (proposalInfo) => {
    const response = await proposalsApi.updateProposal(proposalInfo)
    return response.data
})
export const deleteProposal = createAsyncThunk("proposals/deleteProposal", async (proposalId) => {
    const response = await proposalsApi.deleteProposal(proposalId)
    return response.data
})
