#!/usr/bin/env bash

basedir=`cd $(dirname $0); pwd -P`

echo "当前的路径 = " + $basedir;

actions_dir="./app/actions"



function checkoutFile() {
	if [ -d "$actions_dir" ]; then
		echo "actions 文件存在，现在可以往里面添加内容"
	fi

	if [ -f "$actions_dir/Types.js" ]; then
		echo "Types 文件存在的，可以写入";
	fi
}

function writeTypes() {

}


checkoutFile


echo "现在需要设置Types值：[1]：输入type 值 【2】：进入下一步"

read action_type

while [[ $action_type == 2 ]]; do
	#statements
done