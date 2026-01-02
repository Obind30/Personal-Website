const hover_elems = document.getElementsByClassName("summ_container")

for(let i=0; i<hover_elems.length; i++) {
    console.log(i);
    hover_elems[i].onmouseenter = function fade_out () {
        console.log("fade-in");
        const fade_elems = this.getElementsByClassName("fade_img");
        for(let j=0; j<fade_elems.length; j++) {
            fade_elems[j].classList.add("visible")
        }
    }
    hover_elems[i].onmouseleave = function fade_in () {
        console.log("fade-out");
        const fade_elems = this.getElementsByClassName("fade_img");
        for(let j=0; j<fade_elems.length; j++) {
            fade_elems[j].classList.remove("visible")
        }
    }
}