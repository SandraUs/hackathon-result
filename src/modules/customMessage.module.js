export function showCustomMessage(text, duration = 3500) {
    const message = document.createElement('div')
    message.innerText = text

    Object.assign(message.style, {
        position: 'fixed',
        right: '35px',
        bottom: '50px',
        background: 'lightcyan',
        padding: '10px 15px',
        borderRadius: '18px',
        boxShadow: '0 2px 6px rgba(41, 38, 38, 0.2)',
        cursor: 'default'
    })

    const closeBtn = document.createElement('span')
    closeBtn.innerText = '×'
    Object.assign(closeBtn.style, {
        marginLeft: '25px',
        cursor: 'pointer',
        fontWeight: 'bold'
    })
    closeBtn.onclick = () => document.body.removeChild(message)

    message.appendChild(closeBtn)
    document.body.appendChild(message)

    let timer = setTimeout(() => {
        document.body.removeChild(message)
    }, duration)

    message.onmouseenter = () => clearTimeout(timer)
    message.onmouseleave = () => {
        timer = setTimeout(() => document.body.removeChild(message), duration)
    }
}