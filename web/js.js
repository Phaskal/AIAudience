//<script>
function positive() {
    var text = document.getElementsByName("positive")[0].value;

    fetch("https://main-gpt-2-server-gkswjdzz.endpoint.ainize.ai/preprocess", {
        method: "POST",
        headers: {
        "Content-Type": "application/json; charset=euc-kr",
        },
    body: JSON.stringify({
        context: text,
    }),
    })
    .then((response) => response.json())
    .then((data) => {
        var temp = data.slice(0, -1);
        temp = temp.substr(1);
        temp = temp.split(",").map(Number);
        fetch("https://train-39bbuxt6erfsjix19q6z-gpt2-train-teachable-ainize.endpoint.ainize.ai/predictions/gpt-2-en-medium-finetune", {
            method: "POST",
            headers: {
            "Content-Type": "application/json;",
            },
        body: JSON.stringify({
            text: temp,
            num_samples: 5,
            length: 8,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            fetch("https://main-gpt-2-server-gkswjdzz.endpoint.ainize.ai/postprocess", {
                method: "POST",
                headers: {
                "Content-Type": "application/json; charset=euc-kr",
                },
            body: JSON.stringify(
                data,
            ),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                document.getElementsByName("positive")[0].value = "";
                for(var i in data){
                    document.getElementsByName("positive")[0].value += data[i].text + "\n";
                }
            });
        }
        );

    });
}


function negative() {
    var text = document.getElementsByName("negative")[0].value;

    fetch("https://main-gpt-2-server-gkswjdzz.endpoint.ainize.ai/preprocess", {
        method: "POST",
        headers: {
        "Content-Type": "application/json; charset=euc-kr",
        },
    body: JSON.stringify({
        context: text,
    }),
    })
    .then((response) => response.json())
    .then((data) => {
        var temp = data.slice(0, -1);
        temp = temp.substr(1);
        temp = temp.split(",").map(Number);
        fetch("https://train-8u6hh0276k3qodyzsvax-gpt2-train-teachable-ainize.endpoint.ainize.ai/predictions/gpt-2-en-medium-finetune", {
            method: "POST",
            headers: {
            "Content-Type": "application/json;",
            },
        body: JSON.stringify({
            text: temp,
            num_samples: 5,
            length: 8,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            fetch("https://main-gpt-2-server-gkswjdzz.endpoint.ainize.ai/postprocess", {
                method: "POST",
                headers: {
                "Content-Type": "application/json; charset=euc-kr",
                },
            body: JSON.stringify(
                data,
            ),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                document.getElementsByName("negative")[0].value = "";
                for(var i in data){
                    document.getElementsByName("negative")[0].value += data[i].text + "\n";
                }
            });
        }
        );

    });
}
