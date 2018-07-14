export function displayCategory(category){
    let cate = [];
    for (let index = 0; index < category.length; index++) {
        cate.push(category[index].label);
    }
    return cate.join(" / ");
}