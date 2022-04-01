const textContentObj = {
    search: "", replace: ""
}

function backgroundReplaceText(element, text) {
    console.log("Hello Newton! backgroundReplaceText", element, text)
    if (textContentObj.search.length < 1) {
        textContentObj.search = text
    }
    else if (text.length > 1) {
        textContentObj.search = text
    }
    if (element.hasChildNodes()) {
        console.log("Has Child")
        element.childNodes.forEach(backgroundReplaceText)
    }
    else if (element.nodeType === Text.TEXT_NODE) {
        let count = 0;
        if (element.textContent.match(textContentObj.search)) {
            console.log("Text.TEXT_NODE)", Text.TEXT_NODE, "textContentObj.search", textContentObj.search)
            count++
            if (count === 1) {

                let newElement = document.createElement('span')
                newElement.style.backgroundColor = "#97e3e3"
                newElement.innerHTML = textContentObj.search;
                let divContainer = document.createElement('span')
                divContainer.innerHTML = element.textContent.replace(textContentObj.search, `<span class="selectedTextBG">${textContentObj.search}</span>`)
                console.log("1 < 2", count, "Newton", "count", newElement, "textContentObj.search", textContentObj.search)
                element.replaceWith(divContainer)
            }
        }
    }
}

function replaceText(element, text, replaceTextWith) {
    if (textContentObj.search.length < 1 && textContentObj.replace.length < 1) {
        textContentObj.search = text
        textContentObj.replace = replaceTextWith;
    }
    else if (text.length > 1 && replaceTextWith.length > 1) {
        textContentObj.search = text
        textContentObj.replace = replaceTextWith;
    }
    console.log("replaceText1", element, "search:", text, "replaceTextWith: ", replaceTextWith, element.textContent, "textContentObj", textContentObj)
    if (element.hasChildNodes()) {
        console.log("Has Child")
        element.childNodes.forEach(replaceText)
    }
    if (element.nodeType === Text.TEXT_NODE) {
        let count = 0;
        console.log('replaceText2', "text", text, "replaceTextWith", replaceTextWith, "element.textContent", element.textContent, "textContentObj", textContentObj)

        if (element.textContent.match(textContentObj.search)) {

            console.log("replaceText3", element, "text", text, "replaceTextWith", replaceTextWith, "textContentObj", textContentObj)
            count++
            if (count === 1) {
                // let newElement = document.createElement('div')

                let string = element.textContent.replace(textContentObj.search, textContentObj.replace)
                console.log("1 < 2", "string", string,)
                element.replaceWith(string)
                let cols = document.getElementsByClassName('selectedTextBG');
                for (i = 0; i < cols.length; i++) {
                    console.log("cols, cols[i]", cols, cols[i])
                    cols[i].style.backgroundColor = 'white';
                }
            }
        }
    }
}

// {/* <div>
//   <button onclick="incrementSentence()"><</button>
//   1/<span style="color:rgba(139, 10, 190, 0.5);"> 2 Sentences</span>
//   <button style="color:rgb(139, 10, 190);" onclick="decrementSentence()">></button>
// </div> */}

const decrementSentence = () => {
    console.log("decrement")
}

const incrementSentence = () => {
    console.log('increment');
}

// let buttonHTML = `<div class='sentence-navigator' id='sentence-navigator'>
// <button onclick="decrementSentence()" class='navigator-button' id='b'><</button>
// ${count}/<span style="color:rgba(139, 10, 190, 0.5);"> ${sentanceArrayLength} Sentences</span>
// <button style="color:rgb(139, 10, 190);" onclick="incrementSentence()" class='navigator-button' id='a'>></button>
// </div>`

const getSentanceButton = (selected1, text, isLoading, event, data, sentances, counter) => {

    let HTMLBtn = document.createElement('div')
    HTMLBtn.className = 'sentence-navigator'
    HTMLBtn.id = 'sentence-navigator'

    let btnText = document.createElement('span')
    btnText.className = 'btnSentenceText'
    btnText.textContent = `${sentances.length} Sentences`

    let btnTextCount = document.createElement('span')
    btnTextCount.textContent = `${counter}/`

    let btnIncrement = document.createElement('button')
    btnIncrement.className = 'navigator-button'
    btnIncrement.textContent = '>'
    btnIncrement.onclick = () => {
        if (sentances.length > counter) {
            let selSentance = sentances[counter]
            iconModel(selected1, sentances, event, selSentance, counter++)
        }
    }

    let btnDecrement = document.createElement('button')
    btnDecrement.className = 'navigator-button'
    btnDecrement.textContent = '<'
    btnDecrement.onclick = () => {
        if (sentances.length > counter && counter > 1) {
            let selSentance = sentances[counter - 2]
            iconModel(selected1, sentances, event, selSentance, counter--)
        }
    }

    HTMLBtn.appendChild(btnDecrement)
    HTMLBtn.appendChild(btnTextCount)
    HTMLBtn.appendChild(btnText)
    HTMLBtn.appendChild(btnIncrement)
    return HTMLBtn
}

const replaceFromSuggestedText = (selected1, text, isLoading, event, data, sentances, counter) => {
    console.log("replaceFromSuggestedText", text)
    if (isLoading) {
        document.getElementById("pcontainer").remove()
        document.getElementById("maincontainer").remove()
    }
    // var rect = event.target.getBoundingClientRect();
    // var x = event.clientX - rect.left;
    // var y = event.clientY - rect.top;

    // console.log(event.pageY)
    let mainEle = document.createElement('div')
    mainEle.style.position = "absolute"
    mainEle.style.top = "300px"
    mainEle.id = "maincontainer"
    mainEle.style.left = "600px"
    mainEle.style.zIndex = 9999;
    mainEle.style.top = `${event.pageY + 11}px`
    mainEle.style.left = `${event.pageX + 20}px`

    let pararentEle = document.createElement('div');
    pararentEle.style.position = "absolute"

    let pContainer = document.createElement("div")
    pContainer.id = "pcontainer"
    // pContainer.setAttribute("class", "pcontainer")
    pContainer.style.border = "border: 1px solid rgb(230, 232, 238)"
    pContainer.style.borderRadius = "3px"
    // pContainer.style.top = `${event.pageY + 10}px`
    // pContainer.style.left = `${event.pageX}px`
    // pContainer.style.top = `50px`
    // pContainer.style.left = `50px`
    pContainer.style.width = "360px"
    pContainer.style.display = "block"
    pContainer.style.boxShadow = "rgb(63 62 77 / 20%) 0px 2px 14px 0px"
    pContainer.style.transition = "height 0.1s ease 0"
    pContainer.style.height = "150px"
    pContainer.style.overflowY = "auto"
    pContainer.style.position = "absolute"
    pContainer.style.background = "rgb(255 255 255)"

    let h2 = document.createElement('h2')
    h2.textContent = "AI-Phraser"
    h2.style.textAlign = "center"
    h2.style.paddingTop = '7px'
    h2.style.paddingBottom = "5px"
    h2.style.lineHeight = 1;
    h2.style.background = "#47ad8c"
    h2.style.width = "360px"
    h2.style.fontWeight = 400;
    h2.style.margin = '0px'
    h2.style.fontFamily = "cursive"
    h2.style.fontSize = "30px"
    // pContainer.appendChild(h2)

    if (!isLoading) {
        backgroundReplaceText(selected1, text)
        let loadingEle = document.createElement('div');
        loadingEle.id = "loadingEle"
        loadingEle.textContent = "Loading..."
        loadingEle.style.height = "108px";
        loadingEle.style.paddingTop = "35px";
        loadingEle.style.textAlign = "center";
        pContainer.appendChild(loadingEle);
    }
    else {
        let loadingElementByID = document.getElementById('loadingEle')
        // loadingElementByID.remove()

        data.forEach((ele => {

            let divEleChild = document.createElement('div');
            divEleChild.textContent = `${ele}`
            divEleChild.style.color = "rgb(160, 34, 234)"
            divEleChild.style.border = "solid 1px #eceef4"
            divEleChild.setAttribute("class", "pcontainer")
            divEleChild.style.alignSelf = "center"
            divEleChild.style.paddingTop = "8px"
            divEleChild.style.paddingBottom = "8px"
            divEleChild.style.paddingLeft = "15px"
            divEleChild.style.display = "block"
            divEleChild.style.flexShrink = "initial"
            divEleChild.style.userSelect = "none"
            divEleChild.style.cursor = "pointer"

            divEleChild.onclick = (selected) => {
                if (event.target.nodeName === "TEXTAREA") {
                    // event.target.value = `${ele}`
                    let range = selectedArr.node

                    // range.deleteContents();
                    // range.innerText = "hyuuiii"
                    pContainer.remove()
                }
                else {
                    // console.log("selected", selected.target.value, selected)
                    let range = selectedArr.node
                    // range.deleteContents();
                    // range.insertNode(document.createTextNode(`${ele}`));
                    replaceText(selected1, text, ele)

                    // pContainer.remove()
                    // mainEle.remove()

                    // event.target.value = `${ele}`
                    // pContainer.remove()
                }
            }


            divEleChild.onmouseover = () => {
                divEleChild.style.background = "#ededed"
            }
            divEleChild.onmouseout = () => {
                divEleChild.style.background = "white"
            }

            pContainer.appendChild(divEleChild)
        }))
        // pContainer.innerHTML = divEleChild

    }
    let dcd = getSentanceButton(selected1, text, isLoading, event, data, sentances, counter)
    let buttonContainer = dcd
    // buttonContainer.innerHTML = dcd
    console.log(dcd, 'dcd');
    pararentEle.appendChild(buttonContainer)
    pararentEle.appendChild(pContainer)
    mainEle.appendChild(pararentEle)
    // dwElement.appendChild(mainEle)
    document.querySelector('body').appendChild(mainEle)

    // selected1.anchorNode.parentElement.appendChild(pararentEle)
    // let range = selected.getRangeAt(0);
    // range.setStartAfter(li)

}

const getTextArray = (text) => {
    let sentances = text.match(/[^\.!\?]+[\.!\?]+/g);
    console.log('sentances', sentances)
    return sentances
}

const iconModel = async (F1selected, sentances, event, selSentance, counter) => {
    let isLoading = false
    console.log("Hello, newton", "selSentance", selSentance)
    replaceFromSuggestedText(F1selected, selSentance, isLoading, event, [], sentances, counter)

    let api_url = "https://1447-123-136-205-126.ngrok.io/paraphraser/"
    console.log("Api url", api_url)
    let res = await fetch(api_url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: selSentance })
    })
    let orRes = await res.json()
    data = orRes['paraphrases']

    console.log("data", orRes, data)
    isLoading = true
    replaceFromSuggestedText(F1selected, selSentance, isLoading, event, data, sentances, counter)
}

let data = ["It Will Fetched Text 1", "It Will Fetched Text 2", "It Will Fetched Text 3", "It Will Fetched Text 4", "It Will Fetched Text 5"]
const selectedArr = { node: '', text: '', }

const handleCLick = async (event) => {
    if (window.getSelection().toString().length > 0) {
        const text = window.getSelection().toString().trim()

        // console.log("1", event.target.nodeName, event, window.getSelection(), ` vaue: ${event.target.value}, ${text}`)
        // window.getSelection().anchorNode.getRootNode()
        // console.log(document.getSelection().anchorNode.parentElement.parentElement.id, "id")

        selectedArr.node = window.getSelection().getRangeAt(0)

        if (text !== selectedArr.text && document.activeElement.isContentEditable === true) {
            // console.log("3");
            selectedArr.text = text
            const F1selected = window.getSelection()
            let nodeText = F1selected.anchorNode.parentElement

            // console.log("window.getSelection().anchorNode.parentElement.isContentEditable", document.activeElement.isContentEditable, window.getSelection().anchorNode.parentElement.isContentEditable)
            // selectedArr.push(F1selected.anchorNode.parentElement)
            // console.log('hello', selectedArr, F1selected.anchorNode.parentElement)

            let sentances = getTextArray(text)

            const buttonIcon = document.createElement('button')
            buttonIcon.textContent = "P"
            buttonIcon.style.background = "#3b3c3a";
            buttonIcon.id = "iconId"
            buttonIcon.style.top = `${event.pageY - 50}px`
            buttonIcon.style.left = `${event.pageX - 15}px`
            buttonIcon.style.position = "absolute";
            buttonIcon.style.zIndex = 99999;
            buttonIcon.style.cursor = "pointer";
            buttonIcon.style.fontFamily = "cursive";
            buttonIcon.style.borderRadius = "50%";
            buttonIcon.style.fontWeight = "bold";
            buttonIcon.style.border = "none";
            buttonIcon.style.color = "#fffefc";
            buttonIcon.style.width = "35px";
            buttonIcon.style.height = "35px";
            buttonIcon.onclick = () => {
                iconModel(nodeText, sentances, event, sentances[0], 1)
                buttonIcon.remove()
            }

            document.querySelector('body').appendChild(buttonIcon)


        }
    }
}


document.addEventListener('mouseup', handleCLick);

const handleMouseDown = (event) => {
    let eleButton = document.getElementById('iconId')
    let eleContainer = document.getElementById('maincontainer');
    let sentencreNavigator = document.getElementById('sentence-navigator')
    console.log("2", `id: ${event.target.id} class: ${event.target.className}`,)
    if (event.target.id !== "pcontainer" && eleContainer !== null && event.target.className !== "pcontainer" && event.target.className !== "navigator-button") {
        let cols = document.getElementsByClassName('selectedTextBG');
        for (i = 0; i < cols.length; i++) {
            console.log("cols, cols[i]", cols, cols[i])
            cols[i].style.backgroundColor = 'white';
        }
        eleContainer.remove()
    }
    if (event.target.id !== "iconId" && eleButton !== null) {
        eleButton.remove()
    }
}

document.addEventListener('mousedown', handleMouseDown)
