# nodejs中的文件路径问题

## Node.js 中 __dirname 和 ./ 的区别

Node.js 中，__dirname 总是指向被执行 js 文件的绝对路径，所以当你在 /d1/d2/myscript.js 文件中写了 __dirname， 它的值就是 /d1/d2

相反，./ 会返回你执行 node 命令的路径，例如你的工作路径。

有一个特殊情况是在 require() 中使用 ./ 时，这时的路径就会是含有 require() 的脚本文件的相对路径。

这个一般是什么情况会涉及呢？在我写脚手架的时候就会遇到这种情况，那就是脚手架被安装到node_modules文件夹里面了。用户在他希望初始化项目的路径生成项目的时候，`./`就是表示用户敲命令的路径，而__dirname就是脚手架被安装的位置。
