const DB_NAME = 'prints';
const DB_VERION = 1;
const DB_STORE_NAME = 'records'; //对应表名

const MODE_RW = 'readwrite';

var db = null;
function initDb(){
    if (!window.indexedDB) {
        alert('你的浏览器不支持indexeddb,但不影响打印');
        return ;
    }


    var request = indexedDB.open(DB_NAME, DB_VERION);
    request.onsuccess = function(evt) {
        db = this.result;

        db.getStore = function(name, mode=null){
            return this.transaction(name, mode).objectStore(name);
        }
    }
    request.onerror = function(evt) {
        console.log('initDb:', evt.target.errorCode);
    }

    request.onupgradeneeded = function (evt) {
        console.log('initDb.onupgradeneeded');
        var store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME, {keyPath:'requestID' , autoIncrement: false});

        store.createIndex('cmd','cmd', {unique:false});
    }
}

function yesOrFaile(){
    return !!db ;
}


function add(obj){
    if (! yesOrFaile()) {
        return false; 
    }
    var transaction = db.transaction(DB_STORE_NAME, MODE_RW);
    var store = transaction.objectStore(DB_STORE_NAME);
    transaction.onerror = function(evt){
        console.log('add:', evt);
    }
    if (obj instanceof Array) {
        for (let i in obj) {
            store.add({requestID:obj[i].requestID, value: obj[i], cmd:obj[i].cmd,  back:[] });
        }
    } else {
        var d = {requestID:obj.requestID, value: obj,  cmd:obj.cmd, back:[] };
        store.add(d);
    }
}

function remove(requestID){
    if (! yesOrFaile()) {
        return false; 
    }
    var request = db.getStore(DB_STORE_NAME, MODE_RW).delete(requestID);//   transaction(DB_STORE_NAME, MODE_RW).objectStore(DB_STORE_NAME).delete(requestID);
    request.onerror = function(evt) {
        console.log('remove', evt);
    }
}

function findOne(requestID, callback, mode=null){
    if (! yesOrFaile()) {
        return false; 
    }
    var store = db.getStore(DB_STORE_NAME, mode);
    var request = store.get(requestID);
    request.onerror = function(evt) {
        console.log('findOne', evt);
    }
    request.onsuccess = function(evt) {
        callback(this.result, store);
    }
}

function find(cmd, callback){
    if (! yesOrFaile()) {
        return false; 
    }
    var singleKeyRange = IDBKeyRange.only(cmd);
    var indexCollection = db.getStore(DB_STORE_NAME).index("cmd");
    var request = indexCollection.openCursor(cmd);
    var re = [];
    request.onsuccess = function(evt){
        var cursor = evt.target.result;
        if (cursor) {
            re.push(cursor.value);
            cursor.continue();
        } else {
            callback(re);
        }
    }

    request.onerror = function(evt) {
        console.log('find', evt);
    }
}

function updateOne(requestID, obj){
    if (! yesOrFaile()) {
        return false; 
    }
    findOne(requestID, function(target, store){
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                target[key]  = obj[key];
            }
        }
        var request = store.put(targe);
        request.onerror = function(evt) {
            console.log('updateOne:', evt);
        }
    }, MODE_RW);
}

function addBack(requestID, obj){
    if (! yesOrFaile()) {
        return false; 
    }
    findOne(requestID, function(target, store){
        for (let index = 0; index < obj.length; index++) {
            const element = obj[index];
            target.back.push(element);
        }
        var request = store.put(target);
        request.onerror = function(evt) {
            console.log('addBack:', evt);
        }
    }, MODE_RW);
}


function close(){
    db.close();
}

const api = {
    init:initDb,
    add:add,
    remove:remove,
    find:find,
    findOne:findOne,
    addBack:addBack,
    close:close
};

export default api;