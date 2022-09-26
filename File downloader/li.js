const fileInput = document.querySelector("#url"),
DownloadBtn =  document.querySelector("button");



DownloadBtn.addEventListener("click", e =>{
    e.preventDefault(); // preventing form from submitting
    DownloadBtn.innerText = "downloading file...";
    fetchFile(fileInput.value);

  
    

});

function fetchFile(url){
    // fetching file and returning response as blob
    fetch(url).then(res => res.blob()).then(file =>{
        //URL.createOBJURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;//passing tempUrl as href value of <a> tag
        //passing file last name & extension as download value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/,'');
        document.body.appendChild(aTag); // adding <a> tag inside body
        aTag.click();//clicking the <a> tag so the file download
        aTag.remove();// removing <a> tag once file downloaded
        URL.revokeObjectURL(tempUrl); // removing temurl from the document
        DownloadBtn.innerText = "Download File";
        document.getElementById("url").value="";

        
    }).catch(()=>{
        // catch method will call if any error comes during downloading
        DownloadBtn.innerText = "Download File";
        alert("Failed to download file!");
    });
  
    

}

