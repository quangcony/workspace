import axiosApiInstance from "../utils/axiosClient";

const relationshipUserApi = {
    getAllRelationshipUsers: () => {
        const path = `/userRelationship/getAll`;
        return axiosApiInstance.get(path);
    },
    getRelationshipUserById: (id) => {
        const path = `/userRelationship/getUserRelationship/${id}`;
        return axiosApiInstance.get(path);
    },
    createRelationshipUser: (data) => {
        const path = `/userRelationship/createUserRelationship`;
        return axiosApiInstance.post(path, data);
    },
    updateRelationshipUser: (data, id) => {
        const path = `/userRelationship/updateUserRelationship/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteRelationshipUser: (id) => {
        const path = `/userRelationship/deleteUserRelationship/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default relationshipUserApi;