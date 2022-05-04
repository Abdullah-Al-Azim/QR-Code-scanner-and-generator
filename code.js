const file = document.getElementById("formFile");
let ccb = document.getElementById("close-copy-btn");
let showResult = document.getElementById("show-result");

document.getElementById("code-button").addEventListener("click", function (e) {
  e.preventDefault();
  const inputText = document.getElementById("code-input");
  const inputValue = inputText.value.trim();
  const image = document.getElementById("code-img");
  const button = document.getElementById("code-button");
  button.innerText = "GENERATING QR CODE...";
  let preValue;
  if (preValue === inputValue) return;
  preValue = inputValue;
  if (inputText.value === "") {
    image.src = "";
    preValue = "";
  } else {
    image.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inputValue}`;
    image.addEventListener("load", function () {
      button.innerText = "GENERATE YOUR QR";
    });
  }
});

function fetchRequest(formDataInfo) {
  fetch(`http://api.qrserver.com/v1/read-qr-code/`, {
    method: "POST",
    body: formDataInfo,
  })
    .then((res) => res.json())
    .then((data) => qrCodeResult(data[0].symbol[0].data));
}
function qrCodeResult(newResult) {
  showResult.innerText = newResult;

}

file.addEventListener("change", (e) => {
  let uploadFile = e.target.files[0];
  let formDataInfo = new FormData();
  formDataInfo.append("file", uploadFile);
  ccb.style.display = "block"
  fetchRequest(formDataInfo);
});

document.getElementById("copy-text").addEventListener("click", function (e) {
  e.preventDefault();
  navigator.clipboard.writeText(showResult.innerText);
  alert("text copied", showResult.innerText);
});

document.getElementById("close").addEventListener("click", function(e){
    e.preventDefault(); 
    ccb.style.display = "none";
})