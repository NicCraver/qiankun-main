#!/usr/bin/env zx
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer"); // 用于命令行交互
const chalk = require("chalk");

const sub_app_ath = path.resolve(__dirname, "..");
const sub_apps = fs
  .readdirSync(sub_app_ath)
  .filter((i) => /^anx-core|main|dashboard|subapp/.test(i));

const question = [
  {
    type: "list",
    name: "npm",
    message: "请选择要使用的包管理器",
    choices: ["yarn", "npm", "cnpm"],
  },
  {
    type: "checkbox",
    name: "apps",
    message: "请选择要install的模块（按a全选，按回车直接install全部）",
    choices: sub_apps,
  },
  {
    type: "list",
    name: "skip",
    message: "是否跳过已经存在node_modules的应用",
    choices: ["yes", "no"],
  },
];

inquirer.prompt(question).then(async (answer) => {
  let sub_apps_ = answer.apps.length ? answer.apps : sub_apps;
  let npm = answer.npm;
  let skip = answer.skip;
  install(sub_apps_, npm, skip);
});

function install(apps, npm, skip) {
  apps.forEach((el) => {
    if (!fs.existsSync(`../${el}/package.json`)) {
      console.log(`${el} 应用缺少package.json文件，将跳过此应用`);
      return false;
    }
    if (fs.existsSync(`../${el}/node_modules`) && skip === "yes") {
      console.log(`${el} 应用已检测到node_modules目录，将跳过此应用`);
      return false;
    }
    doIt(npm, el);
  });
}
const doIt = async (npm, el) => {
  await $`cd ../${el} && ${npm} install`;
  console.log(`${el}  ` + chalk.green("success"));
};
