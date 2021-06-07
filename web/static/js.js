//<script>
function process(id) {
    var text;
    var option;
    var field;
    if (id == "btn_positive"){
        text = document.getElementById("positive").value;
        option = "p";
    }
    else if (id == "btn_negative") {
        text = document.getElementById("negative").value;
        option = "n";
    }
    if (text == ""){
        alert("Fill area!");
        return;
    }
    fetch("/process", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            text: text,
            option: option,
            num_samples: 5,
            length: 8,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (id == "btn_positive"){
            document.getElementById("positive").value = ""
            for(var i in data){
                document.getElementById("positive").value += data[i] + "\n";
            }
        }
        else if (id == "btn_negative") {
            document.getElementById("negative").value = ""
            for(var i in data){
                document.getElementById("negative").value += data[i] + "\n";
            }
        };
    });
}
