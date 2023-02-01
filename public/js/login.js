

const id = document.querySelector("#id"),
    pw = document.querySelector("#pw"),
    loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);
function login(){
    const req = {
        id : id.value,
        pw : pw.value,
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
            localStorage.setItem('accessToken', res.token);
            location.href = "/";
        }else {
            alert(res.response.msg); 
        }
       //console.log(res.token);
    })
    .catch((err) => {
        console.log("로그인 중 에러 발생");
    });
}