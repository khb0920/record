var boardUrl = window.location.href.split("/");
var boardNum = boardUrl[boardUrl.length-1];
fetch(`/board/detail/${boardNum}`, {
    method : "GET"
})
.then((res) => res.json())
.then((data) => {
    const boardData = data.boardData;
    const boardUser = data.userId;
    document.getElementById("name").innerHTML=`${boardData.boardUser}`;
    document.getElementById("title").innerHTML=`${boardData.boardTitle}`;
    document.getElementById("contents").innerHTML=`${boardData.boardContents}`;
    document.getElementById("time").innerHTML=`${boardData.boardTime}`;
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



