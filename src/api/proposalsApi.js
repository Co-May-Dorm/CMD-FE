import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần đề xuất
const baseUrl = "/proposals"
const proposalsApi = {
    getProposalList: (params, filters) => {
        const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getProposalListCreatedByMe: (params, filters) => {
        const requestUrl = `${baseUrl}/createdByMe?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getProposalListApproveByMe: (params, filters) => {
        const requestUrl = `${baseUrl}/approveByMe?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getProposalDetailById: (proposalId) => {
        const requestUrl = `${baseUrl}/${proposalId}`
        return axiosClient.get(requestUrl)
    },
    addProposal: (proposalInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, proposalInfo)
    },
    updateProposal: (proposalInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, proposalInfo)
    },
    deleteProposal: (proposalId) => {
        const requestUrl = `${baseUrl}/delete/${proposalId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default proposalsApi