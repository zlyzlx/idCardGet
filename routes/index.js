const superagent = require('superagent')
const cheerio = require('cheerio');
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/idCard', async (ctx, next) => {
  let url="http://sfz.ckd.cc/";
  let idObj=[];
  await new Promise(function(resolve, reject) {
    superagent.get(url).set({  //设置请求头
      "Connection":"keep-alive",
    }).end((err,res) => {   //错误优先
      if(err){
        console.log(err);
        reject();
      }
      const $ = cheerio.load(res.text);

      //通过CSS selector来筛选数据
      $('table tr').each(function (idx, element) {
        let val=$(element).find("td").eq(0).text();
        idObj=val.split(" ");
      });
      console.log(idObj)
      resolve();
    });
  }).then(()=>{
    bankCard="62148378";
    for(var i=0;i<8;i++){
      bankCard+=String(Math.floor(Math.random()*10));
    }

    ctx.body = {
      idObj:idObj,
      bankCard:bankCard,
    };
  });

})




module.exports = router
