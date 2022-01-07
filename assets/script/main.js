// $(".dropdown").click(function (e) {
//     e.stopPropagation()
//     let parent = e.target
//     if (e.target.children.length === 0) {
//         parent = e.target.parentNode
//     }
//     if (!parent.classList.contains("active"))
//         parent.classList.add("active")
//     else
//         parent.classList.remove("active")
// })

// $(window).click(function () {
//     if ($(".dropdown").hasClass("active"))
//         $(".dropdown").removeClass("active")
// })
handleDropdown("dropdown")
handleDropdown("action")

function handleDropdown(className) {
    $("." + className).click(function (e) {
        e.stopPropagation()
        let parent = e.target
        if (e.target.children.length === 0) {
            parent = e.target.parentNode
        }
        if (!parent.classList.contains("active"))
            parent.classList.add("active")
        else
            parent.classList.remove("active")
    })

    $(window).click(function () {
        if ($("." + className).hasClass("active"))
            $("." + className).removeClass("active")
    })
}

// display comment
$(".comment-btn").click(function (e) {
    const post = e.target.parentNode.parentNode
    post.children[3].style.display = "block"
})

// display modal add post
$("#add-post-input").click(function () {
    $("#add-modal").modal("show")
})

// display list like
$("#like-list").click(function () {
    $("#like-list-modal").modal("show")
})

// display search list
{
    $("#search-input").focus(function () {
        $(".search-list").css("display", "flex")
    })

    $("#search-input").focusout(function () {
        $(".search-list").css("display", "none")
    })
}

{
    $("input[name=media-checked]").change(() => displayMedia())

    function displayMedia() {
        const mediaChecked = $("input[name=media-checked]:checked").val()
        const mediaUnChecked = $("input[name=media-checked]:not(:checked)").val()
        $(`.${mediaChecked}`).css("display", "block")
        $(`.${mediaUnChecked}`).css("display", "none")
    }
}

{
    $("#navbar-icon").click(function () {
        $(".nav-ipad-container").css("transform", "translateX(0px)")
        $(".nav-ipad-container").css("opacity", "1")
        $(".nav-ipad-overlay").css("display", "block")
        $(".nav-ipad-overlay").css("opacity", "1")
    })

    $(".nav-ipad-overlay").click(function () {
        $(".nav-ipad-container").css("transform", "translateX(-100%)")
        $(".nav-ipad-container").css("opacity", "0")
        $(".nav-ipad-overlay").css("display", "none")
        $(".nav-ipad-overlay").css("opacity", "0")
    })
}


// Noti dropdown
{
    $(".notification-dropdown").click(function (e) {
        const children = e.target.children.length === 0 ? e.target : e.target.children[0]

        if (children.classList.toString().includes("fa-chevron-up")) {
            children.classList.remove("fa-chevron-up")
            children.classList.add("fa-chevron-down")
            $(".notification-dropdown-menu").css("display", "block")
            $(".notification-dropdown-menu").css("transform", "translateY(0px)")
        } else if (children.classList.toString().includes("fa-chevron-down")) {
            children.classList.remove("fa-chevron-down")
            children.classList.add("fa-chevron-up")
            $(".notification-dropdown-menu").css("display", "none")
            $(".notification-dropdown-menu").css("transform", "translateY(-100%)")
        }
    })
}

// Click xoa nguoi dung
{
    $(".delete-user").click(e => {
        swal({
            title: "DELETE",
            text: `Xóa nhân viên này ?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // deleteEmployee(e)
                }
            })
    })
}

// editor
const editor = new EditorJS({
    holder: 'editorjs',
    tools: {
        header: {
            class: Header,
            inlineToolbar: ['link']
        },
        list: {
            class: List,
            inlineToolbar: true
        }
    },
})

const editorjs = document.querySelector("#editorjs")
editorjs.addEventListener("keyup", function () {
    editor.save().then((data) => {
        showResult(data)
    }).catch((error) => {
        console.log('Saving failed: ', error)
    })
})

function showResult(data) {
    const result = document.querySelector("#result")
    result.innerHTML = ""

    const blocks = data.blocks

    blocks.forEach((block) => {
        if (block.type === "header") {
            const header = document.createElement(`h${block.data.level}`)
            header.classList.add("ce-header")
            header.innerHTML = block.data.text
            result.appendChild(header)
        } else if (block.type === "paragraph") {
            const p = document.createElement("p")
            p.classList.add("ce-paragraph")
            p.classList.add("cdx-block")
            p.innerHTML = block.data.text
            result.appendChild(p)
        } else if (block.type === "list") {
            if (block.data.style === "ordered") {
                const ol = document.createElement("ol")
                ol.classList.add("cdx-block")
                ol.classList.add("cdx-list")
                ol.classList.add("cdx-list--ordered")
                block.data.items.forEach((item) => {
                    const li = document.createElement("li")
                    li.classList.add("cdx-list__item")
                    li.innerHTML = item
                    ol.appendChild(li)
                })
                result.appendChild(ol)
            } else {
                const ul = document.createElement("ul")
                ul.classList.add("cdx-block")
                ul.classList.add("cdx-list")
                ul.classList.add("cdx-list--unordered")
                block.data.items.forEach((item) => {
                    const li = document.createElement("li")
                    li.classList.add("cdx-list__item")
                    li.innerHTML = item
                    ul.appendChild(li)
                })
                result.appendChild(ul)
            }
        } else if (!block.type) {
            result.appendChild(document.createElement("br"))
        }
    })
}

$("#save-notify-btn").click(function () {
    editor.save().then((data) => {
        const notify = JSON.stringify({
            title: $("#title").val(),
            content: data.blocks
        })
    })
}) 