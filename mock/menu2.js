import Mock from 'mockjs'

var data = Mock.mock({
  // 'list | 5-10': [
  //   {
  //     'pid|+1': 0,
  //     'time': '@data()',
  //     'text': '@cparagraph()',
  //     'name': '@cname()',
  //     'email': '@email()',
  //     'address': '@country(true)'
  //   }
  // ]
  'list|3-5': [
    {
      'name': '@cname()',
      'email': '@email()'
    }
  ]
})

// Mock.mock('http://www.baidu.com/api', data)
// import Mock from 'mockjs'

// const data = Mock.mock({
//   'items|30': [{
//     id: '@id',
//     title: '@sentence(10, 20)',
//     'status|1': ['published', 'draft', 'deleted'],
//     author: 'name',
//     display_time: '@datetime',
//     pageviews: '@integer(300, 5000)'
//   }]
// })

export default [
  {
    url: '/menu2/list',
    type: 'get',
    response: config => {
      const items = data.list
      return {
        code: 20000,
        data: {
          // total: items.length,
          items: items
        }
      }
    }
  }
]
