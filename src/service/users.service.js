import client from "./axios";

const UsersService = {
    getUserList(filterList, search) {
        let filters = filterList.map((filterItem) => {
            return filterItem.expression;
        });

        if (search.item) filters.push(search.item.expression);

        let filterQuery = {
            FilterGroups: filters
        };

        return client().post("/user/list", filterQuery);
    },
    getUserTypes() {
        return client().get("/user/type/list");
    },
    getUserInfo(userId) {
        return client().get("/user/info/" + userId);
    },
    addUser(user) {
        return client().post("/user/add", user);
    },
    updateUser(userId, user) {
        return client().put("/user/update/" + userId, user);
    },
    updateUserStatus(userId, status) {
        return client().put("/user/update/" + userId + "/status/" + status);
    },
    updateUserActivation(userId, status) {
        return client().put("/user/update/" + userId + "/activation/" + status);
    },
    deleteUser(userId) {
        return client().delete("/user/delete/" + userId);
    }
};
export default UsersService;
