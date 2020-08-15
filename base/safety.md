### 1. XSS：跨站脚本攻击
攻击者想尽一切办法将可以执行的代码注入到网页中

**存储型（server端）**
- 场景：见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。
- 攻击步骤：
  i）攻击者将恶意代码提交到目标网站的数据库中
  ii）用户打开目标网站时，服务端将恶意代码从数据库中取出来，拼接在HTML中返回给浏览器
  iii）用户浏览器在收到响应后解析执行，混在其中的恶意代码也同时被执行
  iv）恶意代码窃取用户数据，并发送到指定攻击者的网站，或者冒充用户行为，调用目标网站的接口，执行恶意操作
  
**反射型（Server端）**
与存储型的区别在于，存储型的恶意代码存储在数据库中，反射型的恶意代码在URL上

- 场景：通过 URL 传递参数的功能，如网站搜索、跳转等。
- 攻击步骤：
  i）攻击者构造出特殊的 URL，其中包含恶意代码。
  ii）用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
  iii）用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
  iv）恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。
  
**Dom 型(浏览器端）**
DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。

- 场景：通过 URL 传递参数的功能，如网站搜索、跳转等
- 攻击步骤：
  i）攻击者构造出特殊的 URL，其中包含恶意代码。
  ii）用户打开带有恶意代码的 URL。
  iii）用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
  iv）恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

**预防方案：（防止攻击者提交恶意代码，防止浏览器执行恶意代码）**
  1. 对数据进行严格的输出编码：如HTML元素的编码，JS编码，CSS编码，URL编码等等
  避免拼接 HTML；Vue/React 技术栈，避免使用 v-html / dangerouslySetInnerHTML
  2. CSP HTTP Header，即 Content-Security-Policy、X-XSS-Protection
  增加攻击难度，配置CSP(本质是建立白名单，由浏览器进行拦截)
  3. 输入验证：比如一些常见的数字、URL、电话号码、邮箱地址等等做校验判断
  4. 开启浏览器XSS防御：Http Only cookie，禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。
  5. 验证码
  
### 2. CSRF：跨站请求伪造
攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

**攻击流程**
  i）受害者登录 a.com，并保留了登录凭证（Cookie）
  ii）攻击者引诱受害者访问了b.com
  iii）b.com 向 a.com 发送了一个请求：a.com/act=xx浏览器会默认携带a.com的Cookie
  iv）a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求
  v）a.com以受害者的名义执行了act=xx
  vi）攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作
**攻击类型**
  i）GET型：如在页面的某个 img 中发起一个 get 请求
  ii）POST型：通过自动提交表单到恶意网站
  iii）链接型：需要诱导用户点击链接
**预防方案**
CSRF通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对CSRF的防护能力来提升安全性。）

  i）同源检测：通过Header中的Origin Header 、Referer Header 确定，但不同浏览器可能会有不一样的实现，不能完全保证
  ii）CSRF Token 校验：将CSRF Token输出到页面中（通常保存在Session中），页面提交的请求携带这个Token，服务器验证Token是否
  正确
  iii）双重cookie验证：

**流程：**
  1：在用户访问网站页面时，向请求域名注入一个Cookie，内容为随机字符串（例如csrfcookie=v8g9e4ksfhw）
  2：在前端向后端发起请求时，取出Cookie，并添加到URL的参数中（接上例POST https://www.a.com/comment?csrfcookie=v8g9e4ksfhw）
  3：后端接口验证Cookie中的字段与URL参数中的字段是否一致，不一致则拒绝。
**优点：**
  无需使用Session，适用面更广，易于实施。
  Token储存于客户端中，不会给服务器带来压力。
  相对于Token，实施成本更低，可以在前后端统一拦截校验，而不需要一个个接口和页面添加。
**缺点：**
-Cookie中增加了额外的字段。
-如果有其他漏洞（例如XSS），攻击者可以注入Cookie，那么该防御方式失效。
-难以做到子域名的隔离。
-为了确保Cookie传输安全，采用这种防御方式的最好确保用整站HTTPS的方式，如果还没切HTTPS的使用这种方式也会有风险。
iv）Samesite Cookie属性：Google起草了一份草案来改进HTTP协议，那就是为Set-Cookie响应头新增Samesite属性，它用来标明这个 Cookie是个“同站 Cookie”，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值，Strict 为任何情况下都不可以作为第三方 Cookie ，Lax 为可以作为第三方 Cookie , 但必须是Get请求
3）iframe 安全
说明：
i）嵌入第三方 iframe 会有很多不可控的问题，同时当第三方 iframe 出现问题或是被劫持之后，也会诱发安全性问题
ii）点击劫持
攻击者将目标网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，诱导用户点击。
iii）禁止自己的 iframe 中的链接外部网站的JS
预防方案：
i）为 iframe 设置 sandbox 属性，通过它可以对iframe的行为进行各种限制，充分实现“最小权限“原则
ii）服务端设置 X-Frame-Options Header头，拒绝页面被嵌套，X-Frame-Options 是HTTP 响应头中用来告诉浏览器一个页面是否可以嵌入 <iframe> 中
eg.X-Frame-Options: SAMEORIGIN
SAMEORIGIN: iframe 页面的地址只能为同源域名下的页面
ALLOW-FROM: 可以嵌套在指定来源的 iframe 里
DENY: 当前页面不能被嵌套在 iframe 里
iii）设置 CSP 即 Content-Security-Policy 请求头
iv）减少对 iframe 的使用
4）错误的内容推断
说明：
文件上传类型校验失败后，导致恶意的JS文件上传后，浏览器 Content-Type Header 的默认解析为可执行的 JS 文件

预防方案：
设置 X-Content-Type-Options 头

5）第三方依赖包
减少对第三方依赖包的使用，如之前 npm 的包如：event-stream 被爆出恶意攻击数字货币；

6）HTTPS
描述：
黑客可以利用SSL Stripping这种攻击手段，强制让HTTPS降级回HTTP，从而继续进行中间人攻击。

预防方案：
使用HSTS（HTTP Strict Transport Security），它通过下面这个HTTP Header以及一个预加载的清单，来告知浏览器和网站进行通信的时候强制性的使用HTTPS，而不是通过明文的HTTP进行通信。这里的“强制性”表现为浏览器无论在何种情况下都直接向务器端发起HTTPS请求，而不再像以往那样从HTTP跳转到HTTPS。另外，当遇到证书或者链接不安全的时候，则首先警告用户，并且不再
用户选择是否继续进行不安全的通信。

7）本地存储数据
避免重要的用户信息存在浏览器缓存中

8）静态资源完整性校验
描述
使用 内容分发网络 (CDNs) 在多个站点之间共享脚本和样式表等文件可以提高站点性能并节省带宽。然而，使用CDN也存在风险，如果攻击者获得对 CDN 的控制权，则可以将任意恶意内容注入到 CDN 上的文件中 （或完全替换掉文件），因此可能潜在地攻击所有从该 CDN 获取文件的站点。

预防方案
将使用 base64 编码过后的文件哈希值写入你所引用的 <script> 或 标签的 integrity 属性值中即可启用子资源完整性能。

9）网络劫持
描述：
DNS劫持（涉嫌违法）：修改运行商的 DNS 记录，重定向到其他网站。DNS 劫持是违法的行为，目前 DNS 劫持已被监管，现在很少见 DNS 劫持
HTTP劫持：前提有 HTTP 请求。因 HTTP 是明文传输，运营商便可借机修改 HTTP 响应内容（如加广告）。
预防方案
全站 HTTPS

10）中间人攻击：
中间人攻击（Man-in-the-middle attack, MITM），指攻击者与通讯的两端分别创建独立的联系，并交换其所收到的数据，使通讯的两端认为他们正在通过一个私密的连接与对方直接对话，但事实上整个会话都被攻击者窃听、篡改甚至完全控制。没有进行严格的证书校验是中间人攻击着手点。目前大多数加密协议都提供了一些特殊认证方法以阻止中间人攻击。如 SSL （安全套接字层）协议可以验证参与通讯的用户的证书是否有权威、受信任的数字证书认证机构颁发，并且能执行双向身份认证。攻击场景如用户在一个未加密的 WiFi下访问网站。在中间人攻击中，攻击者可以拦截通讯双方的通话并插入新的内容。

场景
i）在一个未加密的Wi-Fi 无线接入点的接受范围内的中间人攻击者，可以将自己作为一个中间人插入这个网络
ii）Fiddler / Charles （花瓶）代理工具
iii）12306 之前的自己证书
过程
i）客户端发送请求到服务端，请求被中间人截获
ii）服务器向客户端发送公钥
iii）中间人截获公钥，保留在自己手上。然后自己生成一个【伪造的】公钥，发给客户端
iv）客户端收到伪造的公钥后，生成加密hash值发给服务器
v）中间人获得加密hash值，用自己的私钥解密获得真秘钥,同时生成假的加密hash值，发给服务器
vi）服务器用私钥解密获得假密钥,然后加密数据传输给客户端
使用抓包工具fiddle来进行举例说明
首先通过一些途径在客户端安装证书
然后客户端发送连接请求，fiddle在中间截取请求，并返回自己伪造的证书
客户端已经安装了攻击者的根证书，所以验证通过
客户端就会正常和fiddle进行通信，把fiddle当作正确的服务器
同时fiddle会跟原有的服务器进行通信，获取数据以及加密的密钥，去解密密钥
常见攻击方式
嗅探：嗅探是一种用来捕获流进和流出的网络数据包的技术，就好像是监听电话一样。比如：抓包工具
数据包注入：在这种，攻击者会将恶意数据包注入到常规数据中的，因为这些恶意数据包是在正常的数据包里面的，用户和系统都很难发现这个内容。
会话劫持：当我们进行一个网站的登录的时候到退出登录这个时候，会产生一个会话，这个会话是攻击者用来攻击的首要目标，因为这个会话，包含了用户大量的数据和私密信息。
SSL剥离：HTTPS是通过SSL/TLS进行加密过的，在SSL剥离攻击中，会使SSL/TLS连接断开，让受保护的HTTPS，变成不受
保护的HTTP（这对于网站非常致命）
DNS欺骗，攻击者往往通过入侵到DNS服务器，或者篡改用户本地hosts文件，然后去劫持用户发送的请求，然后转发到攻击者想要转发到的服务器
ARP欺骗，ARP(address resolution protocol)地址解析协议，攻击者利用APR的漏洞，用当前局域网之间的一台服务器，来冒充客户端想要请求的服务端，向客户端发送自己的MAC地址，客户端无从得到真正的主机的MAC地址，所以，他会把这个地址当作真正
的主机来进行通信，将MAC存入ARP缓存表。
代理服务器
预防方案：
i）用可信的第三方CA厂商
ii）不下载未知来源的证书，不要去下载一些不安全的文件
iii）确认你访问的URL是HTTPS的，确保网站使用了SSL，确保禁用一些不安全的SSL，只开启：TLS1.1，TLS1.2
iv）不要使用公用网络发送一些敏感的信息
v）不要去点击一些不安全的连接或者恶意链接或邮件信息
11）sql 注入
描述
就是通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗数据库服务器执行恶意的SQL命令,从而达到和服务器
进行直接的交互

预防方案：
i）后台进行输入验证，对敏感字符过滤。
ii）使用参数化查询，能避免拼接SQL，就不要拼接SQL语句。
12）前端数据安全：
描述
反爬虫。如猫眼电影、天眼查等等，以数据内容为核心资产的企业

预防方案：
i）font-face拼接方式：猫眼电影、天眼查
ii）background 拼接：美团
iii）伪元素隐藏：汽车之家
iv）元素定位覆盖式：去哪儿
v）iframe 异步加载：网易云音乐
13）其他建议
i）定期请第三方机构做安全性测试，漏洞扫描
ii）使用第三方开源库做上线前的安全测试，可以考虑融合到CI中
iii）code review 保证代码质量
iv）默认项目中设置对应的 Header 请求头，如 X-XSS-Protection、 X-Content-Type-Options 、X-Frame-Options Header、Content-Security-Policy 等等
v）对第三方包和库做检测：NSP(Node Security Platform)，Snyk