fetch("/record", {
    method : "GET"
})
.then((res) => res.json())
.then((data) => {
    const rdata = document.getElementById("rdata");
    for(var i=0; i<data.length; i++){
        document.write =("<tr>");
        var record = data[i];
        var newRow = rdata.insertRow();
        for(var j=0; j<1; j++){
            var newCell1 = newRow.insertCell(0);
            var newCell2 = newRow.insertCell(1);
            var newCell3 = newRow.insertCell(2);
            var newCell4 = newRow.insertCell(3);
            var newCell5 = newRow.insertCell(4);
            var newCell6 = newRow.insertCell(5);
            newCell1.innerText =record.userName;
            newCell2.innerText =record.userGoal;
            newCell3.innerText =record.userAssist;
            newCell4.innerText =record.userMvp;
            newCell5.innerText =record.userSave;
            newCell6.innerText =record.userPartici;
        }
    document.write ="</tr>";
    }
   
});

document.getElementById("gBtn").addEventListener("click", grecord);
function grecord(){
    fetch("/record/detail/userGoal",{
         method : "GET"
    })
     .then((res) => res.json())
     .then((data) => {
        for(i=0; i<= data.length-1; i++){
            var gdata = data[i];
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[0].innerHTML =`${gdata.userName}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[1].innerHTML =`${gdata.userGoal}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[2].innerHTML =`${gdata.userAssist}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[3].innerHTML =`${gdata.userMvp}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[4].innerHTML =`${gdata.userSave}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[5].innerHTML =`${gdata.userPartici}`;
            }   
 })
 }

 document.getElementById("aBtn").addEventListener("click", arecord);
function arecord(){
    fetch("/record/detail/userAssist",{
         method : "GET"
    })
     .then((res) => res.json())
     .then((data) => {
        for(i=0; i<= data.length-1; i++){
            var adata = data[i];
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[0].innerHTML =`${adata.userName}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[1].innerHTML =`${adata.userGoal}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[2].innerHTML =`${adata.userAssist}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[3].innerHTML =`${adata.userMvp}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[4].innerHTML =`${adata.userSave}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[5].innerHTML =`${adata.userPartici}`;
            }   
 })
 }

 document.getElementById("mBtn").addEventListener("click", mrecord);
function mrecord(){
    fetch("/record/detail/userMvp",{
         method : "GET"
    })
     .then((res) => res.json())
     .then((data) => {
        for(i=0; i<= data.length-1; i++){
            var mdata = data[i];
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[0].innerHTML =`${mdata.userName}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[1].innerHTML =`${mdata.userGoal}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[2].innerHTML =`${mdata.userAssist}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[3].innerHTML =`${mdata.userMvp}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[4].innerHTML =`${mdata.userSave}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[5].innerHTML =`${mdata.userPartici}`;
            }   
 })
 }

 document.getElementById("sBtn").addEventListener("click", srecord);
function srecord(){
    fetch("/record/detail/userSave",{
         method : "GET"
    })
     .then((res) => res.json())
     .then((data) => {
        for(i=0; i<= data.length-1; i++){
            var sdata = data[i];
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[0].innerHTML =`${sdata.userName}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[1].innerHTML =`${sdata.userGoal}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[2].innerHTML =`${sdata.userAssist}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[3].innerHTML =`${sdata.userMvp}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[4].innerHTML =`${sdata.userSave}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[5].innerHTML =`${sdata.userPartici}`;
            }   
 })
 }

 document.getElementById("pBtn").addEventListener("click", precord);
function precord(){
    fetch("/record/detail/userPartici",{
         method : "GET"
    })
     .then((res) => res.json())
     .then((data) => {
        for(i=0; i<= data.length-1; i++){
            var pdata = data[i];
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[0].innerHTML =`${pdata.userName}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[1].innerHTML =`${pdata.userGoal}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[2].innerHTML =`${pdata.userAssist}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[3].innerHTML =`${pdata.userMvp}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[4].innerHTML =`${pdata.userSave}`;
            document.getElementById("rdata").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[5].innerHTML =`${pdata.userPartici}`;
            }   
 })
 }






