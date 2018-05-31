var Mock = require('mockjs');
var Random = Mock.Random
Mock.setup({
    timeout: '200-600'
})

Mock.mock(/\/admin\/cartonmanagement\?entrepot_id\=\d/,{
    'items|5':[{
        'id|+1':1,
        'carton_high|+100':100,
        'carton_wide|+50':100,
        'carton_long|+50':50,
        'carton_name':Mock.mock('@csentence(2,5)'),
        'carton_weight':100,
        'entrepot_id':1
    }],

});


export default Mock;