
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
        document.getElementById("myid").innerHTML = `${user.userId}`;
        document.getElementById("myname").innerHTML = `${user.userName}`;
        document.getElementById("myage").innerHTML = `${user.userAge}`;
        document.getElementById("mypos").innerHTML = `${user.userPos}`;
        document.getElementById("myimg").src = user.userImg;
        console.log(user);
    }).catch(function(error) {
    console.log(error);
    });




