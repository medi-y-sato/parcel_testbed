import * as fs from "fs";
import * as path from "path";
import * as bootstrap from "bootstrap";
import logger from "./logger";

class Main {
  sidebar;
  mainContent;

  constructor() {
    new logger().log("Main constructor");
    const ret = this.getDom();
    this.sidebar = ret.sidebar as HTMLDivElement;
    this.mainContent = ret.mainContent as HTMLDivElement;
  }

  async start() {
    const fileList: Array<string> = await this.getFileList();
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
  }

  async getFileList() {
    return [];
  }

  getDom() {
    const sidebar = document.querySelector("#sidebar");
    const mainContent = document.querySelector("#main");
    if (!sidebar || !mainContent) {
      throw new Error("DOMが取れませんでした");
    }
    return { sidebar: sidebar, mainContent: mainContent };
  }
}

const main = new Main();
main.start();
