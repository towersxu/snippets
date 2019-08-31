# fetch

fetch规范jQuery.ajax()主要有两种方式的不同

- 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
- 默认情况下，fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）。自从2017年8月25日后，默认的credentials政策变更为same-originFirefox也在61.0b13中改变默认值

- fetch直接返回的是一个对象，真正的内容在response的body里面，是steams。steams可以通过response.json()将其转换为json
