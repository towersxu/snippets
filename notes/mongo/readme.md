# mongo笔记

## 启动命令

mongod --auth --dbpath ./mongodata  —port 12121

mongo不指定端口，默认27017

mongo客户端MongoDB Compass

mongod --auth --quiet --fork --cpu --logpath ./log/mongo/mongo.log --dbpath ./mongodata --port 12121

mongo

show dbs

use admin

db.auth('root', 'xxxx')

mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

## mongo增加用户

mongodb  增加用户

db.addUser在新版本(3.0后)上无法使用，必须使用db.createUser.

mongod -port xxx --dbpath ./mongodata

mongo --port xxx

db.createUser

然后重新mongod， 加入auth

nohup mongod -port xxx --auth --fork --logpath log/mongo/fork.log --dbpath ./mongodata > log/mongo/mongo.log &

## 数据迁移

mongoexport -d DataBaseName -c CollectionName -o XXX.dat

mongoimport -h 127.0.0.1:port -u xxx -p xxx-d DataBaseName -c CollectionName XXX.dat

## 常见查询

### mongoose分页查找

```js
queryList: function (criteria, options = { limit: 10, select: 'name' }, callback) {
  return this.find(criteria)
    .skip(options.per_page * (options.page - 1))
    .limit(options.per_page)
    // .sort({ createdAt: -1 })
    .select(options.select)
    .populate('user', 'username')
    .exec(callback);
}
```

### 子文档分页

```js
db.test1.find(
  {"_id" : ObjectId("55dc145ef754a3342000002d")},
  {"games":{ "$slice":[0,3]}}
).pretty()
```

### 关联查询

mongo populate 关联查询

### mongoose virtual

mongoose virtual  数据中不存在这个东西，但是在代码中可以这样获取。

```js
UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });
```
