var boardUrl = window.location.href.split("/");
var boardNum = boardUrl[boardUrl.length-1];
fetch(`/board/detail/${boardNum}`, {
    method : "GET"
})
.then((res) => res.json())
.then((data) => {
    const boardData = data.boardData;
    const boardUser = data.userId;
    document.getElementById("name").innerHTML=`작성자 : ${boardData.boardUser}`;
    document.getElementById("title").innerHTML=`제목 : ${boardData.boardTitle}`;
    document.getElementById("contents").innerHTML=`내용 : ${boardData.boardContents}`;
    document.getElementById("time").innerHTML=`작성시간 :${boardData.boardTime}`;
    if(boardData.boardImg===null){
        document.getElementById("img").display = "none";
    }else{
        document.getElementById("img").src=`${boardData.boardImg}`;
    };
    document.getElementById("updateBtn").addEventListener("click", updateContents);
    function updateContents(){
        if(boardData.boardUser==boardUser){
            location.href = `/updateContentspage/${boardData.boardNum}`;        
        }
        else{
            alert("작성자만 수정 가능합니다.");
        }
    }
}).catch((err) => {
    console.error(err);

}); 



