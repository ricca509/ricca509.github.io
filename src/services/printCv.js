const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:8000", {
    waitUntil: "networkidle2",
  });
  await page.pdf({
    path: "./static/riccardo-coppola-cv.pdf",
    format: "A4",
    margin: { top: "30px", bottom: "30px", right: "20px", left: "20px" },
  });

  await browser.close();
})();
