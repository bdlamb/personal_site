var buttonSound=new Audio("./assets/sounds/button.mp3");
var sliderSound=new Audio("./assets/sounds/slider.mp3");

$(".nav-link, .dropdown-item:not(:last)").on("click",()=>{
    buttonSound.play();
});

$("#check").on("click",()=>{
    sliderSound.play();
});

function darkModeChange(e){
    document.body.classList.toggle('dark-mode');
}

function darkModeChangeCompact(){
    $("#check").trigger("click");
}

$("#check").on("click",darkModeChange);

changePageContent("home");
checkColoring();

function checkColoring(){
    var darkThemPefered=window.matchMedia('(prefers-color-scheme: dark)');
    if(darkThemPefered.matches){
        $("#check").trigger("click");
    }
}

async function changePageContent(swapPage){
    var file= await fetch(swapPage.toLowerCase()+".html");
    var html=await file.text();
    //console.log(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const element=doc.querySelector("div");

    $("#pageContent").empty().append(element);


    $("#nav button.active").removeClass("active");
    $("#"+swapPage).addClass("active");
}

//alert("js");