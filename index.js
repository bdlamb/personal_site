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

async function changePageContent(swapPage){
    var file= await fetch(swapPage.toLowerCase()+".html");
    var html=await file.text();
    //console.log(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    var element=doc.querySelector("div");
    element.classList.add("page");

    $("#pageContent").empty().append(element);


    if(swapPage!="references"){
        $("#nav button.active").removeClass("active");
        $("#"+swapPage).addClass("active");
    }
     void element.offsetWidth;

  // Add the "show" class to trigger the transition
    window.scrollTo(0,0);
    element.classList.add('show')

}

async function loadMore(swapPage){
    console.log("in load");
    var file= await fetch("experinces.html");
        var html=await file.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        var element=doc.querySelector('#'+swapPage);
        element.classList.add("page");

        $("#pageContent").empty().append(element);
        void element.offsetWidth;

    // Add the "show" class to trigger the transition
        element.classList.add('show')
   
}