const MESSAGES = [...DATA]
const messagesList = document.getElementById('messagesList')


renderMessages(messagesList, MESSAGES)


function renderMessages(to, data) {
    let html = ''

    data.forEach(element => {
        html += Message(element)
    })

    to.insertAdjacentHTML('beforeEnd', html)
}


function Message(data) {
    return `<div class="message_item">
                <div class="user_data">
                    <img class="user_avatar" src="${data.avatar}" alt="${data.avatar} ${data.phone}" width="1" height="1">
                    <div class="user_info">
                        <p class="user_name">${data.name}</p>
                        <p class="user_phone">${data.phone}</p>
                    </div>
                </div>
                <p class="message_text">${data.message}</p>
                <p class="message_date">
                    <span class="message_time"></span>
                    <span class="message_day"></span>
                </p>
            </div>`;
}