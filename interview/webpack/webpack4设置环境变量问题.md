# webpack4设置环境变量问题

1. 在webpack4之前，可以直接使用cross-env设置任意环境变量`anystring`。然后在代码中直接通过`process.env.anystring`获取。一般我们是用`NODE_ENV`。在webpack 4之后，因为有了mode, 这样直接设置则不行了。可以使用`new webpack.EnvironmentPlugin(['NODE_ENV', 'LIB_TYPE'])`来实现一样的功能。