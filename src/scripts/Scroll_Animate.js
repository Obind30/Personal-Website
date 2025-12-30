function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

function enable_door_anim() {
    let pixImgs = document.getElementsByClassName("pixImg");

    const openTimeouts = new Array(pixImgs.length);
    const closeTimeouts = new Array(pixImgs.length);

    for (let i=0; i<pixImgs.length; i++) {
        if (/door\d/.test(pixImgs[i].id)) {
            openTimeouts[i] = new Array(7);
            closeTimeouts[i] = new Array(7);

            pixImgs[i].onmouseenter = function door_open() {
                let curr=Number(this.src.match(/(?<=Link_)\d/)[0]);
                for (let j=1; j<8; j++) {
                    clearTimeout(closeTimeouts[i][j]);
                }
                for (let j=curr; j<8; j++) {
                    openTimeouts[i][j-1] = setTimeout(() => {
                        this.src =
                        "src/images/Door_Link_Animated/Door_Link_" +
                        j
                        + ".png";
                    }, j * 100);
                }
            };

            pixImgs[i].onmouseleave = function door_close() {
                let curr=Number(this.src.match(/(?<=Link_)\d/)[0]);
                for (let j=1; j<8; j++) {
                    clearTimeout(openTimeouts[i][j]);
                }
                for (let j=1; j<curr; j++) {
                    closeTimeouts[i][curr-j-1] = setTimeout(() => {
                        this.src =
                        "src/images/Door_Link_Animated/Door_Link_" +
                        Number(curr-j)
                        + ".png";
                    }, j * 100);
                }
            };

        }
    }
}

function disable_door_anim() {
    let pixImgs = document.getElementsByClassName("pixImg");

    for (let i=0; i<pixImgs.length; i++) {
        if (/door\d/.test(pixImgs[i].id)) {
            pixImgs[i].src = "src/images/Door_Link_Animated/Door_Link_1.png";
            pixImgs[i].onmouseenter = null;
            pixImgs[i].onmouseleave = null;
        }
    }
}

function hand_animate() {
    const doc = this.document.documentElement;
    let frame = (Math.floor(doc.scrollTop/((doc.scrollHeight-doc.clientHeight+1)/19)));
    let path = 
        "src/images/Hand_Palm_Open_Style/Frame" +
        frame +
        ".jpg";
    document.getElementById("handImg").src = path;

    const door_links = document.getElementById("door_links");
    const link1 = document.getElementById("link1");
    const link3 = document.getElementById("link3");
    if (frame>6) {
        door_links.style.opacity = (frame-6)/(18-6);
        door_links.style.top = (-20*(frame-6)/(18-6))+25+"%";

        link1.style.transform = "translate("+((-80*(frame-6)/(18-6))+40)+"%, 15%)";
        link3.style.transform = "translate("+((80*(frame-6)/(18-6))-120)+"%, 15%)";
    } else {
        door_links.style.opacity = 0;
    };

    let titles = document.getElementsByClassName("link_title");
    if (frame == 18) 
    {
        enable_door_anim();
        for (let i=0; i<titles.length; i++) {
            titles[i].style.visibility = "visible";
        }
    } else 
    {
        disable_door_anim();
        for (let i=0; i<titles.length; i++) {
            titles[i].style.visibility = "hidden";
        }
    }
}
hand_animate();

window.onscroll = hand_animate;