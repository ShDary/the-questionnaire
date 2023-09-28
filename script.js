const form = document.querySelector(".form");

function showNotification(message) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerText = message;

  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

async function sendFormData(formData) {
  try {
    const response = await fetch(`http://46.21.248.81:3001/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    if (!response.ok) {
      return { error:
        alert("Произошла ошибка при отправке"),
    }
  }
    showNotification("Данные успешно отправлены");
    return true;
  } catch (error) {
    console.error(error);
    showNotification(error.message);
    return false;
  }
}

form.addEventListener("submit", async (event) => {
  // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
  // https://learn.javascript.ru/default-browser-action
  event.preventDefault();

  const formData = new FormData(form);
  const isSuccessful = await sendFormData(formData);

  if (isSuccessful) {
    form.reset();
  }
});


