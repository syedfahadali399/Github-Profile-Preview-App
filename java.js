let form = document.getElementById("form")
let reset = document.getElementById("reset")
let getUsername = document.getElementById("username")
let sreachbtn = document.getElementById("sreach")
let showProfilePic = document.getElementById("user-profile")
let showUsername = document.getElementById("user-name")
let showUserActualname = document.getElementById("actual-user-name")
let showUserbio = document.getElementById("user-bio")
let showGithubProfileLink = document.getElementById("github-profile-link")
let showUserFollower = document.getElementById("user-followers")
let showUserFollowing = document.getElementById("user-following")
let showUserReposNumber = document.getElementById("user-repos-num")
let showUserLocation = document.getElementById("user-location")
let showUserCompany = document.getElementById("user-company")
let showUserBlog = document.getElementById("user-blog")
let showUserEmail = document.getElementById("user-email")
let showError = document.getElementById("user-doesnot-exist")
let toggleMode = document.getElementById("mode")
let section = document.getElementById("section")
let body = document.getElementById("body")
let value;

let hideElementBeforeSreach = (bool) => {
    
    showProfilePic.hidden = bool
    showUsername.hidden = bool
    showUserActualname.hidden = bool
    showUserbio.hidden = bool
    showGithubProfileLink.hidden = bool
    showUserFollower.hidden = bool
    showUserFollowing.hidden = bool
    showUserReposNumber.hidden = bool
    showUserLocation.hidden = bool
    showUserCompany.hidden = bool
    showUserBlog.hidden = bool
    showUserEmail.hidden = bool
    
}

let clearValue = () => {

    showProfilePic.src = ""
    showUsername.textContent = ""
    showUserActualname.textContent = ""
    showUserbio.textContent = ""
    showGithubProfileLink.hidden = true
    showUserFollower.textContent = ""
    showUserFollowing.textContent = ""
    showUserReposNumber.textContent = ""
    showUserLocation.textContent = ""
    showUserCompany.textContent = ""
    showUserBlog.textContent = ""
    showUserEmail.textContent = ""
}

window.onload = () => {
    hideElementBeforeSreach(value = true)
    showError.hidden = true
}

let showData = (picture, name, username, bio, url, followers, following, repoNum, location, company, blog, email) => {
    
    hideElementBeforeSreach(value = false)
    showError.hidden = true

    showProfilePic.src = picture

    if(name === null || undefined || "") {
        showUsername.textContent = `user does not add their name`    
    } else {
        showUsername.textContent = `${name}`
    }
    
    showUserActualname.textContent = `${username}`
    
    if(bio === null || undefined || "") {
        showUserbio.textContent = `user does not add their bio`    
    } else {
        showUserbio.textContent = `${bio}`
    }

    showGithubProfileLink.hidden = false
    showGithubProfileLink.href = `${url}`

    showUserFollower.textContent = `${followers}`

    showUserFollowing.textContent = `${following}`

    showUserReposNumber.textContent = `${repoNum}`

    if(location === null || undefined || "") {
        showUserLocation.textContent = `user does not add their location`    
    } else {
        showUserLocation.textContent = `${location}`
    }

    if(company === null || undefined || "") {
        showUserCompany.textContent = `user does not add their company`    
    } else {
        showUserCompany.textContent = `${company}`
    }

    if(blog === "") {
        showUserBlog.textContent = `user does not add their blog`    
    } else {
        showUserBlog.href = blog
        showUserBlog.textContent = `${blog}`
    }
    
    if(email === null || undefined || "") {
        showUserEmail.textContent = `user does not add their email address`    
    } else {
        showUserEmail.textContent = `${email}`    
    }
}

let fetchData = (username) => {

    fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
        if(!response.ok) {
            throw new Error("api limit is full")
        }
        return response.json()
    })
    .then((data) => {
        console.log(data);
        showData(
            data.avatar_url,
            data.name,
            data.login,
            data.bio,
            data.html_url,
            data.followers,
            data.following,
            data.public_repos,
            data.location,
            data.company,
            data.blog,
            data.email,
        )
    })
    .catch((error) => {

        clearValue()
        showError.hidden = false
        showError.textContent = `User does not Exist`
        showProfilePic.hidden = true
        throw new Error("Failed to fetch data", error)

    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    let convertIntoString = getUsername.value.trim()

    fetchData(convertIntoString)
})

reset.addEventListener("click", (e) => {
    e.preventDefault()

    getUsername.value = ""
    showError.hidden = true
    hideElementBeforeSreach(value = true)

})

toggleMode.addEventListener("change", (e) => {
    e.preventDefault()

    if(e.target.checked) {
        body.classList.add("dark-mode")
        body.classList.remove("light-mode")
        section.style.backgroundColor = "black"
        section.style.color = "white"
        section.style.border = "3px solid white"
    } else {
        body.classList.add("light-mode")
        body.classList.remove("dark-mode")
        section.style.backgroundColor = "white"
        section.style.color = "black"
        section.style.border = "3px solid black"
    }
})