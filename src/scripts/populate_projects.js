async function readJSON() {
    try {
        const response = await fetch('src/json/projects.json');
        if (!response.ok) throw new Error('File not found');
        const data = await response.json(); // Parse JSON directly

        // Get HTML element to insert into
        const list_container = document.getElementById("project_list")

        // Create an empty string to append HTML of project list
        let inner = '';
        let i=0;
        // Iterate through the projects list from the json file
        while (data.projects[i]) {
            if (data.projects[i].Active == true) {
                // Append an HTML block to our string with desired elements from json file
                inner += 
                `
                    <a class="blank_link" href="src/pages/projects/project_pages/`+data.projects[i].Title+`.html">
                        <div class="summ_container">
                        
                            <div class="pix_img square_img_cont point_left">
                                <img class="square_img fade_img" src="src/images/Hand_Point_Right.jpg">
                            </div>

                            <div class="summ_body">
                                <div class="square_img_cont">
                                    <img class="square_img" src="`+data.projects[i].Image_path+`">
                                </div>
                                <div class="proj_text">
                                    <span class="text pix_text title">`+data.projects[i].Title+`, </span>
                                    <span class="text pix_text body_text">`+data.projects[i].Date+`</span>
                                    <p class="text pix_text proj_bio">`+data.projects[i].Bio+`</p>
                                </div>
                            </div>

                            <div class="pix_img square_img_cont point_right">
                                <img class="square_img fade_img" src="src/images/Hand_Point_Left.jpg">
                            </div>

                        </div>
                    </a>
                `;
            } else {
                // Append an HTML block to our string with desired elements from json file
                inner += 
                `
                    <div class="inactive_summ_container">
                    
                        <div class="pix_img square_img_cont point_left">
                            <img class="square_img fade_img" src="src/images/Hand_Point_Right.jpg">
                        </div>

                        <div class="summ_body">
                            <div class="square_img_cont">
                                <img class="square_img"  style="opacity:0.5" src="`+data.projects[i].Image_path+`">
                            </div>
                            <div class="proj_text">
                                <span class="text pix_text title" style="opacity:0.5"> `+data.projects[i].Title+`, </span>
                                <span class="text pix_text body_text" style="opacity:0.5">`+data.projects[i].Date+`</span>
                                <p class="text pix_text proj_bio" style="opacity:0.5">`+data.projects[i].Bio+`</p>
                            </div>
                        </div>

                        <div class="pix_img square_img_cont point_right">
                            <img class="square_img fade_img" src="src/images/Hand_Point_Left.jpg">
                        </div>

                    </div>
                `;
            }
            i++;
        }
        // Inject our string of HTML elements into our page
        list_container.innerHTML = inner;

        // Define animation functions to fade in/out pointer images on hover
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
    } catch (error) {
        console.error('Error reading JSON:', error.message);
    }
}

readJSON();