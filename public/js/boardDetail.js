var boardUrl = window.location.href.split("/");
var boardNum = boardUrl[boardUrl.length-1];
fetch(`/board/detail/${boardNum}`, {
    method : "GET"
})
.then((res) => res.json())
.then((data) => {
    const boardData = data.boardData;
    const boardUser = data.userId;
    console.log(boardData.boardImg);
    document.getElementById("name").innerHTML=`<h4>작성자</h4> ${boardData.boardUser}`;
    document.getElementById("title").innerHTML=`<h4>제목</h4> ${boardData.boardTitle}`;
    document.getElementById("contents").innerHTML=`<h4>내용</h4> ${boardData.boardContents}`;
    document.getElementById("time").innerHTML=`<h4>작성시간</h4> ${boardData.boardTime}`;
    if(boardData.boardImg===null){
        document.getElementById("img").display = "none";
    }else{
        document.getElementById("img").src=`https://hbhb-bucket.s3.ap-northeast-2.amazonaws.com/${boardData.boardImg}`;
    };
    document.getElementById("updateBtn").addEventListener("click", updateContents);
    function updateContents(){
        if(boardData.boardUser==boardUser){
            location.href = `/updateContentspage/${boardData.boardNum}`;        
        }
        else{
            alert("작성자만 수정 가능합니다.");
        }
    };

    const commentData = data.commentData;
    const comment = document.getElementById("comment-page");
    for(var i=0; i<commentData.length; i++){
        var cboardData = commentData[i];
        document.write ="<tr>";
        var newRow = comment.insertRow();
        for(var j=0; j<1; j++){
            var newCell1 = newRow.insertCell();
            var newCell2 = newRow.insertCell();
            var newCell3 = newRow.insertCell();
            newCell1.innerText = cboardData.commentDetail;
            newCell2.innerText = cboardData.userId;
            newCell3.innerText = cboardData.commentTime;
        }
    document.write ="</tr>";
    }

}).catch((err) => {
    console.error(err);

}); 

document.getElementById("writeComment").addEventListener("click", writeComment);

function writeComment(){
    const comment = document.getElementById("comment").value;

    if(!comment) return alert("댓글을 작성하여 주세요");

    fetch("/board/comment", {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
           comment: comment,
           boardNum: boardNum,
        })
    })
        .then((res) => res.json())
        .then((res) => {
           if(res.success){
            alert("댓글등록 완료");
            location.href = `/board/detailpage/${boardNum}`;
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error("댓글등록 중 에러 발생");
    }); 
}




