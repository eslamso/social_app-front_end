document.getElementById("groupsTab").addEventListener("click", function () {
  var groupsContainer = document.getElementById("groupsContainer");
  groupsContainer.classList.toggle("hidden");
  document.getElementById("searchContainer").classList.toggle("hidden");
});

document.getElementById("searchButton").addEventListener("click", function () {
  var searchInput = document.getElementById("searchInput").value;
  document.getElementById(
    "groupsContainer"
  ).innerHTML = `<div id="groupsContainer" class="hidden"></div>`;
  let id = "";
  let name = "";
  axios
    .get(`https://chat-events-group.onrender.com/group/search/${searchInput}`, {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    })
    .then(function (response) {
      //id = response.data.groups[1]._id;
      //name = response.data.groups[1].name;
      const groups = response.data.groups;
      //users = response.data.groups[1].users;
      console.log(groups);
      function createGroupHTML(name) {
        return `
            <div class="group" id="${name}">
              <h3>${name}</h3>
              <div class="members">
                <h4>Members</h4>
              </div>
              <button class="show-posts-button">view Group</button>
              <div class="posts hidden">
                <h4>Posts</h4>
                <!-- Posts for the group go here -->
              </div>
            </div>
          `;
      }

      // Fetch groups
      //  var groups = fetchGroups();

      // Get the container for groups

      var groupsContainer = document.getElementById("groupsContainer");
      //console.log(groupsContainer.value);
      // Insert groups into the container
      // Create HTML for the group
      groups.forEach(function (group) {
        var groupHTML = createGroupHTML(group.name);
        // Append the group HTML to the groups container
        groupsContainer.innerHTML += groupHTML;
      });
      /*
      function createPostHTML(post) {
        return `
          <div class="post">
          <div class="post-header">
            <p class="post-owner">Owner: ${post.user.name}</p>
          </div>
          <div class="post-content">
            <img src="post_image.jpg" alt="Post Image">
            <p class="post-text">${post.content}</p>
          </div>
          <div class="post-action">
            <button class="like-button">Like</button>
            <button class="comment-button">Comments</button>
            <div class="comments hidden">
              <div class="comment">
                <p><strong>Owner:</strong> Jane Smith</p>
                <p>This is the text of the comment.</p>
              </div>
              <div class="comment">
                <p><strong>Owner:</strong> Jane Smith</p>
                <p>This is the text of the comment.</p>
              </div>
              <div class="comment">
                <p><strong>Owner:</strong> Jane Smith</p>
                <p>This is the text of the comment.</p>
              </div>
              <!-- More comments go here -->
            </div>
          </div>
        </div>
          `;
      }
      var postsContainer = document
        .getElementById(`${name}`)
        .getElementsByClassName("posts")[0];

      // Insert posts into the group
      posts.forEach(function (post) {
        // Create HTML for the post
        var postHTML = createPostHTML(post);
        // Append the post HTML to the posts container
        postsContainer.innerHTML += postHTML;
        
      });
      */
      const showPostsButtons = document.querySelectorAll(".show-posts-button");
      const postsContainers = document.querySelectorAll(".posts");

      // Add click event listeners to the show posts buttons
      showPostsButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
          // Toggle the visibility of the corresponding posts container
          document.getElementById(
            "groupsContainer"
          ).innerHTML = `<div id="groupsContainer"></div>`;
          //console.log(postsContainers[0]);
          id = groups[index]._id;
          name = groups[index].name;
          localStorage.setItem("currentGroup", id);
          //users = response.data.groups[1].users;
          console.log(name, id);
          axios
            .get(`https://chat-events-group.onrender.com/post/${id}`, {
              headers: {
                Authorization: localStorage.getItem("Token"),
              },
            })
            .then(function (response) {
              console.log(response.data);
              const posts = response.data.posts;
              console.log(posts);
              // this create group and put it in groups page
              function createGroupHTML(name) {
                return `
                <div class="group" id="${name}">
                  <h3>${name}</h3>
                  <div class="members">
                    <h4>Members</h4>
                  </div>
                  <div class="create-post">
    <input type="text" class="post-input" placeholder="Write your post here...">
    <button class="post-button">Post</button>
  </div>
                  <div class="posts">
                    <h4>Posts</h4>
                    <!-- Posts for the group go here -->
                    
                  </div>
                </div>
              `;
              }

              // Fetch groups
              //  var groups = fetchGroups();

              // Get the container for groups

              var groupsContainer = document.getElementById("groupsContainer");
              console.log(groupsContainer);
              // Insert groups into the container
              // Create HTML for the group
              var groupHTML = createGroupHTML(name);
              // Append the group HTML to the groups container
              groupsContainer.innerHTML += groupHTML;
              function createPostHTML(post, index) {
                return `
              <div class="post" id="post${index}">
              <div class="post-header">
                <p class="post-owner">Owner: ${post.user.name} </p>
              </div>
              <div class="post-content">
                <img src="post_image.jpg" alt="Post Image">
                <p class="post-text">${post.content}</p>
              </div>
              <div class="post-action">
                <button class="like-button">Like</button>
                <button class="comment-button">Comments</button>
                <div class="comments hidden">
                  <div class="comment">
                    <p><strong>Owner:</strong> Jane Smith</p>
                    <p>This is the text of the comment.</p>
                  </div>
                  <div class="comment">
                    <p><strong>Owner:</strong> Jane Smith</p>
                    <p>This is the text of the comment.</p>
                  </div>
                  <div class="comment">
                    <p><strong>Owner:</strong> Jane Smith</p>
                    <p>This is the text of the comment.</p>
                  </div>
                  <!-- More comments go here -->
                </div>
              </div>
            </div>
              `;
              }
              var postsContainer = document
                .getElementById(`${name}`)
                .getElementsByClassName("posts")[0];
              console.log(postsContainer);
              // Insert posts into the group
              posts.forEach(function (post, index) {
                // Create HTML for the post
                if (post.user._id == localStorage.getItem("currentUserId")) {
                  post.user.name = post.user.name + " (you)";
                }
                var postHTML = createPostHTML(post, index);
                // Append the post HTML to the posts container
                postsContainer.innerHTML += postHTML;
              });
              document
                .querySelectorAll(".like-button")
                .forEach(function (button) {
                  button.addEventListener("click", function () {
                    // Like button clicked
                    console.log("Post liked");
                  });
                });

              document
                .querySelectorAll(".comment-button")
                .forEach(function (button) {
                  button.addEventListener("click", function () {
                    var comments = this.parentNode.querySelector(".comments");
                    comments.classList.toggle("hidden");
                  });
                });
              //postsContainers[index].classList.toggle("hidden");
              // Get references to post input fields and post buttons
              const postInputs = document.querySelectorAll(".post-input");
              const postButtons = document.querySelectorAll(".post-button");
              const postsContainers = document.querySelectorAll(".posts");

              // Add click event listeners to the post buttons
              postButtons.forEach((button, index) => {
                button.addEventListener("click", function () {
                  // Get the value of the post input field

                  const postText = postInputs[index].value.trim();

                  // If the post text is not empty
                  if (postText !== "") {
                    // Create a new post div
                    axios
                      .post(
                        "https://chat-events-group.onrender.com/post/",
                        {
                          content: postText,
                          image: "okkkkk",
                          group: localStorage.getItem("currentGroup"),
                        },
                        {
                          headers: {
                            Authorization: localStorage.getItem("Token"),
                          },
                        }
                      )
                      .then(function (response) {
                        const currentUserName =
                          localStorage.getItem("currentUserName");
                        const newPostDiv = document.createElement("div");
                        newPostDiv.classList.add("post");
                        newPostDiv.innerHTML = `
                    <div class="post-header">
                    <p class="post-owner">Owner: ${currentUserName} (you)</p>
                  </div>
                  <div class="post-content">
                    <img src="post_image.jpg" alt="Post Image">
                    <p class="post-text">${postText}</p>
                  </div>
                  <div class="post-action">
                    <button class="like-button">Like</button>
                    <button class="comment-button">Comments</button>
                    <div class="comments hidden">
                      <div class="comment">
                        <p><strong>Owner:</strong> Jane Smith</p>
                        <p>This is the text of the comment.</p>
                      </div>
                      <div class="comment">
                        <p><strong>Owner:</strong> Jane Smith</p>
                        <p>This is the text of the comment.</p>
                      </div>
                      <div class="comment">
                        <p><strong>Owner:</strong> Jane Smith</p>
                        <p>This is the text of the comment.</p>
                      </div>
                      <!-- More comments go here -->
                    </div>
                  </div>
      `;

                        // Append the new post div to the posts container of the corresponding group
                        postsContainers[index].appendChild(newPostDiv);

                        // Clear the post input field
                        postInputs[index].value = "";
                      })

                      .catch(function (error) {
                        alert(error.response.data.message);
                      });
                  }
                });
              });
            })

            .catch(function (error) {
              console.log(error);
            });
        });
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log("Searching for: " + searchInput);
});
// Get references to the show posts buttons and posts divs
