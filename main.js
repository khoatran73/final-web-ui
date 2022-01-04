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
