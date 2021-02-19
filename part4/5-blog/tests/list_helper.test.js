const listHelper = require('../utils/list_helper')

test('dummy returns one', ()=>{
    const blog = []
    expect(listHelper.dummy(blog)).toBe(1)
})