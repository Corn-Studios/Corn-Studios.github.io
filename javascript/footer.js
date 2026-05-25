(function () {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <span class="footer-logo">CORN_STUDIOS</span>
    <div class="footer-links">
      <a href="https://github.com/Corn-Studios" target="_blank">GitHub</a>
      <a href="https://instagram.com/cornstudiosdev" target="_blank">Instagram</a>
      <a href="https://www.fiverr.com/connorcorn07?public_mode=true" target="_blank">Fiverr</a>
      <a href="https://ko-fi.com/cornstudiosdev" target="_blank">Ko-fi</a>
      <a href="https://cornstudio.gumroad.com/" target="_blank">Gumroad</a>
      <a href="builds.html">Corn Builds</a>
      <a href="contact.html">Contact</a>
      <a href="privacy.html">Privacy Policy</a>
    </div>
    <span class="footer-copy">© ${new Date().getFullYear()} Corn Studios — Dutchess County, NY</span>
  `;
  document.body.appendChild(footer);
})();
