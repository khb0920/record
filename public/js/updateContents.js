var boardUrl = window.location.href.split("/");
var boardNum = boardUrl[boardUrl.length-1];

document.getElementById("updateBtn").addEventListener("click", updateContents);

function updateContents(){

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
        formData.append('Num', boardNum);
        fetch("/board/updateContents", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
               if(res.success){
                alert("글 수정 완료");
                location.href =`/board/detailpage/${boardNum}`;
            } else {
                alert(res.msg);
                
            }
        })
        .catch((err) => {
            console.error("글 수정 중 에러 발생");
        }); 
}