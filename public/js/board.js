fetch("/board/index", {
    method : "GET"
})
.then((res) => res.json())
.then((data) => {
    const board = document.getElementById("board");
    for(var i=0; i<data.length; i++){
        var boardData = data[i];
        document.write ="<tr>";
        var newRow = board.insertRow();
        for(var j=0; j<1; j++){
            var newCell1 = newRow.insertCell();
            var newCell2 = newRow.insertCell();
            var newCell3 = newRow.insertCell();
            newCell1.innerHTML = `<a href='#'>${boardData.boardTitle}</a>`;
            newCell2.innerText =boardData.boardUser;
            newCell3.innerText =boardData.boardTime;
        }
    document.write ="</tr>";
    }
   
});





    
   
