function darkModeChange(e){
    console.log(e);
    if(e.currentTarget.checked){
        document.body.classList.toggle('dark-mode');
    }
    else{
        document.body.classList.toggle('dark-mode');
    }
}

$("#check").on("click",darkModeChange);

changePageContent("home");

async function changePageContent(swapPage){
    var file= await fetch(swapPage.toLowerCase()+".html");
    var html=await file.text();
    console.log(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const element=doc.querySelector("div");
    
    $("#pageContent").empty().append(element);


    $("#nav button.active").removeClass("active");
    $("#"+swapPage).addClass("active");
}

//alert("js");