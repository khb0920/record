

const id = document.querySelector("#id"),
    psword = document.querySelector("#pw"),
    loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);
function login(){
    const req = {
        id : id.value,
        psword : psword.value,
    };
    fetch("/login", {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
        credentials : "include",
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.response.success){
            localStorage.setItem('accessToken', res.atoken);
            localStorage.setItem('refreshToken', res.rtoken);
            location.href = "/";
        }else {
            alert(res.response.msg); 
        }
       
    })
    .catch((err) => {
        console.log("로그인 중 에러 발생");
    });
}