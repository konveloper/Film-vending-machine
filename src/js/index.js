import FilmGenerator from './components/filmGenerator.js';
import Vendingmachine from './components/vendingmachine.js';

const filmGenerator = new FilmGenerator();
const vendingmachine = new Vendingmachine();

await filmGenerator.setup();
vendingmachine.setup();
