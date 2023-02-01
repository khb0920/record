const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET);  
        next();
        //console.log(req.decoded);
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(419).json({
                code: 419,  
                msg: "토큰이 만료되었습니다.",
              });
        }
        if (error.name === "JsonWebTokenError") {
            res.send(
                `<script>
                  alert('로그인이 필요합니다');
                  location.href='/';
                </script>`
              );
          }
    }
};

exports.isNotLoggedIn = (req, res, next) => {
        if (error.name === "JsonWebTokenError") {
            next();
        } else{
            console.log("로그인한 상태임");
        }
};

