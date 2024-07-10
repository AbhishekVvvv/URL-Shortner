async function shortURL() {
    console.log("function running successfully")
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
          Shortened URL: <a href="${data}" target="_blank">${data}</a>
          <button class="btn btn-success btn-sm mt-2" onclick="downloadURL('${data}')">Download</button>`;
        
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
  
  function downloadURL(shortURL) {
    const blob = new Blob([shortURL], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'shortened_url.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
