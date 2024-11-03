import requests
from bs4 import BeautifulSoup

def parse_devpost_headings(url):
    try:
        # Получаем HTML-контент страницы
        response = requests.get(url)
        response.raise_for_status()  # Проверка на успешный ответ
        html = response.text

        # Создаем объект BeautifulSoup для парсинга
        soup = BeautifulSoup(html, 'html.parser')

        # Список для хранения заголовков
        headings = []

        # Проходим по всем уровням заголовков (h1 - h6)
        for i in range(1, 7):
            heading_tags = soup.find_all(f'h{i}')
            for tag in heading_tags:
                heading_text = tag.get_text(strip=True)
                headings.append({'level': f'H{i}', 'text': heading_text})

        # Выводим список заголовков
        for heading in headings:
            print(heading)

    except requests.exceptions.RequestException as e:
        print("Ошибка при запросе страницы:", e)

# Запускаем функцию с URL страницы Devpost
parse_devpost_headings('https://twitchstreamertools.devpost.com/?ref_feature=challenge&ref_medium=discover')
