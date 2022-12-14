function displayHeaderActions() {
  const header = document.querySelector("header");
  console.log("--- ", header);
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    const account = displayUserAccountInfoHeader(parsedUser.email);
    //@ts-ignore
    header.prepend(account);
  } else {
    const headerActions = createDisplayHeaderActions();
    //@ts-ignore
    header.prepend(headerActions);
  }
}

function createDisplayHeaderActions() {
  const headerContainer = document.createElement("div");
  headerContainer.setAttribute("id", "header-actions");

  const navigationList = document.createElement("ul");

  const viewStoreLink = document.createElement("li");
  const viewStoreSpan = document.createElement("span");
  const viewStoreSpanTag = document.createElement("a");
  viewStoreSpanTag.setAttribute("href", "shop.html");
  viewStoreSpanTag.textContent = "View store";
  viewStoreSpan.appendChild(viewStoreSpanTag);
  viewStoreLink.append(viewStoreSpan);

  const seperator = document.createElement("li");
  seperator.textContent = "|";
  const loginLink = document.createElement("li");
  const loginSpan = document.createElement("span");
  const loginSpanTag = document.createElement("a");
  loginSpanTag.setAttribute("href", "login.html");
  loginSpanTag.textContent = "Login";
  loginSpan.append(loginSpanTag);
  loginLink.append(loginSpan);

  const seperator2 = document.createElement("li");
  seperator2.textContent = "|";

  const signUpLink = document.createElement("li");
  const signUpSpan = document.createElement("span");
  const signupLinkTag = document.createElement("a");
  signupLinkTag.setAttribute("href", "signup.html");
  signupLinkTag.textContent = "Register";
  signUpSpan.append(signupLinkTag);
  signUpLink.append(signUpSpan);

  const iconlist = document.createElement("li");
  const iconItem = document.createElement("i");
  iconItem.setAttribute("class", "fa fa-search");
  iconlist.append(iconItem);

  navigationList.append(
    viewStoreLink,
    seperator,
    loginLink,
    seperator2,
    signUpLink,
    iconlist
  );
  headerContainer.append(navigationList);
  return headerContainer;
}
function displayUserAccountInfoHeader(name) {
  const header = document.querySelector("header");
  const container = document.createElement("div");
  container.setAttribute("id", "user-account-info");

  const icon = document.createElement("i");
  icon.setAttribute("class", "fa fa-user");

  const spanEl = document.createElement("span");
  spanEl.textContent = name;

  container.addEventListener("click", () => {
    const logoutMenu = createLogOutMenu(container);
    header?.prepend(logoutMenu);
  });
  container.append(icon, spanEl);
  return container;
}

function createLogOutMenu(accountMenu) {
  const header = document.querySelector("header");
  // 	<!-- <div id="logout-menu">
  // 	<ol>
  // 		<li>View Profile</li>
  // 		<li>Log out</li>
  // 	</ol>
  // </div>
  const logoutMenu = document.createElement("div");
  logoutMenu.setAttribute("id", "logout-menu");

  const list = document.createElement("ol");
  const viewProfileElement = document.createElement("li");
  viewProfileElement.textContent = "View Profile";
  const logoutElement = document.createElement("li");
  logoutElement.textContent = "Log Out";
  logoutElement.addEventListener("click", () => {
    localStorage.clear();
    const url = document.URL;
    if (url.includes("shopping-cart")) {
      location.href = "login.html";
    }
    //@ts-ignore
    header?.removeChild(accountMenu);
    header?.removeChild(logoutMenu);
    displayHeaderActions();
  });

  list.append(viewProfileElement, logoutElement);
  logoutMenu.append(list);
  return logoutMenu;
}

function main() {
  displayHeaderActions();
}

main();
