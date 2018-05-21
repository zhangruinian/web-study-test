function traversal(node) {
    if (node && node.nodeType === 1) {
        console.log(node.tagName)
    }

    var childNodes = node.childNodes
    childNodes.forEach((node) => {
        if (node.nodeType === 1) {
            traversal(node)
        }
    })
}