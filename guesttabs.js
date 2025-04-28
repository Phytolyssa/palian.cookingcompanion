const buttons = document.querySelectorAll('.tab-buttons button');
const content = document.getElementById('tab-content');

// Load default tab (first one)
fetch(buttons[0].dataset.tab)
  .then(res => res.text())
  .then(data => content.innerHTML = data);

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Highlight active button
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Load content dynamically
    const file = button.dataset.tab;
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then(data => {
        content.innerHTML = data;
      })
      .catch(error => {
        content.innerHTML = `<p>Sorry, there was a problem loading this content.</p>`;
        console.error(error);
      });
  });
});