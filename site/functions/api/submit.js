export async function onRequestPost({ request, env }) {
    try {
        const data = await request.formData();
        const name = data.get('name') || 'Не вказано';
        const phone = data.get('phone') || 'Не вказано';
        const source = data.get('source') || 'Форма на сайті';
        const message = data.get('message');

        const botToken = env.TELEGRAM_BOT_TOKEN;
        const chatId = env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.error('Telegram environment variables are missing.');
            // Return 500 if the server is not configured yet
            return new Response(JSON.stringify({ error: 'Сервер тимчасово не налаштовано.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        let text = `🔥 <b>Нова заявка на сайті!</b>\n\n`;
        text += `👤 <b>Ім'я:</b> ${name}\n`;
        text += `📞 <b>Телефон:</b> ${phone}\n`;
        text += `📍 <b>Джерело:</b> ${source}\n`;
        if (message) {
            text += `💬 <b>Повідомлення:</b>\n${message}\n`;
        }

        const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const tgResponse = await fetch(tgUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });

        if (!tgResponse.ok) {
            const errorText = await tgResponse.text();
            console.error('Telegram API error:', errorText);
            return new Response(JSON.stringify({ error: 'Помилка сервера при відправці.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true, message: 'Заявка успішно відправлена!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('Submit error:', err);
        return new Response(JSON.stringify({ error: 'Внутрішня помилка сервера.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
