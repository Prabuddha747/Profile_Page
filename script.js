const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstpageAnimation(){
    var t1 = gsap.timeline();
    t1.from("#nav",{
        y:'-10',
        opacity: 0,
        duration:1.5,
        ease: Expo.easeInOut,
    })

    .to(".boundingelem",{
        y:0,
        duration:1.5,
        stagger:.3,
        delay: 1,
        ease: Expo.easeInOut
    })
    .from("#herofooter",{
        y:-10,
        opacity: 0,
        duration:1.5,
        delay: -2,
        ease: Expo.easeInOut
    })
}
/* jab mouse move ho toh humlog skew kar paaye aur minimum skew define 
kar paaye,jab mouse move ho toh chapta ki value badhe,aur jab mouse chalna
band ho jayea toh chapta hota lo */
var timeout;

function circlechaptakaro(){
    // define default scale value.
    var xscale= 1;
    var yscale= 1;

    var xprev =0;
    var yprev = 0;
    window.addEventListener("mousemove",function(dets)
    {  clearTimeout(timeout);
         xscale=gsap.utils.clamp(0.8,1.2,dets.clientX- xprev);
        yscale=gsap.utils.clamp(0.8,1.2,dets.clientY- yprev);
        xprev = dets.clientX ;
        yprev = dets.clientY ;  
        
        circlemousefollower(xscale,yscale);
        timeout=setTimeout(function(){
        document.querySelector('#minicircle').style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`; 
        },100);
       
        
    });
}
circlechaptakaro()

 

function circlemousefollower(xscale,yscale) {
    window.addEventListener("mousemove",function(dets)
    {
        document.querySelector('#minicircle').style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
        console.log(dets.clientX,dets.clientY);

    })

}
circlemousefollower(); 
firstpageAnimation();
//teeno element ko select karo, uske baad teeno par ek mousemove laago,jab mouse move  ho to yea paata karo ki mouse kaha per hai, jiska matlab hai ki x and y position paata karo,ab mouse ki x y position ka badle us image ko show karo and us image ko 
//move karo , move karte waqt rotate karo, and jaisa jaisa mouse tez chale waise waise rotation bhi tez ho jae                     

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate =0;
    var diffrot =0;
    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease: Power4,
            duration:0.5,
         
        });
    });


    elem.addEventListener("mousemove",function(dets){
        
        var diff =dets.clientY-elem.getBoundingClientRect().top;
        diffrot=dets.clientX - rotate;
        rotate = dets.clientX;
        
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease: Power4,
            top: dets.clientY,
            left: dets.clientX,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot),
        });
    });
});
