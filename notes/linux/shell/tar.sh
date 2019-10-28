# 将DirName目录打包成FileName.tar
# -c建立新的压缩文件
# -v显示操作过程
# -f指定压缩文件
tar -cvf FileName.tar DirName

# -z支持gzip压缩
tar -zcvf FileName.tar.gz DirName
# -z等同于gzip
gzip -d FileName.gz

# -x从压缩文件中提取
tar -xvf FileName.tar 
tar -zxvf FileName.tar.gz

# -j 支持bzip2压缩文件
tar -jcvf FileName.tar.bz2 DirName
