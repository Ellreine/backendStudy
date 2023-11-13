console.log('Hellow from app.js')

document.addEventListener('click', async event => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest('li').remove()
        })

    } else if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id;
        const currentTitle = event.target.closest('li').querySelector('.note-title').textContent;
        const newTitle = prompt('Введите новое название:', currentTitle);

        if (newTitle && newTitle !== currentTitle) {
            await update(id, newTitle);
            event.target.closest('li').querySelector('.note-title').textContent = newTitle;
        }
    }
})

async function update(id, newTitle) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle })
    });
}

async function remove (id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    })
}