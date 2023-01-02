function displayHeaderActions() {
  const header = document.querySelector("header");
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
  viewStoreSpan.textContent = "View store";
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
  const container = document.createElement("div");
  container.setAttribute("id", "user-account-info");

  const icon = document.createElement("i");
  icon.setAttribute("class", "fa fa-user");

  const spanEl = document.createElement("span");
  spanEl.textContent = name;

  container.append(icon, spanEl);
  return container;
}
function main() {
  displayHeaderActions();
}

main();
