import { showAlert } from "./alerts.js";

const updateSetting = document.querySelector(".form-user-data");
const updatePassword = document.querySelector(".form-user-password");
const btnSavePassword = document.querySelector(".btn--save-password");

// Type is either password or data
const updateData = async (data, type) => {
  const url =
    type === "password"
      ? "http://localhost:3000/api/v1/users/updateMyPassword"
      : "http://localhost:3000/api/v1/users/updateMe";
  try {
    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", "Data Updated successfully!");
      location.reload();
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

updateSetting.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append("name", document.getElementById("name").value);
  form.append("email", document.getElementById("email").value);
  form.append("photo", document.getElementById("photo").files[0]);

  updateData(form, "data");
});

updatePassword.addEventListener("submit", async (e) => {
  e.preventDefault();
  const passwordCurrent = document.getElementById("password-current").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("password-confirm").value;
  btnSavePassword.textContent = "Updating...";
  await updateData({ passwordCurrent, password, passwordConfirm }, "password");

  document.getElementById("password-current").value = "";
  document.getElementById("password").value = "";
  document.getElementById("password-confirm").value = "";
  btnSavePassword.textContent = "Save Password";
});
