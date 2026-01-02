const list_container = document.getElementById("project_list")

fetch('../json/projects.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    let i=0;
    while (data.projects[i]) {
        list_container.innerHTML +=
        `
            <a class="blank_link" href="../pages/projects/`+data.projects[i].Title+`.html">
                <div id="summ_container">
                   
                    <div id="point_left" class="pointer pix_img square_img_cont">
                        <img class="square_img fade_img" src="../images/Default_Jake.jpg">
                    </div>

                    <div id="summ_body">
                        <div class="square_img_cont">
                            <img class="square_img" src="`+data.projects[i].Image_path+`">
                        </div>
                        <div id="proj_text">
                            <div>
                                <span class="text pix_text title">`+data.projects[i].Title+`, </span>
                                <span class="text pix_text title">`+data.projects[i].Date+`</span>
                            </div>
                            <p id="proj_bio" class="text pix_text">`+data.projects[i].Bio+`</p>
                        </div>
                    </div>

                    <div id="point_right" class="pointer pix_img square_img_cont">
                        <img class="square_img fade_img" src="../images/Default_Jake.jpg">
                    </div>

                </div>
            </a>
        `;
        i++;
    }
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });