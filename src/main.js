import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'система'
	}
});

async function createProduct(name, description, unit) {
    // Формирование тела запроса
    const body = JSON.stringify({
        name: name,
        desc: description,
        unit: unit
    });

    // Отправка POST запроса на сервер
    const response = await fetch('https://acec-35-196-7-8.ngrok-free.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });

    // Проверка статуса ответа
    if (!response.ok) {
        throw new Error('Ошибка при создании продукта');
    }

    // Парсинг ответа
    const result = await response.json();
    console.log(result);

    // Возвращаем результат
    return result;
}

export default app;