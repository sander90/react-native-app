
#!/usr/bin/env bash


basedir=`cd $(dirname $0); pwd -P`

echo "当前的路径 = " + $basedir;


echo "请输入项目的路径 : "

read root_path

echo "输入的项目路径 " + $root_path;




if [ ! -d "$root_path" ]; then
	mkdir $root_path
fi


echo "请输入项目的名称 " 
read root_name

cd $root_path

react-native init $root_name



cp -R "$basedir/app" "$root_path/$root_name"


cd "$root_path/$root_name"




echo "现在执行 npm install react-redux --save"

npm install react-redux --save

echo "现在执行 npm install redux --save"

npm install redux --save

echo "现在执行 npm install redux-saga --save"

npm install redux-saga --save

echo "现在执行 npm install redux-persist --save"

npm install redux-persist --save

echo "现在执行 npm install reduxsauce --save"
npm install reduxsauce --save

echo "现在执行 npm install prop-types --save"

npm install prop-types --save
echo "现在执行 npm install react-native-root-toast --save"

npm install react-native-root-toast --save
echo "现在执行 npm install react-native-vector-icons --save"

npm install react-native-vector-icons --save
echo "现在执行 npm install react-native-device-info --save"

npm install react-native-device-info --save
echo "现在执行 npm install ramda --save"

npm install ramda --save
echo "现在执行 npm install react-native-gesture-handler --save"

npm install react-native-gesture-handler --save
echo "现在执行 npm install seamless-immutable --save"

npm install seamless-immutable --save

## 下面 scrollerPageview 

echo "现在执行 npm install react-timer-mixin --save"
npm install react-timer-mixin --save


echo "现在执行 npm install react-navigation --save"

npm install react-navigation --save


react-native link







