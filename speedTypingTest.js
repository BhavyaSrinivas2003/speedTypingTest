function speedTypingTest() {
    let speedTypingTestEl = document.getElementById("speedTypingTest");
    let timerEl = document.getElementById("timer");
    let quoteDisplayEl = document.getElementById("quoteDisplay");
    let resultEl = document.getElementById("result");
    let quoteInputEl = document.getElementById("quoteInput");
    let submitBtnEl = document.getElementById("submitBtn");
    let resetBtnEl = document.getElementById("resetBtn");
    let spinnerEl = document.getElementById("spinner");
    let uniqueId = null;
    let counter = 0;

    function timerStart() {
        console.log(counter);
        counter = counter + 1;
        timerEl.textContent = counter;
    }



    function quoteDisplayElFun(jsonData) {
        quoteDisplayEl.textContent = jsonData.content;
    }

    function getQuote() {
        spinnerEl.classList.remove("d-none");
        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/random-quote";
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinnerEl.classList.add("d-none");
                quoteDisplayElFun(jsonData);
            });
        uniqueId = setInterval(timerStart, 1000);
    }
    getQuote();

    function checkEqual() {
        let quoteInputElValue = quoteInputEl.value;
        if (quoteDisplayEl.textContent === quoteInputElValue) {
            clearInterval(uniqueId);
            resultEl.textContent = "You typed in " + counter + " seconds";
        } else {
            resultEl.textContent = "You typed incorrect sentence";
        }
    }

    function clearValue() {
        counter = 0;

        quoteInputEl.value = "";
        resultEl.textContent = "";
        getQuote();
    }
    submitBtnEl.addEventListener("click", checkEqual);
    resetBtnEl.addEventListener("click", clearValue);
}