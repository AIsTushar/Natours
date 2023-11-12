import { showAlert } from "./alerts.js";
const logoutButton = document.querySelector(".nav__el--logout");

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (res.data.status === "success") location.reload(true);
  } catch (err) {
    showAlert("error", "Error logging out! Try again.");
  }
  logoutButton.textContent = "Log out";
};

if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}
