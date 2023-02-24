
document.getElementById('btn').addEventListener("click", register);

function register(e) {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const psword = document.getElementById('psword').value;
    const confirmPsword = document.getElementById('confirm-psword').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const position = document.getElementById('position').value;
    const img = document.getElementById('img').files[0];

    if (psword !== confirmPsword)  return alert("비밀번호가 일치하지 않습니다.");
    if (!id) return alert("아이디를 입력해주십시오.");
    if (!name) return alert("이름을 입력해주십시오.");
    if (!age) return alert("나이를 입력해주십시오.");
    if (!position) return alert("포지션을 입력해주십시오.");
    if (!img) return alert("프로필 사진은 필수입니다.");

    const formData = new FormData();

    formData.append('id', id);
    formData.append('psword', psword);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('position', position);
    formData.append('img', img );

    fetch("/register", {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
           if(res.success){
            alert("회원가입 완료");
            location.href ="/";
        } else {
            alert(res.msg);

        }
    })
    .catch((err) => {
        console.error("회원가입 중 에러 발생");
    }); 
}