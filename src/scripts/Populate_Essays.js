const list_container = document.getElementById("project_list")
fetch('../json/essays.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    let inner = '';
    let i=0;
    while (data.essays[i]) {
        inner += 
        `
            <a class="blank_link" href="../pages/projects/`+data.essays[i].Title+`.html">
                <div class="summ_container">
                   
                    <div class="pix_img square_img_cont point_left">
                        <img class="square_img fade_img" src="../images/Hand_Point_Right.jpg">
                    </div>

                    <div class="summ_body">
                        <div class="square_img_cont">
                            <img class="square_img" src="`+data.essays[i].Image_path+`">
                        </div>
                        <div class="proj_text">
                            <span class="text pix_text title">`+data.essays[i].Title+`, </span>
                            <span class="text pix_text body_text">`+data.essays[i].Date+`</span>
                            <p class="text pix_text proj_bio">`+data.essays[i].Bio+`</p>
                        </div>
                    </div>

                    <div class="pix_img square_img_cont point_right">
                        <img class="square_img fade_img" src="../images/Hand_Point_Left.jpg">
                    </div>

                </div>
            </a>
        `;
        i++;
    }
    list_container.innerHTML = inner;

    const hover_elems = document.getElementsByClassName("summ_container")
    for(let i=0; i<hover_elems.length; i++) {
        hover_elems[i].onmouseenter = function fade_out () {
            const fade_elems = this.getElementsByClassName("fade_img");
            for(let j=0; j<fade_elems.length; j++) {
                fade_elems[j].classList.add("visible")
            }
        }
        hover_elems[i].onmouseleave = function fade_in () {
            const fade_elems = this.getElementsByClassName("fade_img");
            for(let j=0; j<fade_elems.length; j++) {
                fade_elems[j].classList.remove("visible")
            }
        }
    }

  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

