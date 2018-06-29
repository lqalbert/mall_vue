export function uploadFileSize (file){
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        // this.$message.error('上传文件大小不能超过 2MB!');
        
        return {state:0, msg:'上传文件大小不能超过 2MB!'};
    }
    return {state:1};
}