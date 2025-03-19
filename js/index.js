document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("search-form");
    const input = document.getElementById("search-input");
    const resultsDiv = document.getElementById("results");
    const reposDiv = document.getElementById("repos");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.trim();
      if (query) searchUsers(query);
    });
  
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: { "Accept": "application/vnd.github.v3+json" }
      })
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => console.error("Error fetching users:", error));
    }
  
    function displayUsers(users) {
      resultsDiv.innerHTML = "";
      reposDiv.innerHTML = "";
      users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="100">
          <h3>${user.login}</h3>
          <a href="${user.html_url}" target="_blank">View Profile</a>
          <button onclick="fetchRepos('${user.login}')">View Repos</button>
        `;
        resultsDiv.appendChild(userCard);
      });
    }
  
    window.fetchRepos = function(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: { "Accept": "application/vnd.github.v3+json" }
      })
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        })
        .catch(error => console.error("Error fetching repos:", error));
    };
  
    function displayRepos(repos) {
      reposDiv.innerHTML = "<h2>Repositories</h2>";
      repos.forEach(repo => {
        const repoItem = document.createElement("p");
        repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposDiv.appendChild(repoItem);
      });
    }
  });
  