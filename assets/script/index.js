
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

    console.log(blocks)

    blocks.forEach((block) => {
        if (block.type === "header") {
            const header = document.createElement("h2")
            header.innerHTML = block.data.text
            result.appendChild(header)
        } else if (block.type === "paragraph") {
            const p = document.createElement("p")
            p.innerHTML = block.data.text
            result.appendChild(p)
        } else if (block.type === "list") {
            if (block.data.style === "ordered") {
                const ol = document.createElement("ol")
                block.data.items.forEach((item) => {
                    const li = document.createElement("li")
                    li.innerHTML = item
                    ol.appendChild(li)
                })
                result.appendChild(ol)
            } else {
                const ul = document.createElement("ul")
                block.data.items.forEach((item) => {
                    const li = document.createElement("li")
                    li.innerHTML = item
                    ul.appendChild(li)
                })
                result.appendChild(ul)
            }
        }
    })
}


