import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần đề xuất
const baseUrl = "/proposal-types"
const proposalTypesApi = {
    getProposalDetailById: (proposalId) => {
        const requestUrl = `${baseUrl}/${proposalId}`
        return axiosClient.get(requestUrl)
    },
    getProposalTypeList: () => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl)
    },
    getProposalTypeDetail: (proposalTypeId) => {
        const requestUrl = `/proposal-type-detail/${proposalTypeId}`
        return axiosClient.get(requestUrl)
    },
    addProposalType: (proposalTypeInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, proposalTypeInfo)
    },
    updateProposalType: (proposalTypeInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, proposalTypeInfo)
    },
    deleteProposalType: (proposalTypeId) => {
        const requestUrl = `${baseUrl}/delete/${proposalTypeId}`
        return axiosClient.delete(requestUrl)
    },
    // Approval step
    addApprovalStep: (approvalStepInfo) => {
        const requestUrl = `/proposal-type-step-config/add`
        return axiosClient.post(requestUrl, approvalStepInfo)
    },
    updateApprovalStep: (approvalStepInfo) => {
        const requestUrl = `/proposal-type-step-config/edit`
        return axiosClient.post(requestUrl, approvalStepInfo)
    }
}
//

export default proposalTypesApi