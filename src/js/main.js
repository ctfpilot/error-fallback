const POLL_INTERVAL = 5000;
const parser = new DOMParser();

function errorHandler(e) {
  console.error("Error during challenge readiness check:", e);
  setTimeout(() => {
    location.reload();
  }, 5000);
}

function checkService() {
  const host = window.location.origin;
  fetch(host)
    .then(res => {
      if (res.status === 200) {
        // Parse response text
        res.text()
          .then(text => {
            // Check if 200 res has same title as this loading page
            try {
              const doc = parser.parseFromString(text, "text/html");
              if (doc.title !== document.title) {
                location.reload();
              }
            } catch (e) {
              errorHandler(e);
            }
          }).catch(e => errorHandler(e));
      } else { console.info("instance not ready"); }
    })
    .catch(e => errorHandler(e));
}

checkService();
setInterval(() => checkService(), POLL_INTERVAL);
