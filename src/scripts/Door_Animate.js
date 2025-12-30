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
            }

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
            }
        }
    }
}

enable_door_anim();