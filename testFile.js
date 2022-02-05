import jwtConfig from './server/utils/jwt';


class authService {
  static async checkOrRenewToken() {
    try{
      const token = jwtConfig.generateToken({ username:process.env.adminNameForAGAut, role: process.env.adminRoleForAGAut });
      console.log(token);
    } catch (error) {
    }
  }

  checkOrRenewToken();
}

export default authService;