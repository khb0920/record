
fetch("/user/me", {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization : localStorage.getItem("accessToken"),
            Authorization : localStorage.getItem("refreshToken"),
        },
    })
    .then((res) => res.json())
    .then((data) => {
        var user = data;
        document.getElementById("userInfo").innerHTML = `${user.userName}님 안녕하세요`;
        
    }).catch(function(error) {
    console.log(error);
    });

