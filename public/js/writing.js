document.getElementById("writeBtn").addEventListener("click", writing);

function writing(){

        const title = document.getElementById('title').value;
        const contents = document.getElementById('contents').value;
        var img = document.getElementById('img').files[0];
    
        if (!title) return alert("제목을 입력해주십시오.");
        if (!contents) return alert("내용을 입력해주십시오."); 
        if(!img){
            var img = null;
        }else{
            var img = document.getElementById('img').files[0];
        }

        const formData = new FormData();
    
        formData.append('title', title);
        formData.append('contents', contents);
        formData.append('img', img);
        fetch("/board/writing", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
               if(res.success){
                alert("글 작성 완료");
                location.href ="/board";
            } else {
                alert(res.msg);
    
            }
        })
        .catch((err) => {
            console.error("글 작성 중 에러 발생");
        }); 
}