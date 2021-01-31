const MESSAGES = [...DATA]
const messagesListEl = document.getElementById('messagesList')
const refreshBtnEl = document.getElementById("refreshBtn")
const messagesAllCountEl = document.getElementById("messagesAllCount")
const messagesUnreadCountEl = document.getElementById("messagesUnreadCount")
const dateFormatter = new Intl.DateTimeFormat()
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit"
})


messagesListEl.addEventListener('click', function(event) {
    let messageEl = event.target.closest(".message_item")

    if (messageEl.classList.contains("message_not_seen")) {
        messageEl.classList.remove("message_not_seen")
        messagesUnreadCountEl.innerHTML--
    }
})


refreshBtnEl.addEventListener('click', () => {
    renderMessages(messagesListEl, MESSAGES)
})


renderMessages(messagesListEl, MESSAGES)


function sortingMessages(list) {
    if (list.children.length) {
        [...list.children].sort((a, b) => {
            return a.dataset.seen - b.dataset.seen
        })
    }
}


function renderMessages(where, data) {
    let html = ''
    let unreadCount = 0

    data.sort((a, b) => {
        return a.seen - b.seen
    })

    data.forEach(element => {
        if (!element.seen) {
            unreadCount++
        }
            
        html += Message(element)
    })

    messagesUnreadCountEl.innerHTML = unreadCount
    messagesAllCountEl.innerHTML = data.length
    
    where.innerHTML = ""
    where.insertAdjacentHTML("beforeEnd", html)
}


function Message(data) {
    return `<div class="message_item ${!data.seen ? "message_not_seen" : ""}" data-seen="${data.seen}">
                <div class="user_data">
                    <img class="user_avatar" loading="lazy" src="${
                      data.avatar
                    }" alt="${data.avatar} ${data.phone}" width="1" height="1">
                    <div class="user_info">
                        <p class="user_name">${data.name}</p>
                        <p class="user_phone">${data.phone}</p>
                    </div>
                </div>
                <p class="message_text">${data.message}</p>
                <p class="message_date">
                    <span class="message_time">${timeFormatter.format(
                      data.date
                    )}</span>
                    <span class="message_day">${dateFormatter.format(
                      data.date
                    )}</span>
                </p>
            </div>`;
}