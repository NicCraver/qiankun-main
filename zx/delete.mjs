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
    type: "checkbox",
    name: "apps",
    message: "请选择要卸载的模块（按a全选，按回车直接卸载全部）",
    choices: sub_apps,
  },
];

inquirer.prompt(question).then(async (answer) => {
  let sub_apps_ = answer.apps.length ? answer.apps : sub_apps;
  install(sub_apps_);
});

function install(apps) {
  apps.forEach((el) => {
    doIt(el);
  });
}
const doIt = async (el) => {
  await $`cd ../${el} && rimraf node_modules`;
  console.log(`${el}  ` + chalk.green("success！"));
};
