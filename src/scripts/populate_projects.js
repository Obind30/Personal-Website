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
            <a href="../pages/projects/`+data.projects[i].Title+`.html">
                <div style="display: flex">
                   
                    <div style="width: 136px; overflow: hidden; margin-right: 10px;">
                        <img style="height: 136px" src="../images/Default_Jake.jpg">
                    </div>

                    <div style="display: inline-flex;">
                        <div style="width: 136px; overflow: hidden;">
                            <img style="height: 136px" src="`+data.projects[i].Image_path+`">
                        </div>
                        <div style="width: 75%; padding-left: 5%">
                            <div>
                                <span class="text pix_text title">`+data.projects[i].Title+`, </span>
                                <span class="text pix_text title">`+data.projects[i].Date+`</span>
                            </div>
                            <p class="text pix_text" style="font-size: 16px; text-align: justify;">`+data.projects[i].Bio+`</p>
                        </div>
                    </div>

                    <div style="width: 136px; overflow: hidden; margin-left: 10px;">
                        <img style="height: 136px" src="../images/Default_Jake.jpg">
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