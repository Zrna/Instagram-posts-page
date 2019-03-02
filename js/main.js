getImages = () => {
  const token = "YOUR ACCESS TOKEN"; // insert your ACCESS_TOKEN
  const photosNum = 1000; // how much photos do you want to get

  const url =
    "https://api.instagram.com/v1/users/self/media/recent/?access_token=" +
    token +
    "&count=" +
    photosNum;

  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      for (n in res.data) {
        // just shortcut for json
        const jsonData = res.data[n];

        // post URL
        const link = jsonData.link;

        // get image
        const image = jsonData.images.standard_resolution.url;

        // get likes on image
        const likes = jsonData.likes.count;

        // post description
        let description;
        if (jsonData.caption === null) {
          description = "";
        } else {
          description = jsonData.caption.text;

          if (description.length > 50) {
            description =
              description.substring(0, 50) +
              "... <span class='read-more'>more</span>";
          }
        }

        if (jsonData.type === "video") {
          description += " <small><strong>(video)</strong></small>";
        }

        // date post
        const created_time = jsonData.created_time;
        const instaDate = new Date(parseInt(created_time) * 1000);

        var monthsList = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];

        const month = monthsList[instaDate.getMonth()];
        const date = instaDate.getDate();
        const year = instaDate.getFullYear();

        const fullDate = month + " " + date + ", " + year;

        // append content to div
        $("#images-list").append(
          "<div class='col-md-3 mt-4'><a href='" +
            link +
            " 'target='_blank'><div class='post-box'><div class='img-box'><img src=" +
            image +
            " /></div><div class='post-details'> <p><strong> " +
            likes +
            " likes</strong> <br /> " +
            description +
            " </p><p class='post-date'>" +
            fullDate +
            "</p></div></div></a></div>"
        );
      }
    })
    .catch(error => {
      console.error(error);
    });
};

getImages();
