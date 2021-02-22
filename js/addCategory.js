const addCategory =(function({publish,subscribe}) {    

    var modal = document.getElementById("myModal");

    var span = document.querySelector(".close");
    span.addEventListener("click",closeModal)

    const btn = document.querySelector(".btn-add-category")
    btn.addEventListener("click",addCategory)

    const btncatEdit = document.getElementById("btncatEdit")
    btncatEdit.addEventListener("click",editCategory)

    const btncatadd = document.getElementById("btncatadd")
    btncatadd.addEventListener("click",addCategoryClicked)

    const catName = document.getElementById("categoryname")

    function clearTextCategory(params) {
        catName.value = ""
    }

    function addCategory(val,ix) {        
        if (typeof val == "string") {
            catName.value = val
            modal.setAttribute("data-ix",ix)
        }else {
            if (modal.hasAttribute("data-ix")) modal.removeAttribute("data-ix")
        }
        
        btncatadd.style.display = (typeof val == "string") ? "none" : ""
        btncatEdit.style.display = (typeof val == "string") ? "" : "none"
        
        modal.style.display = "block"
        catName.focus()
    }

    function closeModal() {
        modal.style.display = "none"
        clearTextCategory()
    }

    function addCategoryClicked() {
        PubSub.publish("categoryadd",catName.value)
        closeModal()
        clearTextCategory()
        PubSub.publish("indirectAccess","onload")
    }

    function editCategory() {
        if (modal.hasAttribute("data-ix")) {
            const ix = modal.attributes["data-ix"].value
            PubSub.publish("categoryedit",{ix:ix,val:catName.value})
            closeModal()
            clearTextCategory()
            PubSub.publish("indirectAccess","onload")
        }        
    }

    return {
        addCategory
    }
}(PubSub))