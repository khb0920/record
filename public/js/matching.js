fetch("/match", {
    method : "GET",
})
.then((res) => res.json())
.then((data) => {
    const mdata = document.getElementById("mdata");
    for(var i=0; i<data.length; i++){
        document.write =("<tr>");
        var match = data[i];
        const newRow = mdata.insertRow();
        for(var j=0; j<1; j++){
            const newCell1 = newRow.insertCell(0);
            const newCell2 = newRow.insertCell(1);
            const newCell3 = newRow.insertCell(2);
            const newCell4 = newRow.insertCell(3);
            const newCell5 = newRow.insertCell(4);
            const newCell6 = newRow.insertCell(5);
            const newCell7 = newRow.insertCell(6);
            const newCell8 = newRow.insertCell(7);
            newCell1.innerText =match.matchYear;
            newCell2.innerText =match.matchMonth;
            newCell3.innerText =match.matchDay;
            newCell4.innerText =match.matchPlace;
            newCell5.innerText =match.matchVs;
            newCell6.innerText =match.matchScore;
            newCell7.innerText =match.matchLoss;
            newCell8.innerText =match.matchResult;
        }
    document.write ="</tr>";
    }
}).catch(function(error) {
console.log(error);
});

document.getElementById("search").addEventListener("click", searchMatch);

function searchMatch(){
    const month = document.getElementById("month").value;

    fetch(`/match/month/${month}`, {
        method : "GET",
    })
    .then((res) => res.json())
    .then((data) => {
        const sdata = document.getElementById("sdata");
                        sdata.style.visibility="visible";
        for(var i=0; i<data.length; i++){
            document.write =("<tr>");
            var match = data[i];
            console.log(match);
            
            const newRow = sdata.insertRow();
            for(var j=0; j<1; j++){
                const newCell1 = newRow.insertCell(0);
                const newCell2 = newRow.insertCell(1);
                const newCell3 = newRow.insertCell(2);
                const newCell4 = newRow.insertCell(3);
                const newCell5 = newRow.insertCell(4);
                const newCell6 = newRow.insertCell(5);
                const newCell7 = newRow.insertCell(6);
                const newCell8 = newRow.insertCell(7);
                newCell1.innerText =match.matchYear;
                newCell2.innerText =match.matchMonth;
                newCell3.innerText =match.matchDay;
                newCell4.innerText =match.matchPlace;
                newCell5.innerText =match.matchVs;
                newCell6.innerText =match.matchScore;
                newCell7.innerText =match.matchLoss;
                newCell8.innerText =match.matchResult;
            }
        document.write ="</tr>";
        }
    }).catch(function(error){
        console.log(error);
    })
};

document.getElementById("reset").addEventListener("click", resetMatch);

function resetMatch(){
    document.getElementById("sdata").deleteRow(1);
   
};

