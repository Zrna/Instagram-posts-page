getPosts = () => {
  const token = "YOUR ACCESS TOKEN"; // insert your ACCESS_TOKEN
  const numberOfPhotos = 1000;
  const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}&count=${numberOfPhotos}`;

  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res);

      if (res.meta.code !== 200) throw new Error(res.meta.error_message)

      for (n in res.data) {
        const response = res.data[n];

        const link = response.link;
        const image = response.images.standard_resolution.url;

        let likes = response.likes.count;
        likes = likes <= 1 ? `${likes} like` : `${likes} likes`;

        let description = response.caption;

        if (description === null) {
          description = "";
        } else {
          description = description.text;

          if (description.length > 50) {
            description =
              description.substring(0, 50) +
              "... <span class='read-more'>more</span>";
          }
        }

        if (response.type === "video") {
          description += " <small><strong>(video)</strong></small>";
        }

        const created_time = response.created_time;
        const postDate = new Date(parseInt(created_time) * 1000);

        const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const month = monthsList[postDate.getMonth()];
        const date = postDate.getDate();
        const year = postDate.getFullYear();
        const fullDate = `${month} ${date}, ${year}`;

        const post = `<div class='col-md-3 mt-4'>
                          <a href="${link}" target="_blank">
                            <div class="post-box">
                              <div class="img-box">
                                <img src="${image}" alt="${description}" />
                              </div>
                              <div class="post-details">
                                <p><strong>${likes}</strong></p>
                                <p>${description}</p>
                                <p class="post-date">${fullDate}</p>
                              </div>
                            </div>
                          </a>
                        </div>`;

        $("#images-list").append(post);
      }
    })
    .catch(error => {
      console.log(error);
      const errorMessage = `<p>${error}</p>`;
      $("#images-list").append(errorMessage);
    });
};

getPosts();
