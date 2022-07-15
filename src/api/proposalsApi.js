import axiosClient from "./axiosClient"

// API liên quan đến phần đề xuất
const baseUrl = "/proposals"
const proposalsApi = {
    getProposalList: (filtersParams) => {
        const proposalUrl = `${baseUrl}`
        return axiosClient.get(proposalUrl, {filtersParams})
    },
    getProposalById: (proposalId) => {
        const proposalUrl = `${baseUrl}/${proposalId}`
        return axiosClient.get(proposalUrl)
    },
    addProposal: (proposalInfo) => {
        const proposalUrl = `${baseUrl}/add`
        return axiosClient.post(proposalUrl, proposalInfo)
    },
    updateProposal: (proposalInfo) => {
        const proposalUrl = `${baseUrl}/edit`
        return axiosClient.put(proposalUrl, proposalInfo)
    },
    deleteProposal: (proposalId) => {
        const proposalUrl = `${baseUrl}/delete/${proposalId}`
        return axiosClient.delete(proposalUrl)
    }
}
//

export default proposalsApi