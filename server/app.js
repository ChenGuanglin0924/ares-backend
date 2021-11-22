let Koa = require('koa');
let KoaRouter = require('koa-router');
const sort = require('./router/sort');

// 1. 生成应用及路由器实例
const app = new Koa();
const router = new KoaRouter();

// 核心代码
router.get('/', (ctx, next) => {
  ctx.body = '我是服务器';
});

router.get('/sort', sort);

// 2. 使用路由器及路由
app
  .use(router.routes()) // 声明使用路由
  .use(router.allowedMethods()) // 允许使用路由的方法

// 3. 监听端口
app.listen('4290', () => {
  console.log('服务器启动成功');
  console.log('服务器地址： http://localhost:4290');
})