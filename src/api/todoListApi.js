import axiosClient from "./axiosClient"

const baseUrl = "/tasks"
const todoListApi = {
    //get detail a task
    getDetailTask: async (params) => {
        let url = `${baseUrl}/${params}`;
        return await axiosClient.get(url)
    },
    getTasks: async (params) => {
        //cai nay dung de phan trang
        let url = `${baseUrl}?_page=${params.page}`
        // if (params.filter.length > 0) {
        //     params.filter.forEach(element => {
        //         switch (element) {
        //             case "Hoàn tất":
        //                 url += '&status=1'
        //                 break;
        //             case "Bị từ chối":
        //                 url += '&status=2'
        //                 break;
        //             case "Đã hủy":
        //                 url += '&status=3'
        //                 break;
        //             case "Mới":
        //                 url += '&status=4'
        //                 break;
        //             case "Đang làm":
        //                 url += '&status=5'
        //                 break;
        //             case "Chờ xác nhận":
        //                 url += '&status=6'
        //                 break;
        //             case "Hoàn thành":
        //                 url += '&status=7'
        //                 break;
        //             case "Qúa hạn":
        //                 url += '&status=8'
        //                 break;
        //             default:
        //                 return;
        //         }
        //     });
        // }
        // if (params.advanced.length > 0) {
        //     params.advanced.forEach(element => {
        //         url += element
        //     })
        // }
        return await axiosClient.get(url, { params })
    },
    //search by params
    searchByParams: (params) => {
        let reqSearch="";
        params.mapSearch.forEach(element => {
            reqSearch+=`${element.key}=${element.value}`
        });
        let url = `/${params.object}?${reqSearch}&page=${params.page}`;
        return axiosClient.get(url)
    },
    newTask: (params) => {
        const url = "/tasks/add"
        axiosClient.post(url, params).then(q=>q)
    }

}
export default todoListApi;