const usersService = require("@services/usersService");
const rolesService = require("@services/rolesService");

const {ERROR} = require("@constants/constants");

class UsersController {
    async getUsers(req, res) {
        try {
            const allUsers = await usersService.getAllUsers();
            const newAllUserList = allUsers.map(item => {
                return {
                    id: item.user_id,
                    name: item.user_login,
                    isActive: item.is_active,
                };
            });

            const results = newAllUserList.map(async item => {
                item.role = await rolesService.getUserRoles(item.id);
                return item;
            });

            Promise.all(results).then(userList => {
                res.status(200).send(userList);
            });
        } catch (e) {
            res.status(404).send({message: ERROR});
        }
    }

    async changeUserState(req, res) {
        try {
            const {userId} = req.params;
            const {state} = req.body;
            await usersService.changeActiveness(userId, state);
            res.status(200).send(state);
        } catch (e) {
            res.status(404).send({message: ERROR});
        }
    }
}

module.exports = new UsersController();
