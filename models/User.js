const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body; // 가져와서
    }
    async login() {
        const client = this.body; //바디에 아이디값 
        try {
        const dbUser = await UserStorage.getUserInfo(client.id); // 해당하는 정보를 반환  
    
        if (dbUser) {
            if (dbUser.userId === client.id && dbUser.userPw === client.pw) {
                 return { success: true,
                          data : dbUser
                          };
            }
            return {success: false, msg: "비밀번호가 틀렸습니다."};  
        }
        return { success: false, msg: "존재하지 않는 아이디입니다."};
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    async register() {
        const client = this.body;
        try{
        const dbid = await UserStorage.getUserInfo(client[0]);
        //console.log(dbid);
        if(!dbid) { 
            const response = await UserStorage.save(this.body);
            return (response);  
        }else(dbid)
            return {success: false, msg: "존재하는 아이디입니다."};
        } catch(err){
            return { success: false, msg: err };
        }
    }  
}

module.exports = User;