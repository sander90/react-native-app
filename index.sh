
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

npm install react-navigation --save

npm install react-redux --save

npm install redux --save

npm install redux-saga --save

npm install redux-persist --save

npm install reduxsauce --save

npm install prop-types --save

npm install react-native-root-toast --save

npm install react-native-vector-icons --save

npm install react-native-device-info --save

npm install ramda --save

npm install react-native-gesture-handler --save


react-native link







