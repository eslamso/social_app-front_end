$(document).ready(() => {
  if (!localStorage.getItem("Token")) {
    window.location.href = "./../html/index.html";
    return;
  }

  console.log("Document is ready.");
  console.log();
  $.ajax({
    type: "GET",
    url: "https://chat-events-group.onrender.com/post/663f60a100bf812b407c2d88",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
    success: (response) => {
      console.log("AJAX request successful:", response);
      const posts = response.posts;
      const postsContainer = document.getElementById("postsContainer");

      posts.forEach((post) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "mt-3");

        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.classList.add(
          "card-body",
          "border",
          "border-dark",
          "border-3"
        );

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = `<a href=""><img src="images/shuffle-01.jpg" class="user-image" alt=""> ${post.user.name}</a>`;

        const postImage = document.createElement("img");
        postImage.classList.add("card-img-top", "minimized-image");
        postImage.src = post.image;
        postImage.alt = "Post Image";

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = post.content;

        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add(
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );

        const likeButton = document.createElement("button");
        likeButton.type = "button";
        likeButton.classList.add("btn", "btn-outline-primary", "btn-sm");
        likeButton.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>';

        const commentButton = document.createElement("button");
        commentButton.type = "button";
        commentButton.classList.add("btn", "btn-outline-secondary", "btn-sm");
        commentButton.textContent = "Comment";
        commentButton.onclick = function () {
          toggleComments(this);
        };

        buttonsDiv.appendChild(likeButton);
        buttonsDiv.appendChild(commentButton);

        const commentsDiv = document.createElement("div");
        commentsDiv.classList.add("comments", "mt-3");
        commentsDiv.style.display = "none";

        const commentsList = document.createElement("ol");
        commentsList.classList.add("list-group");

        // Add comments dynamically here

        const addCommentForm = document.createElement("form");
        addCommentForm.classList.add("add-comment-form");
        addCommentForm.style.marginTop = "10px";
        addCommentForm.innerHTML = `
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Your comment">
                    </div>
                    <button type="button" class="btn btn-primary">Add Comment</button>
                `;

        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(postImage);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(buttonsDiv);
        cardBodyDiv.appendChild(commentsDiv);
        cardBodyDiv.appendChild(addCommentForm);

        cardDiv.appendChild(cardBodyDiv);
        postsContainer.appendChild(cardDiv);
      });
    },
    error: (xhr, status, error) => {
      console.log("AJAX request failed:", xhr.status, xhr.statusText);
      console.log("Response Text:", xhr.responseText);
      console.log("Error:", error);
      // Handle the error here
    },
  });
});

function toggleComments(button) {
  const commentsDiv = button.parentElement.parentElement.nextElementSibling;
  if (commentsDiv.style.display === "none") {
    commentsDiv.style.display = "block";
  } else {
    commentsDiv.style.display = "none";
  }
}
