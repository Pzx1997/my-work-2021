##  flutter 环境

+ 根据官网操作：运行 flutter doctor 后报错

  ```powershell
  Android toolchain - develop for Android devices (Android SDK version 31.0.0)
  X Android license status unknown.
  Run `flutter doctor --android-licenses` to accept the SDK licenses.
  See https://flutter.dev/docs/get-started/install/windows#android-setup for more details.
  ```

  按照提示运行 flutter doctor --android-licenses 后发现报错找不到 Android SDK 检查发现安装路径有空格所以安装失败 修改路径后 重新安装 问题解决。


+ 还有找不到 Android Studio 

  ```powershell
  Android Studio (not installed)
  ```

  主动定位 flutter config --android-studio-dir D:\Program Files\Android\Android Studio\bin 

  发现命令无法解析空格

  解决办法： 重装 Android Studio 路径不能包含空格，中文（修改环境变量）



##  Flutter 运行

+ 夜神模拟器 运行会有意想不到的BUG，真机则不会。
