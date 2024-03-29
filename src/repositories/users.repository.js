export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getUserByEmail = async (email) => {
    return await this.dao.getUserByEmail(email);
  };

  save = async (user) => {
    return await this.dao.save(user);
  };

  getAll = async () => {
    return await this.dao.getAll();
  };

  update = async (user) => {
    return await this.dao.update(user)
  }

  getUserById = async (uid) => {
    return await this.dao.getUserById(uid)
  }

  deleteOldUsers = async (users) => {
    return await this.dao.deleteOldUsers(users)
  }
}
