import * as fs from "fs";
import * as path from "path";
import * as bootstrap from "bootstrap";
import logger from "./logger";

interface returnDom {
  sidebar: HTMLDivElement;
  mainContent: HTMLDivElement;
}

class Main {
  sidebar: HTMLDivElement;
  mainContent: HTMLDivElement;

  constructor() {
    new logger().log("Main constructor");
    const ret = this.getDom();
    this.sidebar = ret.sidebar;
    this.mainContent = ret.mainContent as HTMLDivElement;
  }

  async start() {
    const fileData = await fs.readFileSync(
      path.join(__dirname, "../data.json"),
      "utf8"
    );
    const jsonList = await JSON.parse(fileData);

    this.sidebar.innerHTML = "<ul>";
    await jsonList.forEach((jsonData) => {
      this.sidebar.innerHTML += `<li>${jsonData.id} : ${jsonData.data}</li>`;
    });
    this.sidebar.innerHTML += "</ul>";

    this.mainContent.innerHTML = "<p>TypeScriptから書いてます</p>";
  }

  getDom(): returnDom {
    const sidebar = document.querySelector("#sidebar") as HTMLDivElement;
    const mainContent = document.querySelector("#main") as HTMLDivElement;
    if (!sidebar || !mainContent) {
      throw new Error("DOMが取れませんでした");
    }
    return { sidebar: sidebar, mainContent: mainContent };
  }
}

const main = new Main();
main.start();
