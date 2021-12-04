import { makeElement, clearContents } from '../controller/utils.js';

export default function lineContainer(container) {
  this.initializer = () => {
    clearContents(container);
    const test = makeElement({ id: 'asd', innerHTML: 'line' });
    container.appendChild(test);
  };
}
