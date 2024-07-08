async function shortURL() {
  const url = document.getElementById("url").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Shortening URL...";

  try {
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
    );
    if (response.ok) {
      const data = await response.text();
      resultDiv.innerHTML = `
                Shortened URL: <a href="${data}" target="_blank">${data}</a>`;

      // Show success toast notification
      toastr.success("URL successfully shortened!", "Success", {
        timeOut: 4000,
      });
    } else {
      resultDiv.innerHTML = "Error shortening the URL.";
      // Show error toast notification
      toastr.error("Error shortening the URL.", "Error", { timeOut: 4000 });
    }
  } catch (error) {
    resultDiv.innerHTML = "An error occurred. Please try again.";
    // Show error toast notification
    toastr.error("An error occurred. Please try again.", "Error", {
      timeOut: 4000,
    });
  }
}
