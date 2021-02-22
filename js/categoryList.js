const CategoryList =(function({publish,subscribe}) {
    let category = []
    
    function AddCategory(name) {
        category.push(name)
    }

    function editHandler(p) {
        if (p.ix) {
            category[p.ix] = p.val
        }
    }

    function showTabCat(catCtr) {
        const table = document.querySelector(".tbl")
        const ndf = document.querySelector(".no-data-found")
        if (catCtr.length != 0) {
            table.style.display = ""
            ndf.style.display = "none"
        } else {
            table.style.display = "none"
            ndf.style.display = ""
        }
    }

    function renderList(cats) {
        let tbody = document.querySelector(".tbl>tbody")        
        if (cats && cats.length!=0) {
            tbody.innerHTML = ""
            for (let index = 0; index < cats.length; index++) {
                const element = cats[index]
                const tr = document.createElement("tr")
                const td1 = document.createElement("td")
                td1.textContent = (index+1)
                tr.appendChild(td1)
                const td2 = document.createElement("td")
                td2.textContent = element
                tr.appendChild(td2)
                const td3 = document.createElement("td")
                const btnDelete = document.createElement("input")
                btnDelete.value="Delete"
                btnDelete.setAttribute("type","button")
                btnDelete.setAttribute("class","btn btn-outline-danger")
                btnDelete.setAttribute("data-ix",index)
                btnDelete.addEventListener("click",DeleteCategory)
                const btnEdit = document.createElement("input")
                btnEdit.value="Edit"
                btnEdit.setAttribute("type","button")
                btnEdit.setAttribute("class","btn btn-outline-info")
                btnEdit.setAttribute("data-ix",index)
                btnEdit.addEventListener("click",EditCategory)
                td3.appendChild(btnEdit)
                td3.appendChild(btnDelete)
                tr.appendChild(td3)
                tbody.appendChild(tr)
            }
        }
    }

    function DeleteCategory(event) {
        if (confirm("do u want to delete this Category?")) {
            const toBeRemoved = +event.target.attributes["data-ix"].value
            category.splice(toBeRemoved,1)
            PubSub.publish("indirectAccess","onload")
        }
    }
    
    function EditCategory(event){
        addCategory.addCategory(category[event.target.attributes["data-ix"].value],event.target.attributes["data-ix"].value)
    }
    
    return {
        showTabCat,
        cnt : category,
        AddCategory,
        renderList,
        editHandler
    }
}(PubSub))