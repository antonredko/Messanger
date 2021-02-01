let MESSAGES = [...DATA]
const messagesListEl = document.getElementById('messagesList')
const refreshBtnEl = document.getElementById("refreshBtn")
const messagesAllCountEl = document.getElementById("messagesAllCount")
const messagesUnreadCountEl = document.getElementById("messagesUnreadCount")
const searchFormEl = document.getElementById("searchForm")
const dateFormatter = new Intl.DateTimeFormat()
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit"
})
const searchFields = ['name', 'message']


searchFormEl.addEventListener('submit', function(event) {
    event.preventDefault()

    let query = this.search.value.toLowerCase().trim().split(' ')

    MESSAGES = DATA.filter(message => {
        return query.every(word => {
            return searchFields.some(field => {
                return `${message[field]}`.toLowerCase().trim().includes(word)
            })
        })
    })
    renderMessages(messagesListEl, MESSAGES)

    this.search.blur()
    this.reset()
})


messagesListEl.addEventListener('click', function(event) {
    let messageEl = event.target.closest(".message_item")

    if (messageEl) {
        let messageId = messageEl.dataset.id

        MESSAGES.forEach(element => {
            if (messageId == element.id) {
                if (!Number(messageEl.dataset.seen)) {
                    element.seen = true
                } else {
                    let elementIndex = MESSAGES.indexOf(element)

                    if (~elementIndex) {
                        MESSAGES.splice(elementIndex, 1)
                    }
                }
            }
        })
    }
    renderMessages(this, MESSAGES)
})


refreshBtnEl.addEventListener('click', function() {
    renderMessages(messagesListEl, DATA)

    this.blur()

    searchFormEl.search.blur()
    searchFormEl.reset()
})


renderMessages(messagesListEl, MESSAGES)


function renderMessages(where, data) {
    let html = ''
    let unreadCount = 0

    data.sort((a, b) => {
        return b.date - a.date
    }).sort((a, b) => {
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
    return `<div class="message_item ${!data.seen ? "message_not_seen" : ""}" data-seen="${data.seen ? 1 : 0}" data-id="${data.id}">
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