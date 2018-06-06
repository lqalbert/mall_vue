import { S_IRWXG } from "constants";
import printStore from './IndexDb';


let lastRequestId = null;
let cmdMapHandle = {
    "getPrinters":"",
    "getPrinterConfig":"",
    "setPrinterConfig":"",
    "print":function(backObj){
                if (backObj.previewURL) {
                    var d = window.open(backObj.previewURL);
                    console.log(d);
                } else if(backObj.previewImage) {
                    for (let index = 0; index < backObj.previewImage.length; index++) {
                        const element = backObj.previewImage[index];
                        window.open(element);
                    }
                }
    
    
            },
    "notifyPrintResult":"",
    "getTaskStatus":"",
    "getGlobalConfig":"",
    "setGlobalConfig":"",
    "getAgentInfo":"",

}



function WebSocketTest()
{
    if ("WebSocket" in window)
    {
        // alert("您的浏览器支持 WebSocket!");
        
        // 打开一个 web socket
        var ws = new WebSocket("ws://localhost:13528");
        
        ws.onopen = function()
        {
            // Web Socket 已连接上，使用 send() 方法发送数据
           // ws.send("发送数据");
        //    alert("打印机连接成功");
           printStore.init();
        };
        
        ws.onmessage = function (evt) 
        { 
            var obj = JSON.parse(evt.data);
            if (obj.requestID) {
                lastRequestId = obj.requestID;
            } else {
                obj['requestID'] = lastRequestId;
            }
            printStore.addBack(obj.requestID, obj);
           // var received_msg = evt.data;
           // alert("数据已接收...");
           //根据CMD分发不同的处理程序

           if (cmdMapHandle[obj.cmd]) {
            cmdMapHandle[obj.cmd](obj);
           }
        };
        
        ws.onclose = function()
        { 
            // 关闭 websocket
            // alert("连接已关闭..."); 
            console.log("ws:close");
            printStore.close();
        };

        ws._send = ws.send;
        ws.send = function(param){
            //保存代码
            printStore.add(param);
            ws._send(JSON.stringify(param));
        }



        return ws;
    } else　{
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!,无法连接到菜鸟打印组件");
        return null;
    }
}

const wsok = WebSocketTest();

/***
 * from demo
 * 获取请求的UUID，指定长度和进制,如 
 * getUUID(8, 2)   //"01001010" 8 character (base=2)
 * getUUID(8, 10) // "47473046" 8 character ID (base=10)
 * getUUID(8, 16) // "098F4D35"。 8 character ID (base=16)
 *   
 */
function getUUID(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length; 
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
}

/***
 * from demo
 * 构造request对象
 */
function getRequestObject(cmd) {
    var request  = new Object();
    request.requestID=getUUID(8, 16);
    request.version="1.0";
    request.cmd=cmd;
    return request;
}


/***
 * from demo
 * 获取自定义区数据以及模板URL
 * waybillNO 电子面单号
 */
function getCustomAreaData(waybillNO) {
    //获取waybill对应的自定义区的JSON object，此处的ajaxGet函数是伪代码
    var jsonObject = {};//ajaxGet(waybillNO);
    var ret = new Object();
    ret.templateURL=jsonObject.content.templateURL;
    ret.data=jsonObject.content.data;
    return ret;
}

/***
 * from demo
 * 获取电子面单Json 数据
 * waybillNO 电子面单号
 */
function getWaybillJson(waybillNO) {
    //获取waybill对应的json object，此处的ajaxGet函数是伪代码
    var jsonObject = {};//ajaxGet(waybillNO);
    return jsonObject;
}

/**
 * 请求打印机列表demo
 * */

function getPrinterList(){
    var request  = getRequestObject("getPrinters");
    wsok.send(request);
}
/**
 * 获取打印机配置
 * @param {} name 
 */
function getPrinterConfig(name){
    var request  = getRequestObject("getPrinterConfig");
    request.printer = name;
    wsok.send(request);
}

/**
 * 弹窗模式配置打印机
 * */

function dialogConfig(){
    var request  = getRequestObject("printerConfig");
    wsok.send(request);
}



/**
 * 打印电子面单
 * printer 指定要使用那台打印机
 * waybillArray 要打印的电子面单的数组
 */
function doPrint(printer ,waybillArray)
{
    var request = getRequestObject("print");    
    request.task = new Object();
    request.task.taskID = getUUID(8,10);
    request.task.preview = false;
    request.task.printer = printer;
    var documents = new Array();
    for(i=0;i<waybillArray.length;i++) {
         var doc = new Object();
         doc.documentID = waybillArray[i];
         var content = new Array();
         var waybillJson = getWaybillJson(waybillArray[i]);
         var customAreaData = getCustomAreaData(waybillArray[i]);
         content.push(waybillJson,customAreaData);
         doc.content = content;
         documents.push(doc);
    }
    wsok.send(request);
}

function testView(obj){
    obj.requestID = getUUID(8, 16);
    wsok.send(obj);
}


/**
 * 响应请求demo
 * */
// wsok.onmessage = function (event) {   
//     var response = eval(event.data);
//     if (response.cmd == 'getPrinters') {
//         getPrintersHandler(response);//处理打印机列表
//     } else if (response.cmd == 'printerConfig') {
//         printConfigHandler(response);
//     } 
// };

//发送的命令需要记下来　以requestID为主键　
//当返回的时候需要requestID　 得到对应的消息 联合 cmd 进行逻辑处理
const ws = {};
ws.doPrint = doPrint;
ws.getPrinterList = getPrinterList;
ws.dialogConfig = dialogConfig;
ws.close = wsok.close;
ws.getPrinterConfig=getPrinterConfig;
ws.testView = testView;
export default ws;