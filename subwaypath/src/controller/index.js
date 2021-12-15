import { SELECTOR } from '../model/constants.js';
import Dijkstra from '../utils/Dijkstra.js';
import { $, validation } from '../utils/index.js';

export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.dijkstra = new Dijkstra();
  }
  init() {
    this.addEventListeners();
  }

  addEventListeners() {
    $(SELECTOR.search).addEventListener('click', () => this.searchShortest());
  }

  searchShortest() {
    const radios = document.getElementsByName(SELECTOR.radio);
    radios.forEach(x => {
      if (x.checked) {
        this.findShortest(x.value);
      }
    });
  }
  addDistanceEdges() {
    this.model.lines.forEach(line => this.dijkstra.addEdge(line.depart, line.arrive, line.cost[0]));
  }
  addTimeEdges() {
    this.model.lines.forEach(line => this.dijkstra.addEdge(line.depart, line.arrive, line.cost[1]));
  }

  isInputValid(depart, arrive) {
    return (
      !validation.isBlankExist(depart) &&
      !validation.isBlankExist(arrive) &&
      validation.isExistStation(this.model.stations, depart) &&
      validation.isExistStation(this.model.stations, arrive)
    );
  }
  findShortest(type) {
    let text;
    if (type === 'distance') {
      this.addDistanceEdges();
      text = '최단거리';
    } else if (type === 'time') {
      this.addTimeEdges();
      text = '최소시간';
    }

    const depart = $(SELECTOR.departure);
    const arrive = $(SELECTOR.arrival);
    if (this.isInputValid(depart, arrive)) {
      const result = this.dijkstra.findShortestPath(depart.value, arrive.value);
      const info = this.findInfo(result);
      info.type = text;
      this.view.showResult(result.join('▶'), info);
    }
  }

  makePrettyResult(result) {
    let pretty = [];
    while (result.length >= 2) {
      pretty.push({ start: result[0], end: result[1] });
      result.splice(0, 1);
    }

    return pretty;
  }

  increaseDistAndTimeByExistence(section, distAndTime) {
    for (const line of this.model.lines) {
      if (line.depart === section.start && line.arrive === section.end) {
        distAndTime.dist += line.cost[0];
        distAndTime.time += line.cost[1];
        break;
      }
    }
  }
  findInfo(result) {
    const distAndTime = {dist:0, time:0}
    const resultCopy = [...result];
    const pretty = this.makePrettyResult(resultCopy);

    pretty.forEach(section => {
      this.increaseDistAndTimeByExistence(section, distAndTime);
    });
    return distAndTime;
  }
}
