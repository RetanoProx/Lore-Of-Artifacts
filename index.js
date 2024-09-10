import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// Функція для завантаження даних з JSON
const loadArtifactData = async (lang) => {
  const dataPath = join(__dirname, `${lang}.json`);
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Ошибка загрузки данных: ${error.message}`);
    return { artifactSets: {} };
  }
};

// Middleware для встановлення мови
const setLanguage = (req, res, next) => {
  req.lang = req.query.lang || 'ua'; // Встановлюємо мову по замовчуванню
  next();
};

// Обробка рендерінгу сторінки
const renderPage = async (req, res, setKey) => {
  try {
    const data = await loadArtifactData(req.lang);
    const artifactSets = data.artifactSets || {};
    const setKeys = Object.keys(artifactSets);

    if (!setKeys.length) {
      return res.status(404).send('Данные не найдены');
    }

    const currentSetKey = setKey || setKeys[0];
    const artifactSet = artifactSets[currentSetKey] || {};
    const artifacts = artifactSet.artifacts || [];
    const setTitle = artifactSet.name || '';
    const currentSetIndex = setKeys.indexOf(currentSetKey);

    res.render('index', { artifactSets, artifacts, setTitle, currentSetIndex, setKeys, lang: req.lang });
  } catch (error) {
    console.error(`Ошибка рендеринга страницы: ${error.message}`);
    res.status(500).send('Ошибка сервера');
  }
};

// Головна сторінка
app.get("/", setLanguage, (req, res) => {
  renderPage(req, res);
});

// Стрінка з певним набором артефактів
app.get("/:set", setLanguage, (req, res) => {
  const setKey = req.params.set;
  renderPage(req, res, setKey);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
