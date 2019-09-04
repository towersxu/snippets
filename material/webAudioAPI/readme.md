# webaudio笔记

## AudioContext

`AudioContext.createScriptProcessor()`创建一个`ScriptProcessorNode`用于通过JavaScript直接处理音频。

`ScriptProcessorNode`接口允许使用JavaScript生成、处理、分析音频.它是一个 AudioNode,连接着两个缓冲区音频处理模块, 其中一个缓冲区包含输入音频数据，另外一个包含处理后的输出音频数据.实现了 AudioProcessingEvent 接口的一个事件，每当输入缓冲区有新的数据时，事件将被发送到该对象，并且事件将在数据填充到输出缓冲区后结束.
