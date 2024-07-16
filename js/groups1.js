//this function to close and open the group tab
document.getElementById("groupsTab").addEventListener("click", function () {
  var accountInfo = document.getElementById("accountInfo");
  accountInfo.classList.add("hidden");
  var groupsContainer = document.getElementById("groupsContainer");
  groupsContainer.classList.toggle("hidden");
  document.getElementById("searchContainer").classList.toggle("hidden");
  passwordChangeForm.classList.add("hidden");
});

//1) first function include every thing about group first function of it serch about group name when click on search button
document.getElementById("searchButton").addEventListener("click", function () {
  var searchInput = document.getElementById("searchInput").value;
  //empty the group page for new search operation
  document.getElementById(
    "groupsContainer"
  ).innerHTML = `<div id="groupsContainer" class="hidden"></div>`;
  let id = ""; // id for current group id
  let name = ""; // name for current group
  ////////////////////////////////////
  //first request: send get request to the backend and return the groups founded
  axios
    .get(`http://localhost:4000/group/search/${searchInput}`, {
      headers: {
        // to inform the server the user is logged in
        Authorization: localStorage.getItem("Token"),
      },
    })
    .then(function (response) {
      const groups = response.data.groups;
      //groups are array containg all groups results from search
      if (groups.length == 0) {
        throw new Error("there is no group with this name");
      }
      console.log(groups);
      ///////////////////////////////////////////////////////////////
      //this function create the group html element
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
      ///////////////////////////////////////////////////////////

      // Get the container element to put all groups on it  for groups
      var groupsContainer = document.getElementById("groupsContainer");
      //loop throw groups element and add group element to group container
      groups.forEach(function (group) {
        var groupHTML = createGroupHTML(group.name);
        // Append the group HTML to the groups container
        groupsContainer.innerHTML += groupHTML;
      });
      // this for select all view group buttons
      const showPostsButtons = document.querySelectorAll(".show-posts-button");
      const postsContainers = document.querySelectorAll(".posts");
      //2) function to display all group info (name,posts,comments,members)
      // Add click event listeners to the show posts buttons
      showPostsButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
          //empty the groups page to add the group to be displayed
          document.getElementById(
            "groupsContainer"
          ).innerHTML = `<div id="groupsContainer"></div>`;
          //console.log(postsContainers[0]);
          id = groups[index]._id; // group id (index indicated that the order of view groups buttons)
          name = groups[index].name; //group name
          localStorage.setItem("currentGroup", id); //save the current group id for further use
          //users = response.data.groups[1].users;
          //console.log(name, id);
          //second request: send get request to the backend and return the group selected by the user and it return all post in the group
          axios
            .get(`http://localhost:4000/post/${id}`, {
              headers: {
                Authorization: localStorage.getItem("Token"),
              },
            })
            .then(function (response) {
              //console.log(response.data);
              const posts = response.data.posts; //array containg all posts of the selected group
              console.log(posts);
              //////////////////////////////////////////////////////
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
              ///////////////////////////////////////////
              var groupsContainer = document.getElementById("groupsContainer");
              console.log(groupsContainer);
              // Insert groups into the container
              // Create HTML for the group
              var groupHTML = createGroupHTML(name);
              // Append the group HTML to the groups container
              groupsContainer.innerHTML += groupHTML;
              /////////////////////////////////////////////
              //this function to render the posts of the group on the screen
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
                <div class="create-comment">
                <input type="text" class="comment-input" placeholder="Write your comment here...">
                <button class="add-comment-button">Add Comment</button>
              </div>
                  <!-- More comments go here -->
                </div>
              </div>
            </div>
              `;
              }
              ///////////////////////////////////////////////////////////////////
              // get group's post container
              var postsContainer = document
                .getElementById(`${name}`)
                .getElementsByClassName("posts")[0];
              //console.log(postsContainer);
              // Insert posts into the group
              posts.forEach(function (post, index) {
                // Create HTML for the post
                if (post.user._id == localStorage.getItem("currentUserId")) {
                  //to knew that it belongs to the user
                  post.user.name = post.user.name + " (you)";
                }
                // create post
                var postHTML = createPostHTML(post, index);
                // Append the post HTML to the posts container
                postsContainer.innerHTML += postHTML;
              });
              //////////////////////////////

              //////////////////////////////
              // funtion for add likes to the post
              document
                .querySelectorAll(".like-button")
                .forEach(function (button) {
                  button.addEventListener("click", function () {
                    // Like button clicked
                    console.log("Post liked");
                  });
                });
              ///////////////////////////////////////////////////////
              //function for open and close comment
              document
                .querySelectorAll(".comment-button")
                .forEach(function (button, index) {
                  button.addEventListener("click", function () {
                    var commentsContainer =
                      this.parentNode.querySelector(".comments"); //this here refers to comments div of the post
                    commentsContainer.classList.toggle("hidden");
                    let currentPostId = posts[index]._id; //index here for order of the comment button
                    //get comments from data base
                    ////////////////////////////////////////////
                    //the user used this button to add comment to certain post
                    document
                      .querySelectorAll(".add-comment-button")
                      .forEach(function (button, index) {
                        button.addEventListener("click", function () {
                          // Get the input field for this comment to the post
                          const commentInput =
                            this.parentNode.querySelector(".comment-input");
                          // Get the comments container for this post
                          //console.log(commentsContainerIn);
                          // Get the value of the comment input field
                          const commentText = commentInput.value.trim();

                          // If the comment text is not empty
                          if (commentText !== "") {
                            // Create a new comment div
                            // post request to save the comment to the data base
                            axios
                              .post(
                                `http://localhost:4000/post/comments/${currentPostId}`,
                                {
                                  content: commentText,
                                },
                                {
                                  headers: {
                                    Authorization:
                                      localStorage.getItem("Token"),
                                  },
                                }
                              )
                              .then((response) => {
                                // adding comment and append it to the post
                                const newCommentDiv =
                                  document.createElement("div");
                                newCommentDiv.classList.add("comment");
                                newCommentDiv.innerHTML = `
                                <p><strong>Owner:</strong>${localStorage.getItem(
                                  "currentUserName"
                                )} (you)</p>
                                <p>${commentText}</p>
                      `;
                                // Append the new comment div to the comments container
                                commentsContainer.appendChild(newCommentDiv);

                                // Clear the comment input field
                                commentInput.value = "";
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }
                        });
                      });
                    /////////////////////////////////////////////
                    ///////
                    //current id for the post

                    console.log("postID:", currentPostId);
                    //means that not to load the comment again it loaded for one time
                    if (!commentsContainer.classList.contains("loaded")) {
                      // Get request : to get the comments of certain post
                      axios
                        .get(
                          `http://localhost:4000/post/comments/${currentPostId}`,
                          {
                            headers: {
                              Authorization: localStorage.getItem("Token"),
                            },
                          }
                        )
                        .then((response) => {
                          // Create a fragment to append all comments at once
                          // render the comments to the post
                          const returnedComments = response.data.comments; //conatains all comments of post
                          if (returnedComments.length != 0) {
                            //there are comments
                            const fragment = document.createDocumentFragment();

                            // Loop through each comment and create HTML
                            returnedComments.forEach((comment) => {
                              let commentOwner = comment.user.name; //writer name of the comment
                              const commentUser = comment.user._id; //writer id of the comment
                              const commentText = comment.content; //comment content
                              //check that the current login user is the owner of the comment
                              if (
                                commentUser ==
                                localStorage.getItem("currentUserId")
                              ) {
                                commentOwner += " (You)";
                              }
                              const commentElement =
                                document.createElement("div");
                              commentElement.classList.add("comment");
                              commentElement.innerHTML = `
                            <p><strong>Owner:</strong>${commentOwner}</p>
                            <p>${commentText}</p>
                            `;
                              // Append comment element to fragment
                              fragment.appendChild(commentElement);
                            });

                            // Append all comments to the comments container
                            commentsContainer.appendChild(fragment);
                          }
                          // Mark comments as loaded
                          commentsContainer.classList.add("loaded");
                        })
                        .catch((error) => {
                          console.error("Error fetching comments:", error);
                        });
                    }
                    ///////
                  });
                });
              //postsContainers[index].classList.toggle("hidden");
              // Get references to post input fields and post buttons
              //get all post input fields
              const postInputs = document.querySelectorAll(".post-input");
              const postButtons = document.querySelectorAll(".post-button");
              const postsContainers = document.querySelectorAll(".posts");

              // Add click event listeners to the post buttons
              // this function is used to create post on the group when click post button
              postButtons.forEach((button, index) => {
                button.addEventListener("click", function () {
                  // Get the value of the post input field
                  const postText = postInputs[index].value.trim();
                  // If the post text is not empty
                  if (postText !== "") {
                    // Create a new post div
                    //Post request to save the post to the data base and render it to the screen
                    axios
                      .post(
                        "http://localhost:4000/post/",
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
                        //creating new post and append it to the group posts
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
              alert(error.response.data.message);
            });
        });
      });
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });

  console.log("Searching for: " + searchInput);
});
// Get references to the show posts buttons and posts divs
