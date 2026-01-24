var buttonSound=new Audio("./assets/sounds/button.mp3");
var sliderSound=new Audio("./assets/sounds/slider.mp3");
var _history=[];
var _current="";
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

movePage("home");
checkColoring();

history.pushState({ page: "home" }, "", "");

function hideMe(theWindow){
    theWindow.style.display="none";

}

function expandImage(path){
    document.querySelector("#expandedImage").src=`${path}`;
    document.querySelector("#imageExpandedContainer").style.display="inline-flex";
}

window.addEventListener("popstate", (ev)=>{
    console.log("back hit");
    if(_history.length==0){
        history.back();
    }
    else{
        _current=_history.pop();
        changePageContent(_current);
       console.log(_history);
    }
    history.replaceState({ page: _history[_history.length-1]}, "", "");
});

function checkColoring(){
    var darkThemPefered=window.matchMedia('(prefers-color-scheme: dark)');
    if(darkThemPefered.matches){
        $("#check").trigger("click");
    }
}

async function pageToPdf(){
    $("#resumeTitle").html("Brian Lamb");
    $("*").addClass("for-pdf");
    $(".pdf-button").toggle();
    var opts={
        margin: [10, 10, 10, 10],
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] },
        html2canvas: { scale: 2, letterRendering: true }
    };
    await html2pdf().set(opts).from(document.getElementById('pageContent')).save('Brian-Lamb-Resume.pdf');
    $("#resumeTitle").html("Resume");
    $(".pdf-button").toggle();
    $("*").removeClass("for-pdf");
}

async function movePage(swapPage) {
    changePageContent(swapPage);
    //console.log(_current);
    
    updateHistory(true,swapPage);
}

async function changePageContent(swapPage){
    var fileElements=swapPage.split(" ");
    //console.log(fileElements);

    var file= await fetch("src/html/"+fileElements[0]+".html");
    var html=await file.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    var elementToGrab="div";
    if(fileElements.length>1){
        elementToGrab=`#${fileElements[1]}`;
    }
    //console.log(elementToGrab);
    var element=doc.querySelector(`${elementToGrab}`);
    element.classList.add("page");

    $("#pageContent").empty().append(element);


    if(swapPage!="references" && fileElements.length===1){
        $("#nav button.active").removeClass("active");
        $("#"+swapPage).addClass("active");
        $("#nav-dropdown-heading").text(swapPage.toUpperCase());
    }
     void element.offsetWidth;

  // Add the "show" class to trigger the transition
    window.scrollTo(0,0);
    element.classList.add('show')

}

function updateHistory(add,location=null){
    if(add){
        if(_current){
            _history.push(_current);
        }
        _current=location;
    }
    console.log(_history);
}